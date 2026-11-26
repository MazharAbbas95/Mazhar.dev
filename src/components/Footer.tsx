import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { NAV_ITEMS } from './Navbar';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#292333] bg-[#050508] py-14">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Column 1: Brand & Short Description */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="font-display text-xl font-bold tracking-tight text-white"
            >
              MAZHAR<span className="text-[#9B5CFF]">.</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#A5A1B2]">
              Software Developer and Frontend Engineer at AHL Technologies, building practical software solutions and exploring Data Science, Machine Learning, and Agentic AI.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-[#A5A1B2]">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Direct Links */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">Connect</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A5A1B2]">
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <span>Email</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#292333]/80 pt-7 text-xs text-[#A5A1B2] sm:flex-row sm:items-center">
          <p>Designed and developed by Mazhar Abbas.</p>
          <p className="tabular-nums">&copy; {currentYear} Mazhar Abbas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
