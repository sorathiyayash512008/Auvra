import { ArrowUp, Instagram, Mail, MessageCircle } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

const SERVICES = [
  "Social Media Management",
  "Content Creation",
  "Brand Strategy",
  "Graphic Design",
  "Video Editing",
];

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-[#F3F0E9] pt-20 pb-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#F3F0E9]/15">
          <div>
            <p className="font-display text-3xl font-semibold tracking-[0.22em]">AUVRA</p>
            <p className="mt-4 text-sm text-[#F3F0E9]/60 leading-relaxed">
              Creativity That Connects.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, href: "https://instagram.com/auvra.media", label: "Instagram" },
                { icon: Mail, href: "mailto:contact.auvra.studio@gmail.com", label: "Email" },
                { icon: MessageCircle, href: "https://wa.me/0000000000", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-[#F3F0E9]/25 flex items-center justify-center hover:bg-[#F3F0E9] hover:text-[#171717] transition-colors duration-300"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow text-[#F3F0E9]/50 mb-6">Navigate</p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => scrollToId(n.id)}
                    className="text-[15px] text-[#F3F0E9]/75 hover:text-[#F3F0E9] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[#F3F0E9]/50 mb-6">Services</p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollToId("services")}
                    className="text-[15px] text-[#F3F0E9]/75 hover:text-[#F3F0E9] hover:translate-x-1 transition-all duration-300 inline-block text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[#F3F0E9]/50 mb-6">Get in Touch</p>
            <a
              href="mailto:contact.auvra.studio@gmail.com"
              className="block text-[15px] text-[#F3F0E9]/75 hover:text-[#F3F0E9] transition-colors"
            >
              contact.auvra.studio@gmail.com
            </a>
            <a
              href="https://instagram.com/auvra.media"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-[15px] text-[#F3F0E9]/75 hover:text-[#F3F0E9] transition-colors"
            >
              @auvra.media
            </a>
            <p className="mt-3 text-[13px] text-[#F3F0E9]/40 leading-relaxed">
              WhatsApp is a placeholder — swap with your real number.
            </p>
          </div>
        </div>

        <p className="font-display font-semibold tracking-tight leading-[0.85] text-center select-none text-[19vw] lg:text-[16rem] mt-10 text-[#F3F0E9]/95">
          AUVRA
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#F3F0E9]/15">
          <p className="text-xs text-[#F3F0E9]/45">
            © {new Date().getFullYear()} AUVRA. All rights reserved.
          </p>
          <button
            onClick={() => scrollToId("home")}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F3F0E9]/60 hover:text-[#F3F0E9] transition-colors"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
