import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Database, Layout, Sparkles, Terminal } from 'lucide-react';
import { SERVICES } from '../data/services';

const SERVICE_ICONS = {
  'frontend-development': Layout,
  'software-development': Terminal,
  'data-analysis': Database,
  'ai-ml-exploration': Sparkles,
} as const;

export function Services() {
  const shouldReduceMotion = useReducedMotion();
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({
    'frontend-development': true,
    'software-development': true,
  });

  const toggleService = (id: string) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What I <span className="text-gradient-violet">Offer</span>
          </h2>
          <p className="mt-3.5 text-sm text-[#A5A1B2] sm:text-base">
            Comprehensive software engineering capabilities, modern frontend architecture, and emerging AI technologies.
          </p>
        </motion.div>

        {/* 2-Column Responsive Card Grid matching Reference Video */}
        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2">
          {SERVICES.map((service, idx) => {
            const Icon = SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS] ?? Layout;
            const isExpanded = Boolean(expandedMap[service.id]);

            return (
              <motion.article
                key={service.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#292338] bg-[#0c0819] p-7 sm:p-9 transition-all duration-300 hover:border-[#9B5CFF]/60 hover:shadow-[0_20px_50px_rgba(155,92,255,0.18)]"
              >
                <div
                  aria-hidden="true"
                  className="violet-card-glow pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#292338] bg-[#140e28] text-[#C084FC]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#A5A1B2]">{service.index}</span>
                    </div>
                    <span className="rounded-full border border-[#292338] bg-[#140e28] px-3 py-1 text-xs font-semibold text-[#C084FC]">
                      {service.focusLabel}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-bold text-white transition-colors group-hover:text-[#D8B4FE]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A5A1B2] sm:text-base">
                    {service.summary}
                  </p>
                </div>

                <div className="relative z-10 mt-8">
                  <div className="flex items-center justify-between border-t border-[#292338]/80 pt-5">
                    <span className="font-mono text-xs text-[#A5A1B2]">
                      {isExpanded ? 'Capabilities included' : 'Expand capabilities'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleService(service.id)}
                      aria-expanded={isExpanded}
                      aria-label={`Toggle capabilities for ${service.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292338] bg-[#140e28] text-white shadow-[0_0_15px_rgba(155,92,255,0.2)] transition-all duration-200 hover:border-[#9B5CFF] hover:bg-[#9B5CFF]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-[#C084FC]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 flex flex-wrap gap-2 pt-2"
                    >
                      {service.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="rounded-lg border border-[#292338] bg-[#080512] px-3 py-1.5 font-mono text-xs text-white/90"
                        >
                          {cap}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
