import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROJECT_FILTERS, PROJECTS, type ProjectFilterCategory, type ProjectItem } from '../data/projects';
import { ProjectCard } from './ProjectCard';

interface ProjectsProps {
  onInspectProject: (project: ProjectItem) => void;
}

export function Projects({ onInspectProject }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.filterCategories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#9B5CFF]/15 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            I make Incredible <br />
            <span className="text-gradient-violet">Projects</span>
          </h2>
          <p className="mt-3.5 text-sm text-[#A5A1B2] sm:text-base">
            From enterprise transportation logistics portals to multi-tenant SaaS and intelligent AI systems.
          </p>
        </motion.div>

        {/* Interactive Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {PROJECT_FILTERS.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(category)}
                className={`min-h-[42px] rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF] ${
                  isActive
                    ? 'bg-[#9B5CFF] text-white shadow-[0_0_24px_rgba(155,92,255,0.6)]'
                    : 'border border-[#292338] bg-[#0c0819] text-[#A5A1B2] hover:border-[#9B5CFF]/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInspect={onInspectProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
