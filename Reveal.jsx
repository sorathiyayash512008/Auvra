import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ eyebrow, title, className = "" }) => (
  <div className={className}>
    <Reveal>
      <p className="eyebrow text-[#6B6A66] mb-5 flex items-center gap-3">
        <span className="inline-block w-8 h-px bg-[#171717]" />
        {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
        {title}
      </h2>
    </Reveal>
  </div>
);
