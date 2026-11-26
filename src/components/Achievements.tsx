import { motion, useReducedMotion } from 'motion/react';
import { Award } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievements';

export function Achievements() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="achievements" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Milestones &amp; <span className="text-gradient-violet">Recognition.</span>
          </h2>
          <p className="mt-3 text-base text-[#A5A1B2]">
            Competitions, leadership programs, and technology showcases across regional and national events.
          </p>
        </motion.div>

        {/* Reference Video 3-Column Dark Glowing Card Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#292333] bg-[#100D18] p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#9B5CFF]/50"
            >
              <div
                aria-hidden="true"
                className="violet-card-glow pointer-events-none absolute inset-0 opacity-65 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#292333] bg-[#0D0B14] text-[#C084FC]">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-[#A5A1B2]">{item.index}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#C084FC]">
                  {item.highlight}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#A5A1B2]">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-6 border-t border-[#292333]/80 pt-4 text-xs text-[#A5A1B2]">
                {item.organizerOrVenue}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
