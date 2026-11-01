const ITEMS = [
  "Digital Marketing",
  "Social Media Management",
  "Content Creation",
  "Brand Strategy",
  "Graphic Design",
  "Video Editing",
  "Creativity That Connects.",
];

const Track = ({ hidden }) => (
  <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
    {ITEMS.map((t, i) => (
      <span key={i} className="flex items-center">
        <span className="font-display text-2xl sm:text-3xl font-medium tracking-wide px-8">{t}</span>
        <span className="w-2 h-2 rounded-full bg-[#F3F0E9]/40" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <section className="bg-[#171717] text-[#F3F0E9] py-6 overflow-hidden border-y border-[#171717]" data-testid="marquee-band">
      <div className="marquee-track flex w-max">
        <Track />
        <Track hidden />
      </div>
    </section>
  );
}
