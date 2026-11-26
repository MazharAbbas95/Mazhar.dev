import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Services } from './components/Services';
import { CareerVision } from './components/CareerVision';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { useActiveSection } from './hooks/useActiveSection';
import type { ProjectItem } from './data/projects';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'achievements',
  'services',
  'vision',
  'contact',
];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS, 'home');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [prefillSubject, setPrefillSubject] = useState<string | undefined>(undefined);

  const navigateToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleRequestResumeViaForm = useCallback(() => {
    setPrefillSubject('Resume Request — Mazhar Abbas');
    navigateToSection('contact');
  }, [navigateToSection]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#050508] text-white">
        <CustomCursor />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[#9B5CFF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} onNavigate={navigateToSection} />

        <main id="main-content">
          <Hero
            onExploreWork={() => navigateToSection('projects')}
            onOpenResume={() => setResumeOpen(true)}
          />
          <About onOpenResume={() => setResumeOpen(true)} />
          <Skills />
          <Projects onInspectProject={(project) => setSelectedProject(project)} />
          <Experience />
          <Education />
          <Achievements />
          <Services />
          <CareerVision onWorkTogether={() => navigateToSection('contact')} />
          <Contact prefillSubject={prefillSubject} />
        </main>

        <Footer onNavigate={navigateToSection} />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
          onRequestViaForm={handleRequestResumeViaForm}
        />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
