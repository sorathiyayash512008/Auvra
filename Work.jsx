import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { CATEGORIES, PROJECTS } from "../data/portfolio";

export default function Work() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="work" data-testid="work-section" className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHead eyebrow="Our Work" title="Selected Visuals." />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#6B6A66]">
              Clearly-labelled sample visuals shown as placeholders — swap in AUVRA's real
              projects anytime.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2.5 mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`work-filter-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                onClick={() => setActive(c)}
                className={`px-5 py-2.5 rounded-full text-[13px] tracking-wide border transition-all duration-300 ${
                  active === c
                    ? "bg-[#171717] text-[#F3F0E9] border-[#171717]"
                    : "border-[#D8D3C8] text-[#171717]/70 hover:border-[#171717] hover:text-[#171717]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div data-testid="work-gallery" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group cursor-pointer"
                onClick={() => setSelected(p)}
                data-testid={`work-item-${p.id}`}
              >
                <div className="relative overflow-hidden border border-[#D8D3C8] bg-[#FAF8F5]">
                  <img
                    src={p.image}
                    alt={`${p.title} — sample placeholder visual`}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-4 left-4 font-mono-x text-[9px] tracking-[0.22em] uppercase bg-[#F3F0E9]/90 text-[#171717] px-3 py-1.5">
                    Sample Placeholder
                  </span>
                  <span className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/15 transition-colors duration-500" />
                  <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-[#F3F0E9] flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="pt-4 pb-1 border-b border-[#D8D3C8] flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                    <p className="font-mono-x text-[11px] tracking-[0.18em] uppercase text-[#6B6A66] mt-1.5">
                      {p.category}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#171717]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelected(null)}
            data-testid="work-modal-overlay"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#F3F0E9] border border-[#D8D3C8] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              data-testid="work-modal"
            >
              <div className="grid sm:grid-cols-2">
                <img
                  src={selected.image}
                  alt={`${selected.title} — sample placeholder visual`}
                  className="w-full h-full max-h-[70vh] object-cover"
                />
                <div className="p-8 sm:p-10 flex flex-col">
                  <div className="flex items-start justify-between">
                    <p className="font-mono-x text-[11px] tracking-[0.2em] uppercase text-[#6B6A66]">
                      {selected.category}
                    </p>
                    <button
                      data-testid="work-modal-close"
                      aria-label="Close project preview"
                      onClick={() => setSelected(null)}
                      className="p-2 border border-[#D8D3C8] rounded-full hover:bg-[#171717] hover:text-[#F3F0E9] transition-colors duration-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight mt-6">
                    {selected.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#6B6A66]">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs border border-[#D8D3C8] px-3 py-1.5 rounded-full text-[#171717]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto pt-8 font-mono-x text-[11px] leading-relaxed tracking-wide text-[#6B6A66] border-t border-[#D8D3C8]">
                    Sample placeholder — not client work. Replace this entry in the portfolio data
                    with a real AUVRA project.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
