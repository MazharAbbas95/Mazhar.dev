import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FileText, Mail, ArrowRight, X, Download } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestViaForm: () => void;
}

export function ResumeModal({ isOpen, onClose, onRequestViaForm }: ResumeModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#292333] bg-[#100D18] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="violet-card-glow pointer-events-none absolute inset-0 opacity-70" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#292333] bg-[#0D0B14] text-[#C084FC]">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#A5A1B2]">Resume Document</p>
                    <h3 id="resume-modal-title" className="font-display text-xl font-semibold text-white">
                      Mazhar Abbas — CV / Resume
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#292333] bg-[#0D0B14] text-[#A5A1B2] transition-colors hover:border-[#9B5CFF]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#A5A1B2]">
                <p>
                  Official recruiter-ready, ATS-optimized resume for <strong className="text-white">Mazhar Abbas</strong> (Software Developer). Available for direct download in both PDF and editable Word (DOCX) formats.
                </p>
                <p className="text-xs text-[#A5A1B2]/80">
                  Verified with current role at AHL Technologies, BSCS coursework at MNSUAM, key software engineering projects, and national competition achievements.
                </p>
              </div>

              {/* Direct Download Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/resume/Mazhar_Abbas_ATS_Resume.pdf"
                  download="Mazhar_Abbas_ATS_Resume.pdf"
                  className="resume-download-button inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#9B5CFF] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#8B46FF] violet-button-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C084FC]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Resume (PDF)</span>
                </a>
                <a
                  href="/resume/Mazhar_Abbas_ATS_Resume.docx"
                  download="Mazhar_Abbas_ATS_Resume.docx"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#292333] bg-[#0D0B14] px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#9B5CFF]/50 hover:bg-[#171224] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
                >
                  <FileText className="h-4 w-4 text-[#C084FC]" aria-hidden="true" />
                  <span>Download (DOCX)</span>
                </a>
              </div>

              {/* Secondary Inquiries */}
              <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-[#292333]/60 sm:flex-row text-xs text-[#A5A1B2]">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequestViaForm();
                  }}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Request custom version via contact form</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </button>
                <span className="hidden sm:inline text-[#292333]">•</span>
                <a
                  href={`mailto:${PROFILE.email}?subject=${encodeURIComponent('Resume Inquiry — Mazhar Abbas')}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="h-3 w-3 text-[#C084FC]" aria-hidden="true" />
                  <span>Email Directly</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
