import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const IMG_CAROUSEL =
  "https://static.prod-images.emergentagent.com/jobs/8b9375db-d4ee-4cff-b1b2-cd386308d0a2/images/921c49582fc5ccaaa73d050d1f195c5fc9c5efd5d32b06c560701bdad7038628.jpeg";
const IMG_REEL =
  "https://static.prod-images.emergentagent.com/jobs/8b9375db-d4ee-4cff-b1b2-cd386308d0a2/images/564e3d2eaff70dd245c781308ef0e6fd2c3a26500f1a577e9adc0e57359d624f.jpeg";
const IMG_POST =
  "https://static.prod-images.emergentagent.com/jobs/8b9375db-d4ee-4cff-b1b2-cd386308d0a2/images/b82cbdcb0abd21c5fa5dd9bb6cf3b250e5ec5c51a2402aef031cf7d8e9a97340.jpeg";

const HEADLINE = [["We Make Brands"], ["Impossible"], ["to Ignore."]];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left: type */}
        <div className="lg:col-span-7 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="eyebrow text-[#6B6A66] mb-8 flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#171717]" />
            AUVRA — Creative Digital Agency
          </motion.p>

          <h1
            data-testid="hero-headline"
            className="font-display font-semibold tracking-tight leading-[1.02] text-[13.5vw] sm:text-7xl lg:text-[5.6rem]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line[0]}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#6B6A66]"
          >
            We turn ideas into meaningful digital experiences through creative content, strategic
            storytelling and social media management.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-primary"
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center gap-2.5 bg-[#171717] text-[#F3F0E9] text-sm uppercase tracking-[0.12em] px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_14px_40px_rgba(23,23,23,0.3)]"
            >
              Let's Work Together <ArrowUpRight size={16} />
            </button>
            <button
              data-testid="hero-cta-secondary"
              onClick={() => scrollToId("work")}
              className="inline-flex items-center gap-2.5 border border-[#171717]/30 text-[#171717] text-sm uppercase tracking-[0.12em] px-8 py-4 rounded-full transition-all duration-300 hover:border-[#171717] hover:bg-[#171717] hover:text-[#F3F0E9]"
            >
              Explore Our Work <ArrowDown size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right: floating composition */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[520px] hidden sm:block">
          <motion.div
            style={{ y: yA }}
            className="absolute left-0 top-2 w-[46%] rotate-[-5deg] floaty"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAF8F5] p-2.5 pb-4 shadow-[0_30px_60px_rgba(23,23,23,0.18)] border border-[#D8D3C8]"
            >
              <img src={IMG_CAROUSEL} alt="Sample Instagram carousel cover" className="w-full aspect-[4/5] object-cover" loading="eager" />
              <p className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#6B6A66] mt-3 px-1">
                Carousel — 01
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yB }}
            className="absolute right-0 top-24 w-[44%] rotate-[5deg] floaty-slow"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 8 }}
              animate={{ opacity: 1, y: 0, rotate: 5 }}
              transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAF8F5] p-2.5 pb-4 shadow-[0_30px_60px_rgba(23,23,23,0.18)] border border-[#D8D3C8]"
            >
              <div className="relative">
                <img src={IMG_REEL} alt="Sample reel cover" className="w-full aspect-[4/5] object-cover" loading="eager" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-[#F3F0E9]/90 flex items-center justify-center">
                    <span className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-[#171717] ml-1" />
                  </span>
                </span>
              </div>
              <p className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#6B6A66] mt-3 px-1">
                Reel — Play
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yC }}
            className="absolute left-[28%] bottom-0 w-[48%] rotate-[2deg] floaty"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAF8F5] p-2.5 pb-4 shadow-[0_30px_60px_rgba(23,23,23,0.2)] border border-[#D8D3C8]"
            >
              <img src={IMG_POST} alt="Sample social media post" className="w-full aspect-[4/5] object-cover" loading="eager" />
              <p className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#6B6A66] mt-3 px-1">
                Post — New Drop
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute -left-2 bottom-16 bg-[#171717] text-[#F3F0E9] px-5 py-3 rounded-full font-mono-x text-[10px] tracking-[0.24em] uppercase rotate-[-4deg] shadow-xl"
          >
            Creativity That Connects.
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[#6B6A66]"
      >
        <span className="font-mono-x text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
