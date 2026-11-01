import { Reveal, SectionHead } from "./Reveal";

const POINTS = [
  "Creativity backed by strategy.",
  "Content designed around the brand.",
  "Consistent visual identity.",
  "Audience-focused storytelling.",
  "Professional communication.",
  "A modern understanding of digital culture.",
];

export default function WhyAuvra() {
  return (
    <section id="why" data-testid="why-section" className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Why Choose AUVRA?" title="Six Reasons Brands Stay." />
          </div>
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 border-t border-l border-[#D8D3C8]">
              {POINTS.map((p, i) => (
                <Reveal key={p} delay={0.06 * i}>
                  <div className="group h-full border-b border-r border-[#D8D3C8] p-8 sm:p-10 transition-colors duration-500 hover:bg-[#171717] min-h-[160px] flex flex-col justify-between">
                    <span className="font-mono-x text-xs text-[#6B6A66] group-hover:text-[#F3F0E9]/60 transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <p className="font-display text-xl sm:text-[1.35rem] font-medium leading-snug tracking-tight mt-10">
                      {p}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
