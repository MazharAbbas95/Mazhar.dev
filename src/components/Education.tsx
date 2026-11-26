import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { EDUCATION } from '../data/experience';

export function Education() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            My Academic <span className="text-gradient-violet">Journey.</span>
          </h2>
          <p className="mt-3 text-base text-[#A5A1B2]">
            Computer Science coursework building strong theoretical and analytical foundations.
          </p>
        </motion.div>

        <motion.article
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mt-12 overflow-hidden rounded-3xl border border-[#292333] bg-[#100D18] p-7 sm:p-10 transition-colors duration-200 hover:border-[#9B5CFF]/50"
        >
          <div
            aria-hidden="true"
            className="violet-card-glow pointer-events-none absolute inset-0 opacity-75"
          />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#292333] bg-[#0D0B14] text-[#C084FC]">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#C084FC]">
                  <span className="font-mono">{EDUCATION.semester}</span>
                  <span aria-hidden="true">·</span>
                  <span>{EDUCATION.status}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[#A5A1B2]">2024 – 2028</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {EDUCATION.degree}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-white/90 sm:text-base">
                  {EDUCATION.institution}, {EDUCATION.location}
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-6 border-t border-[#292333]/80 pt-5 text-sm leading-relaxed text-[#A5A1B2] sm:text-base">
            {EDUCATION.summary}
          </p>
        </motion.article>
      </div>
    </section>
  );
}
