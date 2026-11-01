import { Reveal, SectionHead } from "./Reveal";

const IMG_STUDIO =
  "https://static.prod-images.emergentagent.com/jobs/8b9375db-d4ee-4cff-b1b2-cd386308d0a2/images/6a984aab804c84db10894a0bfe4806a8338d12dbecb0b8561b5a803bfa0f2884.jpeg";

const PILLARS = [
  {
    title: "Our Vision",
    body: "A digital world where good brands are impossible to scroll past — where every post, frame and caption earns attention honestly.",
  },
  {
    title: "Our Approach",
    body: "Strategy first, aesthetics always. We define the message before we design the moment, so content works as hard as it looks.",
  },
  {
    title: "What Makes AUVRA Different",
    body: "We treat social platforms as cultural spaces, not billboards. Content is built natively for each platform and around the brand — never templated.",
  },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="About AUVRA" title="Creativity With a Purpose." />
            <Reveal delay={0.15}>
              <p className="mt-8 text-base sm:text-lg leading-relaxed text-[#6B6A66]">
                AUVRA is a creative digital agency helping businesses establish their digital
                identity and connect with the people who matter to them. We combine creative
                content, strategic social media management and brand communication that feels
                considered — never generated, never generic.
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-10">
              <div className="border border-[#D8D3C8] overflow-hidden">
                <img
                  src={IMG_STUDIO}
                  alt="Editorial studio composition — sample visual"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <p className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#6B6A66] px-4 py-3 border-t border-[#D8D3C8] bg-[#FAF8F5]">
                  Set design — sample visual
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-24">
            <Reveal delay={0.1}>
              <p className="font-display text-2xl sm:text-3xl font-medium leading-snug tracking-tight border-b border-[#D8D3C8] pb-10">
                Our story is simple: brands deserve content that is as strategic as it is
                beautiful. AUVRA exists to make that the standard — one feed, one campaign, one
                story at a time.
              </p>
            </Reveal>
            <div className="mt-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.08}>
                  <div className="group py-9 border-b border-[#D8D3C8] flex flex-col sm:flex-row gap-3 sm:gap-10 transition-colors duration-500 hover:bg-[#EAE6DC]/60 sm:items-baseline">
                    <span className="font-mono-x text-xs text-[#6B6A66] w-10 shrink-0">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight w-64 shrink-0">
                      {p.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#6B6A66] max-w-xl">
                      {p.body}
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
