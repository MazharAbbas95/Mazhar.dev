import { motion, useReducedMotion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { EXPERIENCES } from '../data/experience';

export function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Where I&apos;ve <span className="text-gradient-violet">Worked.</span>
          </h2>
          <p className="mt-3 text-base text-[#A5A1B2]">
            Practical engineering experience across frontend implementation and product research.
          </p>
        </motion.div>

        {/* Reference Video Glowing Vertical Timeline */}
        <div className="relative mt-14">
          {/* Glowing Vertical Spine */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[#9B5CFF] via-[#9B5CFF]/55 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <motion.article
                key={exp.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 gap-4 pl-14 md:grid-cols-2 md:gap-14 md:pl-0"
              >
                {/* Glowing Timeline Node Marker */}
                <div
                  aria-hidden="true"
                  className="absolute left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-[#C084FC] bg-[#050508] shadow-[0_0_16px_rgba(155,92,255,0.8)] md:left-1/2 md:-translate-x-1/2"
                >
                  <span className="h-2 w-2 rounded-full bg-[#9B5CFF]" />
                </div>

                {/* Left Column: Position & Organization */}
                <div className="md:text-right md:pr-6">
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-[#C084FC] md:flex-row-reverse">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{exp.organization}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-2xl font-bold text-white">
                    {exp.position}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#A5A1B2]">
                    {exp.timeframe}
                  </p>
                </div>

                {/* Right Column: Description Card */}
                <div className="md:pl-6">
                  <div className="rounded-2xl border border-[#292333] bg-[#100D18] p-6 transition-colors duration-200 hover:border-[#9B5CFF]/45">
                    <p className="text-sm leading-relaxed text-[#A5A1B2] sm:text-[15px]">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
