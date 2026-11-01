from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import uuid
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone
from pydantic import BaseModel

from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "hello@auvra.studio")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

EMAIL_SERVICES = {
    "Social Media Management", "Content Creation", "Brand Strategy",
    "Graphic Design", "Video Editing", "Not sure yet",
}

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if EMAIL_REPLY_TO:
        payload["contact_email"] = EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code})")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class InquiryCreate(BaseModel):
    full_name: str
    email: str
    brand_name: str
    service: str
    budget: str
    description: str


def _inquiry_email_html(i: InquiryCreate) -> str:
    row = lambda label, value: (
        f'<tr><td style="padding:8px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;'
        f'color:#8a877e;font-family:Arial,sans-serif">{escape(label)}</td>'
        f'<td style="padding:8px 0;font-size:15px;color:#171717;font-family:Arial,sans-serif">{escape(value)}</td></tr>'
    )
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
        '<tr><td style="padding:32px 24px;background-color:#F3F0E9">'
        '<p style="margin:0 0 20px;font-size:22px;font-weight:bold;color:#171717;'
        'font-family:Arial,sans-serif;letter-spacing:2px">AUVRA</p>'
        '<p style="margin:0 0 24px;font-size:15px;color:#171717;font-family:Arial,sans-serif">'
        'New project inquiry received from the website:</p>'
        '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" '
        'style="background-color:#ffffff;border:1px solid #D8D3C8">'
        + row("Full Name", i.full_name)
        + row("Email", i.email)
        + row("Business / Brand", i.brand_name)
        + row("Service Required", i.service)
        + row("Project Budget", i.budget)
        + "</table></td></tr>"
        '<tr><td style="padding:24px;background-color:#F3F0E9">'
        '<p style="margin:0 0 8px;font-size:12px;letter-spacing:1px;text-transform:uppercase;'
        'color:#8a877e;font-family:Arial,sans-serif">Project Description</p>'
        '<p style="margin:0;font-size:15px;line-height:1.6;color:#171717;'
        'font-family:Arial,sans-serif;white-space:pre-wrap">' + escape(i.description) + "</p></td></tr>"
        '<tr><td style="padding:16px 24px;font-size:12px;color:#8a877e;font-family:Arial,sans-serif">'
        f'Sent by {escape(EMAIL_FROM_NAME)}. We never ask for your password or card details by email.'
        "</td></tr></table>"
    )


@api_router.get("/")
async def root():
    return {"message": "AUVRA API running"}


@api_router.post("/contact")
async def create_inquiry(input: InquiryCreate):
    errors = []
    if not input.full_name.strip():
        errors.append("full name")
    if not EMAIL_RE.match(input.email.strip()):
        errors.append("valid email")
    if not input.brand_name.strip():
        errors.append("brand name")
    if input.service not in EMAIL_SERVICES:
        errors.append("service")
    if not input.budget.strip():
        errors.append("budget")
    if len(input.description.strip()) < 10:
        errors.append("project description (min 10 characters)")
    if errors:
        raise HTTPException(status_code=422, detail=f"Please provide a {' and '.join(errors)}.")

    doc = {
        "id": str(uuid.uuid4()),
        "full_name": input.full_name.strip(),
        "email": input.email.strip().lower(),
        "brand_name": input.brand_name.strip(),
        "service": input.service,
        "budget": input.budget.strip(),
        "description": input.description.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc)

    email_sent = True
    try:
        await send_email(
            to=OWNER_EMAIL,
            subject=f"New inquiry: {input.service} - {input.brand_name.strip()}",
            html=_inquiry_email_html(input),
        )
    except HTTPException as e:
        email_sent = False
        logger.warning(f"Inquiry stored but email not sent: {e.detail}")

    return {"status": "success", "id": doc["id"], "email_sent": email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
