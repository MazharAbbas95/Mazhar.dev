import { useEffect, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/profile';

interface ContactProps {
  prefillSubject?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact({ prefillSubject }: ContactProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot spam protection

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    | { type: 'idle' }
    | { type: 'success'; text: string }
    | { type: 'error'; text: string; unconfigured?: boolean }
  >({ type: 'idle' });

  useEffect(() => {
    if (prefillSubject) {
      setSubject(prefillSubject);
    }
  }, [prefillSubject]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (subject.trim().length < 2) {
      nextErrors.subject = 'Please enter a subject.';
    }
    if (message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitState({ type: 'idle' });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setSubmitState({
          type: 'success',
          text: data?.message || 'Thank you! Your message has been sent successfully.',
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setErrors({});
      } else {
        const unconfigured = data?.unconfigured || response.status === 503;
        setSubmitState({
          type: 'error',
          text:
            data?.message ||
            'Unable to send message via automated dispatch. Please reach out via direct email.',
          unconfigured,
        });
      }
    } catch {
      setSubmitState({
        type: 'error',
        text: 'Network issue encountered. Please reach out directly at mazharabbasawan95@gmail.com.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoFallbackHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject.trim() || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `${message.trim()}${name.trim() ? `\n\n— ${name.trim()} (${email.trim()})` : ''}`
  )}`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#9B5CFF]/18 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        {/* Reference Video Contact Title & Glowing Copy Email Button */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contact <span className="text-gradient-violet">Me</span>
          </h2>
          <p className="mt-3.5 text-base text-[#A5A1B2] sm:text-lg">
            Tell me about your next project.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-[#9B5CFF] bg-[#0c0819] px-8 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(155,92,255,0.45)] transition-all duration-200 hover:scale-105 hover:border-[#C084FC] hover:shadow-[0_0_45px_rgba(155,92,255,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CFF]"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#22c55e]" aria-hidden="true" />
                  <span>Email Copied ✓</span>
                </>
              ) : (
                <>
                  <span>Copy Email</span>
                  <Copy className="h-4 w-4 text-[#C084FC]" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* 3 Columns matching Reference Video exact layout */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 border-b border-[#292338]/80 pb-16">
          {/* Column 1: Email & Location */}
          <div className="space-y-6 text-center md:text-left">
            <div>
              <h3 className="font-display text-lg font-bold text-[#C084FC]">Email</h3>
              <p className="mt-1.5 font-mono text-sm text-white select-all">
                {PROFILE.email}
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#C084FC]">Location</h3>
              <p className="mt-1.5 text-sm text-white/90">
                {PROFILE.location}
              </p>
            </div>
          </div>

          {/* Column 2: Social Media with Arrows */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-display text-lg font-bold text-[#C084FC]">Social Media</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.instagram.com/its___malik___mazhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>Instagram</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61562761576435"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>FaceBook</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Column 3: Write Me & We'll Talk */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-display text-lg font-bold text-[#C084FC]">Write Me &amp; We&apos;ll Talk</h3>
            <div className="space-y-2.5 text-sm">
              <a
                href="https://wa.me/923262066565"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>Direct Mail</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C084FC] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact-form"
                className="group flex items-center justify-center md:justify-start gap-1.5 text-white/80 transition-colors hover:text-white"
              >
                <span>Send Message Form ↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form below directory */}
        <div id="contact-form" className="mt-16 mx-auto max-w-2xl rounded-3xl border border-[#292338] bg-[#0c0819] p-8 sm:p-10 shadow-[0_20px_50px_rgba(155,92,255,0.14)]">
          <h3 className="font-display text-2xl font-bold text-white text-center">
            Send a Direct Message
          </h3>
          <p className="mt-2 text-sm text-[#A5A1B2] text-center">
            Leave a note below and I&apos;ll get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            {/* Honeypot anti-spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#A5A1B2]">
                  Your Name <span className="text-[#C084FC]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. Alex Hunter"
                  className={`mt-2 w-full rounded-xl border bg-[#080512] px-4 py-3 text-sm text-white placeholder-[#64748b] transition-colors focus:border-[#9B5CFF] focus:outline-none focus:ring-1 focus:ring-[#9B5CFF] ${errors.name ? 'border-[#EF4444]' : 'border-[#292338]'
                    }`}
                />
                {errors.name && <p className="mt-1 text-xs text-[#EF4444]">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#A5A1B2]">
                  Your Email <span className="text-[#C084FC]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="name@company.com"
                  className={`mt-2 w-full rounded-xl border bg-[#080512] px-4 py-3 text-sm text-white placeholder-[#64748b] transition-colors focus:border-[#9B5CFF] focus:outline-none focus:ring-1 focus:ring-[#9B5CFF] ${errors.email ? 'border-[#EF4444]' : 'border-[#292338]'
                    }`}
                />
                {errors.email && <p className="mt-1 text-xs text-[#EF4444]">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#A5A1B2]">
                Subject <span className="text-[#C084FC]">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                }}
                placeholder="Project Collaboration / Engineering Opportunity"
                className={`mt-2 w-full rounded-xl border bg-[#080512] px-4 py-3 text-sm text-white placeholder-[#64748b] transition-colors focus:border-[#9B5CFF] focus:outline-none focus:ring-1 focus:ring-[#9B5CFF] ${errors.subject ? 'border-[#EF4444]' : 'border-[#292338]'
                  }`}
              />
              {errors.subject && <p className="mt-1 text-xs text-[#EF4444]">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#A5A1B2]">
                Message <span className="text-[#C084FC]">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                placeholder="Share details about your project or inquiry..."
                className={`mt-2 w-full rounded-xl border bg-[#080512] px-4 py-3 text-sm text-white placeholder-[#64748b] transition-colors focus:border-[#9B5CFF] focus:outline-none focus:ring-1 focus:ring-[#9B5CFF] ${errors.message ? 'border-[#EF4444]' : 'border-[#292338]'
                  }`}
              />
              {errors.message && <p className="mt-1 text-xs text-[#EF4444]">{errors.message}</p>}
            </div>

            {submitState.type === 'success' && (
              <div className="flex items-center gap-2.5 rounded-xl border border-[#22c55e]/40 bg-[#22c55e]/10 p-4 text-xs font-medium text-[#86efac]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22c55e]" />
                <span>{submitState.text}</span>
              </div>
            )}

            {submitState.type === 'error' && (
              <div className="space-y-2 rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 p-4 text-xs text-[#fca5a5]">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-[#ef4444]" />
                  <span>{submitState.text}</span>
                </div>
                {submitState.unconfigured && (
                  <a
                    href={mailtoFallbackHref}
                    className="inline-block font-semibold text-white underline hover:text-[#C084FC]"
                  >
                    Click here to open your default email client directly →
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#9B5CFF] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(155,92,255,0.4)] transition-all duration-200 hover:bg-[#A855F7] hover:shadow-[0_0_36px_rgba(155,92,255,0.6)] disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Dispatching Message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
