import { Reveal, SectionHead } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "Understand the brand and its audience — voice, values and where attention already lives.",
  },
  {
    n: "02",
    title: "Strategise",
    desc: "Develop a creative direction and content plan that turns positioning into a publishing rhythm.",
  },
  {
    n: "03",
    title: "Create",
    desc: "Produce engaging content and visual experiences, natively built for each platform.",
  },
  {
    n: "04",
    title: "Grow",
    desc: "Review performance, learn from the audience and improve the strategy every cycle.",
  },
];

export default function Process() {
  return (
    <section id="process" data-testid="process-section" className="py-24 sm:py-32 lg:py-40 bg-[#EDE9DF] border-y border-[#D8D3C8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionHead eyebrow="Our Creative Process" title="From Insight to Momentum." className="mb-16" />

        <div className="relative">
          <div className="hidden lg:block absolute top-[26px] left-0 right-0 h-px bg-[#D8D3C8]" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={0.1 * i} className={i % 2 === 1 ? "lg:pt-14" : ""}>
                <div className="group">
                  <div className="relative flex items-center gap-4 lg:block">
                    <span className="relative z-10 inline-flex items-center justify-center w-[52px] h-[52px] rounded-full bg-[#F3F0E9] border border-[#D8D3C8] font-mono-x text-sm group-hover:bg-[#171717] group-hover:text-[#F3F0E9] group-hover:border-[#171717] transition-all duration-500">
                      {s.n}
                    </span>
                    <h3 className="lg:mt-7 font-display text-2xl font-semibold tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#6B6A66] max-w-xs">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
