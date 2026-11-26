import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BarChart3, BrainCircuit, ChevronDown, Code2, Cpu } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';

const CATEGORY_ICONS = {
  frontend: Code2,
  'programming-backend': Cpu,
  'data-science': BarChart3,
  'artificial-intelligence': BrainCircuit,
} as const;

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Technical <span className="text-gradient-violet">Skills</span>
          </h2>
          <p className="mt-3 text-base text-[#A5A1B2]">
            Core engineering foundations paired with active exploration across data analysis and artificial intelligence.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS] ?? Code2;
            const isExpanded = expandedId === category.id;

            return (
              <motion.article
                key={category.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#292333] bg-[#100D18] p-7 sm:p-8 transition-colors duration-200 hover:border-[#9B5CFF]/45"
              >
                {/* Reference Video Corner Glow inside Card */}
                <div
                  aria-hidden="true"
                  className="violet-card-glow pointer-events-none absolute inset-0 opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#292333] bg-[#0D0B14] text-[#C084FC]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs text-[#A5A1B2]">{category.index}</span>
                    </div>

                    <span
                      className={`text-xs font-medium ${
                        category.isExploring ? 'text-[#C084FC]' : 'text-[#A5A1B2]'
                      }`}
                    >
                      {category.statusLabel}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A5A1B2]">
                    {category.subtitle}
                  </p>

                  {/* Clean skill list with subtle interactive emphasis */}
                  <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-[#292333]/80 pt-5 sm:grid-cols-3">
                    {category.items.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-sm font-medium text-white/90"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            category.isExploring ? 'bg-[#C084FC]' : 'bg-[#9B5CFF]'
                          }`}
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[#292333]/70 pt-4">
                  <span className="text-xs text-[#A5A1B2]">
                    {category.isExploring
                      ? 'Expanding knowledge & hands-on practice'
                      : `${category.items.length} core technologies`}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleCard(category.id)}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle details for ${category.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292333] bg-[#0D0B14] text-white transition-all duration-200 hover:border-[#9B5CFF]/70 hover:bg-[#9B5CFF]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#C084FC]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {isExpanded && (
                  <div className="relative z-10 mt-4 rounded-xl border border-[#292333] bg-[#050508]/80 p-4 text-xs leading-relaxed text-[#A5A1B2]">
                    {category.isExploring
                      ? 'Actively studying neural architectures, model workflows, and agentic systems while grounding progress in Python and CS theory.'
                      : 'Applied across real client platforms, university engineering projects, and production frontend workflows at AHL Technologies.'}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
