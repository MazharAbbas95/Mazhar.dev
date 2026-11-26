import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface AboutProps {
  onOpenResume: () => void;
}

export function About({ onOpenResume }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="about__shadow pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Narrative Column matching Reference Video */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-gradient-violet">Creativity</span>
              <br />
              Is My Passion
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#c4b5fd]/90 sm:text-lg">
              I&apos;m a <b className="font-bold text-white">Software &amp; Frontend Developer</b> passionate about experimenting with new <b className="font-bold text-gradient-violet">skills and creativity</b>. Driven by learning and curiosity, I&apos;m always looking to explore and develop high-impact software solutions.
            </p>

            <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-[#A5A1B2] sm:text-base">
              <p>
                Currently, I am working at <span className="font-semibold text-white">AHL Technologies</span> as a Frontend Developer, having previously conducted technical exploration in <span className="font-semibold text-white">Product Research Engineering</span>.
              </p>
              <p>
                As a fifth-semester Computer Science student at <span className="font-semibold text-white">Muhammad Nawaz Sharif University of Agriculture, Multan</span>, I build production web applications, multi-tenant SaaS architectures, and logistical platforms while actively researching <span className="font-semibold text-white">Machine Learning, Deep Learning, and Agentic AI</span> toward my journey as a future Data Scientist.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              {/* Glowing Pill Resume Button */}
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full border border-[#9B5CFF] bg-[#090714] px-7 py-3 text-sm font-bold tracking-wide text-white shadow-[0_0_24px_rgba(155,92,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C084FC] hover:bg-[#9B5CFF]/20 hover:shadow-[0_0_36px_rgba(155,92,255,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
              >
                <span>Resume</span>
                <FileText className="h-4 w-4 text-[#C084FC]" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[#A5A1B2]">
                <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span>Available for high-impact software engineering</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Portrait with Dual Glowing Blobs matching Video */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex w-full max-w-[360px] items-center justify-center lg:col-span-5"
          >
            {/* Dual glowing blobs behind portrait */}
            <div
              aria-hidden="true"
              className="blob-animate pointer-events-none absolute left-1/3 top-1/3"
            />
            <div
              aria-hidden="true"
              className="blob-animate pointer-events-none absolute left-2/3 top-1/2 scale-75 opacity-70"
            />

            <div className="relative z-10 w-full overflow-hidden rounded-[2rem] border border-[#292338] bg-[#0c0819] shadow-[0_24px_70px_rgba(155,92,255,0.25)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={PROFILE.portraitSrc}
                  alt={PROFILE.portraitAlt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top brightness-[0.96] contrast-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0c0819] to-transparent"
                />
              </div>

              <div className="border-t border-[#292338] bg-[#090614] px-6 py-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-mono text-[#A5A1B2]">Role</p>
                    <p className="font-semibold text-white">Frontend Developer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[#A5A1B2]">Base</p>
                    <p className="font-semibold text-[#C084FC]">Multan, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
