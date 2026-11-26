import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, Globe, Lock } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  onInspect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onInspect }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const primaryHref = project.liveUrl || project.githubUrl;

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[#292338] bg-[#0c0819] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#9B5CFF]/60 hover:shadow-[0_20px_60px_rgba(155,92,255,0.18)]"
    >
      {/* Background card violet aura */}
      <div
        aria-hidden="true"
        className="violet-card-glow pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Top Header: Large bold index number (01, 02...) & Category Tag */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-white tabular-nums sm:text-5xl">
            {project.index}
          </span>
          <span className="rounded-full border border-[#292338] bg-[#140e28] px-3 py-1 text-xs font-semibold text-[#C084FC]">
            {project.filterCategories[0] || 'Web'}
          </span>
        </div>

        {/* Project Name and Technologies */}
        <div className="mt-4">
          <h3 className="font-display text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#D8B4FE] sm:text-2xl">
            {project.name}
          </h3>
          <p className="mt-2 text-xs font-medium text-[#A5A1B2]">
            <span className="text-[#C084FC]">Technologies used:</span>{' '}
            {project.categoryLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#94a3b8] line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Visual Project Preview Frame with Crisp SVG Mockup & Hover Circular Arrow */}
      <div className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-[#292338] bg-[#090614]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={project.imageSrc}
            alt={`${project.name} interface preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Reference Video Circular Launch Arrow Button */}
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} live project`}
              className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#9B5CFF] text-white shadow-[0_0_24px_rgba(155,92,255,0.7)] transition-all duration-300 hover:scale-110 hover:bg-[#A855F7] hover:shadow-[0_0_35px_rgba(168,85,247,0.9)]"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onInspect(project)}
              aria-label={`View architecture details for ${project.name}`}
              className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1438] border border-[#9B5CFF]/60 text-white shadow-[0_0_15px_rgba(155,92,255,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#9B5CFF]"
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Footer Meta bar with Domain and Details link */}
        <div className="flex items-center justify-between border-t border-[#292338] bg-[#090614] px-4 py-2.5 text-xs text-[#A5A1B2]">
          <span className="flex items-center gap-1.5 font-mono truncate max-w-[70%]">
            <Globe className="h-3 w-3 shrink-0 text-[#C084FC]" />
            <span className="truncate">{project.domainLabel}</span>
          </span>
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="font-medium text-[#C084FC] hover:text-white transition-colors"
          >
            Details ↗
          </button>
        </div>
      </div>
    </motion.article>
  );
}
