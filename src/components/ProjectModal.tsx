import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ExternalLink, Github, Layers, X } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#292333] bg-[#100D18] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="violet-card-glow pointer-events-none absolute inset-0 opacity-80" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#A5A1B2]">
                    <span className="font-mono text-[#C084FC]">{project.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.categoryLabel}</span>
                    {project.featuredBadge && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-white/90">{project.featuredBadge}</span>
                      </>
                    )}
                  </div>
                  <h3 id="project-modal-title" className="mt-2 font-display text-2xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#292333] bg-[#0D0B14] text-[#A5A1B2] transition-colors hover:border-[#9B5CFF]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Project Preview Image Mockup */}
              <div className="mt-5 overflow-hidden rounded-xl border border-[#292338] bg-[#050508]">
                <img
                  src={project.imageSrc}
                  alt={`${project.name} preview`}
                  className="w-full aspect-[16/9] object-cover object-top"
                />
              </div>

              <div className="mt-4 rounded-xl border border-[#292333] bg-[#050508]/90 p-5">
                <div className="flex items-center justify-between border-b border-[#292333] pb-3 text-xs text-[#A5A1B2]">
                  <span className="font-mono truncate">{project.domainLabel}</span>
                  <span className="shrink-0 font-mono text-[#C084FC]">
                    {project.liveUrl ? 'Live Deployment' : project.githubUrl ? 'GitHub Repository' : 'Private / Internal Build'}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#E2DFEC]">{project.description}</p>
                {project.architectureNote && (
                  <div className="mt-4 flex items-start gap-2.5 border-t border-[#292333] pt-3 text-xs leading-relaxed text-[#A5A1B2]">
                    <Layers className="mt-0.5 h-4 w-4 shrink-0 text-[#9B5CFF]" aria-hidden="true" />
                    <span>{project.architectureNote}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#A5A1B2]">
                <span>Categories:</span>
                {project.filterCategories.map((cat, idx) => (
                  <span key={cat} className="inline-flex items-center gap-2 text-white/85">
                    {idx > 0 && <span aria-hidden="true" className="text-[#A5A1B2]">·</span>}
                    {cat}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#9B5CFF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#8B46FF] violet-button-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C084FC]"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#292333] bg-[#0D0B14] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#9B5CFF]/50 hover:bg-[#171224] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
                  >
                    <Github className="h-4 w-4 text-[#C084FC]" aria-hidden="true" />
                    <span>View Source on GitHub</span>
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <span className="text-xs text-[#A5A1B2]">
                    Public demo link is not available for this project.
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
