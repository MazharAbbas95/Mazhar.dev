import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { VISION_STAGES } from '../data/services';

interface CareerVisionProps {
  onWorkTogether: () => void;
}

export function CareerVision({ onWorkTogether }: CareerVisionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedStageId, setSelectedStageId] = useState<string>(VISION_STAGES[0].id);

  const selectedStage = VISION_STAGES.find((s) => s.id === selectedStageId) ?? VISION_STAGES[0];

  return (
    <section id="vision" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[#292333] bg-[#100D18] p-7 sm:p-12"
        >
          <div
            aria-hidden="true"
            className="violet-card-glow pointer-events-none absolute inset-0 opacity-85"
          />

          <div className="relative z-10">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Always Learning. <span className="text-gradient-violet">Always Building.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#A5A1B2] sm:text-lg">
                Software development is my foundation, but my curiosity extends beyond traditional application development. I am actively developing my understanding of Data Science, Machine Learning, Deep Learning, and Agentic AI.
              </p>
            </div>

            {/* Interactive 5-Stage Progression Roadmap */}
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {VISION_STAGES.map((stage, idx) => {
                const isSelected = stage.id === selectedStageId;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF] ${
                      isSelected
                        ? 'border-[#9B5CFF] bg-[#9B5CFF]/15 shadow-[0_0_24px_rgba(155,92,255,0.22)]'
                        : 'border-[#292333] bg-[#0D0B14]/90 hover:border-[#9B5CFF]/45'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[#C084FC]">{stage.step}</span>
                      <span className="text-[11px] font-medium text-[#A5A1B2]">
                        {stage.stageType}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-display text-base font-bold text-white">
                        {stage.label}
                      </span>
                      {idx < VISION_STAGES.length - 1 && (
                        <ArrowRight
                          className="hidden h-4 w-4 shrink-0 text-[#A5A1B2] lg:inline"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Detail & Let's Work Together CTA */}
            <div className="mt-6 flex flex-col justify-between gap-6 rounded-2xl border border-[#292333] bg-[#050508]/85 p-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="font-mono text-xs text-[#C084FC]">
                  {selectedStage.step} · {selectedStage.stageType}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#E2DFEC] sm:text-base">
                  {selectedStage.detail}
                </p>
              </div>

              <button
                type="button"
                onClick={onWorkTogether}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#9B5CFF] px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#8B46FF] violet-button-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C084FC]"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
