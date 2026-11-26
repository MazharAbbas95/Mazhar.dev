import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/profile';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-[#292333]/80 bg-[#050508]/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B5CFF]"
        >
          MAZHAR<span className="text-[#9B5CFF]">.</span>
        </a>

        {/* Zone 2: Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9B5CFF] ${
                  isActive ? 'text-white' : 'text-[#A5A1B2] hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#9B5CFF] to-[#C084FC] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center justify-center rounded-xl border border-[#9B5CFF]/50 bg-[#9B5CFF]/15 px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-all duration-200 hover:border-[#C084FC] hover:bg-[#9B5CFF] violet-button-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C084FC]"
          >
            Contact Me
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#292333] bg-[#0D0B14] text-white transition-colors hover:border-[#9B5CFF]/60 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-[#292333] bg-[#050508]/95 px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#9B5CFF]/15 text-white border border-[#9B5CFF]/40'
                        : 'text-[#A5A1B2] hover:bg-[#100D18] hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="font-mono text-xs text-[#C084FC]">Active</span>}
                  </a>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-[#292333] pt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-[#A5A1B2] truncate">{PROFILE.email}</span>
              <button
                type="button"
                onClick={() => handleLinkClick('contact')}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#9B5CFF] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0"
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
