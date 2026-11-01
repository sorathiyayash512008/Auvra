import { Reveal, SectionHead } from "./Reveal";

const SERVICES = [
  {
    title: "Social Media Management",
    desc: "Full-stack handling of your social presence — planned, posted and nurtured.",
    items: ["Content planning", "Social media calendars", "Account management", "Audience engagement"],
  },
  {
    title: "Content Creation",
    desc: "Scroll-stopping content made natively for every platform your audience lives on.",
    items: ["Instagram posts", "Carousels", "Reels & short-form videos", "Creative campaigns"],
  },
  {
    title: "Brand Strategy",
    desc: "A clear creative direction so every piece of content points the same way.",
    items: ["Brand positioning", "Content strategy", "Brand communication", "Digital presence development"],
  },
  {
    title: "Graphic Design",
    desc: "Design that carries your identity across every pixel and print.",
    items: ["Social media creatives", "Promotional designs", "Campaign graphics", "Visual identity assets"],
  },
  {
    title: "Video Editing",
    desc: "Pace, sound and story — edited for thumbs that never stop scrolling.",
    items: ["Reels editing", "Short-form content", "Promotional videos", "Engaging video storytelling"],
  },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="py-24 sm:py-32 lg:py-40 bg-[#EDE9DF] border-y border-[#D8D3C8]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <SectionHead eyebrow="What We Do" title="Services Built for Attention." />
          <Reveal delay={0.2}>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#6B6A66]">
              Five disciplines, one goal — a digital presence that looks premium and performs
              consistently.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.title}
              delay={0.06 * i}
              className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            >
              <article
                data-testid={`service-card-${i}`}
                className="group h-full flex flex-col bg-[#FAF8F5] border border-[#D8D3C8] p-8 sm:p-10 transition-all duration-500 hover:bg-[#171717] hover:border-[#171717]"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono-x text-xs text-[#6B6A66] group-hover:text-[#F3F0E9]/60 transition-colors duration-500">
                    /0{i + 1}
                  </span>
                  <span className="w-9 h-9 rounded-full border border-[#D8D3C8] group-hover:border-[#F3F0E9]/40 group-hover:rotate-45 transition-all duration-500 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-[#171717] group-hover:bg-[#F3F0E9] transition-colors duration-500" />
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold tracking-tight group-hover:text-[#F3F0E9] transition-colors duration-500">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#6B6A66] group-hover:text-[#F3F0E9]/70 transition-colors duration-500">
                  {s.desc}
                </p>
                <ul className="mt-8 space-y-0 border-t border-[#D8D3C8] group-hover:border-[#F3F0E9]/25 transition-colors duration-500">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="py-2.5 text-sm text-[#171717]/80 group-hover:text-[#F3F0E9]/85 border-b border-[#D8D3C8]/70 group-hover:border-[#F3F0E9]/15 transition-all duration-500 flex items-center gap-3 translate-x-0 group-hover:translate-x-1"
                    >
                      <span className="w-1 h-1 bg-current shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
