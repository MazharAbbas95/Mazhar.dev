import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowDown, FileText, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface HeroProps {
  onExploreWork: () => void;
  onOpenResume: () => void;
}

const PROFESSIONS = [
  { line1: 'Software', line2: 'Developer' },
  { line1: 'Frontend', line2: 'Engineer' },
  { line1: 'Full Stack', line2: 'Builder' },
  { line1: 'AI & Data', line2: 'Enthusiast' },
];

export function Hero({ onExploreWork, onOpenResume }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [professionIndex, setProfessionIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % PROFESSIONS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const currentProfession = PROFESSIONS[professionIndex];

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#050508] pt-20 pb-8 sm:pt-24 lg:pt-28"
    >
      {/* Reference Video Ambient Purple Glowing Backlight */}
      <div
        aria-hidden="true"
        className="home__shadow pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Main Hero Container - 3 Column Composition matching Reference Video */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-4 lg:gap-8">
          
          {/* Left Column: Greeting & Name (Clean, minimal, high-impact) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 text-center md:col-span-4 md:text-left"
          >
            <h3 className="font-sans text-base font-semibold tracking-wider text-[#C084FC] sm:text-lg">
              {PROFILE.greeting}
            </h3>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Mazhar
              <br />
              <span className="text-white">Abbas</span>
            </h1>
            <p className="mt-4 font-mono text-xs tracking-widest text-[#A5A1B2]/80 uppercase">
              AHL Technologies · Multan, PK
            </p>
          </motion.div>

          {/* Center Column: Portrait with Glowing Violet Radial Aura (blob-animate) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 relative mx-auto flex w-full max-w-[340px] items-center justify-center sm:max-w-[380px] md:col-span-4"
          >
            {/* Animated radiant purple orb directly behind developer silhouette */}
            <div
              aria-hidden="true"
              className="blob-animate pointer-events-none absolute left-1/2 top-[46%]"
            />

            {/* Portrait cutout with studio feathering and obsidian dissolve */}
            <div className="relative z-10 w-full overflow-hidden">
              <img
                src={PROFILE.portraitSrc}
                alt={PROFILE.portraitAlt}
                className="h-auto w-full object-cover object-top drop-shadow-[0_20px_50px_rgba(155,92,255,0.35)]"
                loading="eager"
              />
              {/* Soft bottom dissolve into the obsidian floor */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent"
              />
            </div>
          </motion.div>

          {/* Right Column: "Creative" + Animated Profession lines */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-3 text-center md:col-span-4 md:text-right"
          >
            <h3 className="font-sans text-base font-semibold tracking-wider text-[#C084FC] sm:text-lg">
              Creative
            </h3>

            {/* Split / Animated Profession Ticker */}
            <div className="relative mt-2 min-h-[5.5rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={professionIndex}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -35 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl xl:text-5xl">
                    <span className="block text-gradient-violet">{currentProfession.line1}</span>
                    <span className="block text-white">{currentProfession.line2}</span>
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Vertical Social Icons (Left) and Resume Button (Right) */}
        <div className="mt-8 flex items-center justify-between border-t border-[#292338]/60 pt-6 sm:mt-12">
          {/* Social Links Rail */}
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#292338] bg-[#090714] text-[#A5A1B2] transition-all duration-200 hover:-translate-y-1 hover:border-[#9B5CFF] hover:bg-[#9B5CFF]/15 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#292338] bg-[#090714] text-[#A5A1B2] transition-all duration-200 hover:-translate-y-1 hover:border-[#9B5CFF] hover:bg-[#9B5CFF]/15 hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email directly"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#292338] bg-[#090714] text-[#A5A1B2] transition-all duration-200 hover:-translate-y-1 hover:border-[#9B5CFF] hover:bg-[#9B5CFF]/15 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp chat"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#292338] bg-[#090714] text-[#A5A1B2] transition-all duration-200 hover:-translate-y-1 hover:border-[#9B5CFF] hover:bg-[#9B5CFF]/15 hover:text-white"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>

          {/* Scroll Prompt / Explore Work */}
          <button
            type="button"
            onClick={onExploreWork}
            className="hidden items-center gap-2 font-mono text-xs text-[#A5A1B2] transition-colors hover:text-white sm:flex"
          >
            <span>Explore Projects</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[#C084FC]" />
          </button>

          {/* Resume Glowing Pill Button matching Reference Video */}
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#9B5CFF]/80 bg-[#090714] px-6 py-2.5 text-xs font-bold tracking-wide text-white shadow-[0_0_24px_rgba(155,92,255,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C084FC] hover:bg-[#9B5CFF]/20 hover:shadow-[0_0_36px_rgba(155,92,255,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
          >
            <span>Resume</span>
            <FileText className="h-3.5 w-3.5 text-[#C084FC]" />
          </button>
        </div>
      </div>
    </section>
  );
}
