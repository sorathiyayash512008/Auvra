import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Mail, Instagram, MessageCircle } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICE_OPTIONS = [
  "Social Media Management",
  "Content Creation",
  "Brand Strategy",
  "Graphic Design",
  "Video Editing",
  "Not sure yet",
];

const BUDGET_OPTIONS = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

const EMPTY = {
  full_name: "",
  email: "",
  brand_name: "",
  service: "",
  budget: "",
  description: "",
};

const CONTACTS = [
  { icon: Mail, label: "Email", value: "contact.auvra.studio@gmail.com", href: "mailto:contact.auvra.studio@gmail.com" },
  { icon: Instagram, label: "Instagram", value: "@auvra.media", href: "https://instagram.com/auvra.media" },
  { icon: MessageCircle, label: "WhatsApp", value: "+00 000 000 0000", href: "https://wa.me/0000000000" },
];

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const validate = () => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = "Please enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (!form.brand_name.trim()) errs.brand_name = "Please enter your business or brand name.";
    if (!form.service) errs.service = "Please select a service.";
    if (!form.budget) errs.budget = "Please select a budget range.";
    if (form.description.trim().length < 10)
      errs.description = "Please describe your project (at least 10 characters).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      toast.success("Inquiry received — we'll be in touch shortly.");
      setForm(EMPTY);
      if (!data.email_sent) {
        toast("Your inquiry is saved. Email delivery is temporarily unavailable.", {
          icon: "ℹ",
        });
      }
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const Err = ({ k }) =>
    errors[k] ? (
      <p data-testid={`contact-error-${k}`} className="mt-2 text-xs text-red-700 font-medium">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" data-testid="contact-section" className="py-24 sm:py-32 lg:py-40 bg-[#EDE9DF] border-t border-[#D8D3C8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Let's Collaborate" title="Let's Create Something Meaningful." />
          <Reveal delay={0.15}>
            <p className="mt-8 text-base sm:text-lg leading-relaxed text-[#6B6A66] max-w-md">
              Have a brand that deserves more attention? Let's make it happen. Tell us about
              your project and we'll get back to you.
            </p>
          </Reveal>
          <div className="mt-12 space-y-1">
            {CONTACTS.map((c, i) => (
              <Reveal key={c.label} delay={0.1 + i * 0.07}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-b border-[#D8D3C8] py-5 group"
                >
                  <span className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full border border-[#D8D3C8] flex items-center justify-center group-hover:bg-[#171717] group-hover:text-[#F3F0E9] transition-colors duration-300">
                      <c.icon size={16} />
                    </span>
                    <span className="font-mono-x text-[11px] tracking-[0.2em] uppercase text-[#6B6A66]">
                      {c.label}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-[15px] font-medium group-hover:translate-x-1 transition-transform duration-300">
                    {c.value}
                    <ArrowUpRight size={14} className="text-[#6B6A66]" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-6 font-mono-x text-[10px] tracking-[0.16em] uppercase text-[#6B6A66]">
              WhatsApp is a placeholder — swap with your real number.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.2}>
            <form
              data-testid="contact-form"
              onSubmit={submit}
              noValidate
              className="bg-[#FAF8F5] border border-[#D8D3C8] p-8 sm:p-12"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="eyebrow text-[#6B6A66] block mb-2.5" htmlFor="cf-name">
                    Full Name *
                  </label>
                  <input
                    id="cf-name"
                    data-testid="contact-name-input"
                    className="field-input"
                    placeholder="Your name"
                    value={form.full_name}
                    onChange={set("full_name")}
                  />
                  <Err k="full_name" />
                </div>
                <div>
                  <label className="eyebrow text-[#6B6A66] block mb-2.5" htmlFor="cf-email">
                    Email Address *
                  </label>
                  <input
                    id="cf-email"
                    data-testid="contact-email-input"
                    type="email"
                    className="field-input"
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                  <Err k="email" />
                </div>
                <div>
                  <label className="eyebrow text-[#6B6A66] block mb-2.5" htmlFor="cf-brand">
                    Business / Brand Name *
                  </label>
                  <input
                    id="cf-brand"
                    data-testid="contact-brand-input"
                    className="field-input"
                    placeholder="Your brand"
                    value={form.brand_name}
                    onChange={set("brand_name")}
                  />
                  <Err k="brand_name" />
                </div>
                <div>
                  <label className="eyebrow text-[#6B6A66] block mb-2.5" htmlFor="cf-service">
                    Service Required *
                  </label>
                  <select
                    id="cf-service"
                    data-testid="contact-service-select"
                    className="field-input appearance-none cursor-pointer"
                    value={form.service}
                    onChange={set("service")}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <Err k="service" />
                </div>
                <div className="sm:col-span-2">
                  <label className="eyebrow text-[#6B6A66] block mb-2.5" htmlFor="cf-budget">
                    Project Budget *
                  </label>
                  <select
                    id="cf-budget"
                    data-testid="contact-budget-select"
                    className="field-input appearance-none cursor-pointer"
                    value={form.budget}
                    onChange={set("budget")}
                  >
                    <option value="">Select a budget range</option>
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <Err k="budget" />
                </div>
                <div className="sm:col-span-2">
                  <label className="eyebrow text-[#6B6A66] block mb-2.5" htmlFor="cf-desc">
                    Project Description *
                  </label>
                  <textarea
                    id="cf-desc"
                    data-testid="contact-description-textarea"
                    rows={5}
                    className="field-input resize-none"
                    placeholder="Tell us about your brand, your goals and what you need..."
                    value={form.description}
                    onChange={set("description")}
                  />
                  <Err k="description" />
                </div>
              </div>
              <button
                type="submit"
                data-testid="contact-submit-button"
                disabled={sending}
                className="mt-8 w-full inline-flex items-center justify-center gap-2.5 bg-[#171717] text-[#F3F0E9] text-sm uppercase tracking-[0.14em] px-8 py-5 rounded-full transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_14px_40px_rgba(23,23,23,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Submit Inquiry"}
                {!sending && <ArrowUpRight size={16} />}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
