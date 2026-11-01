import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 150 : 0);
  };

  return (
    <>
      <header
        data-testid="nav-bar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-[#F3F0E9]/85 backdrop-blur-md border-b border-[#D8D3C8]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            data-testid="nav-logo"
            onClick={() => go("home")}
            className="font-display text-2xl font-semibold tracking-[0.24em] hover:tracking-[0.3em] transition-all duration-300"
          >
            AUVRA
          </button>

          <div className="hidden lg:flex items-center gap-10">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="relative text-[13px] uppercase tracking-[0.18em] text-[#171717]/60 hover:text-[#171717] transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#171717] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              data-testid="nav-cta-button"
              onClick={() => go("contact")}
              className="hidden sm:inline-flex items-center gap-2 bg-[#171717] text-[#F3F0E9] text-[13px] uppercase tracking-[0.12em] px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_10px_30px_rgba(23,23,23,0.25)]"
            >
              Let's Talk
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
            </button>
            <button
              data-testid="mobile-menu-button"
              aria-label="Toggle menu"
              className="lg:hidden p-2 border border-[#D8D3C8] rounded-full"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          data-testid="mobile-menu"
          className="fixed inset-0 z-40 lg:hidden bg-[#F3F0E9] pt-28 px-8 flex flex-col"
        >
          <div className="flex flex-col gap-2">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="font-display text-4xl font-medium tracking-tight py-3 border-b border-[#D8D3C8] text-left flex items-center justify-between"
              >
                {l.label}
                <span className="font-mono-x text-xs text-[#6B6A66]">0{i + 1}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => go("contact")}
            className="mt-10 inline-flex items-center justify-center gap-2 bg-[#171717] text-[#F3F0E9] text-sm uppercase tracking-[0.12em] px-8 py-4 rounded-full"
          >
            Let's Talk <ArrowUpRight size={16} />
          </button>
          <p className="mt-auto pb-10 eyebrow text-[#6B6A66]">Creativity That Connects.</p>
        </div>
      )}
    </>
  );
}
