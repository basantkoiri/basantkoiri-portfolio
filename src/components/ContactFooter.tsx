import React, { useState } from 'react';
import { z } from 'zod';
import { Check, Copy, GraduationCap, Mail, Send } from 'lucide-react';
import type { ContactDispatchState } from '../types/curriculum';

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters).').max(80),
  email: z.string().trim().email('Please provide a valid email address.'),
  inquiryType: z.enum(['SWE Internship / Role', 'Full-Stack Client Project', 'Technical Collaboration']),
  message: z.string().trim().min(12, 'Please include at least 12 characters describing your opportunity.').max(1500)
});

export const ContactFooter: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'SWE Internship / Role' | 'Full-Stack Client Project' | 'Technical Collaboration'>(
    'SWE Internship / Role'
  );
  const [message, setMessage] = useState('');
  const [dispatchState, setDispatchState] = useState<ContactDispatchState>({ status: 'editing' });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const parsed = ContactSchema.safeParse({ name, email, inquiryType, message });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
      setDispatchState({ status: 'validation_error', errors });
      return;
    }

    const brief = [
      `To: Basant Koiri <basantkoiri5@gmail.com>`,
      `Inquiry Type: ${parsed.data.inquiryType}`,
      `From: ${parsed.data.name} (${parsed.data.email})`,
      ``,
      parsed.data.message
    ].join('\n');

    setDispatchState({ status: 'dispatched', formattedBrief: brief, copied: false });

    const subject = encodeURIComponent(`[${parsed.data.inquiryType}] Inquiry from ${parsed.data.name}`);
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:basantkoiri5@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyBrief = async (): Promise<void> => {
    if (dispatchState.status !== 'dispatched') return;
    try {
      await navigator.clipboard.writeText(dispatchState.formattedBrief);
      setDispatchState({ ...dispatchState, copied: true });
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  const fieldErrors = dispatchState.status === 'validation_error' ? dispatchState.errors : {};

  return (
    <footer id="contact" className="bg-[var(--bg-surface)] pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Credentials & Direct Contact */}
          <div className="lg:col-span-5">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
              Connect &amp; Recruit
            </div>
            <h2
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
              className="mt-2 font-bold tracking-tight text-[var(--text-primary)]"
            >
              Let’s Build Production Software.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              Available for Software Engineering internships, full-stack MERN development engagements, and algorithmic
              problem-solving collaborations.
            </p>

            <div className="mt-6 space-y-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5">
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-cyan)]" />
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    Bachelor of Information Technology (BIT)
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    Bhairahawa Multiple Campus · Tribhuvan University (IOST), Nepal
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-emerald)]" />
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">Direct Engineering Inbox</div>
                  <a
                    href="mailto:basantkoiri5@gmail.com"
                    className="font-mono text-xs text-[var(--accent-cyan)] hover:underline"
                  >
                    basantkoiri5@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Zod-Validated Static-Safe Dispatch Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[var(--text-primary)]">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="mt-1.5 w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent-cyan)] focus:outline-none"
                  />
                  {fieldErrors['name'] && (
                    <p className="mt-1 text-xs text-rose-500">{fieldErrors['name']}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[var(--text-primary)]">
                    Work / Personal Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@engineering.dev"
                    className="mt-1.5 w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent-cyan)] focus:outline-none"
                  />
                  {fieldErrors['email'] && (
                    <p className="mt-1 text-xs text-rose-500">{fieldErrors['email']}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="contact-type" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Engagement Scope
                </label>
                <select
                  id="contact-type"
                  value={inquiryType}
                  onChange={(e) =>
                    setInquiryType(
                      e.target.value as
                        | 'SWE Internship / Role'
                        | 'Full-Stack Client Project'
                        | 'Technical Collaboration'
                    )
                  }
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent-cyan)] focus:outline-none"
                >
                  <option value="SWE Internship / Role">SWE Internship / Role</option>
                  <option value="Full-Stack Client Project">Full-Stack Client Project</option>
                  <option value="Technical Collaboration">Technical Collaboration</option>
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Project or Role Brief
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, tech stack requirements, or project timelines…"
                  className="mt-1.5 w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent-cyan)] focus:outline-none"
                />
                {fieldErrors['message'] && (
                  <p className="mt-1 text-xs text-rose-500">{fieldErrors['message']}</p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
                >
                  <Send className="h-4 w-4" />
                  <span>Compose &amp; Dispatch Email</span>
                </button>

                {dispatchState.status === 'dispatched' && (
                  <button
                    type="button"
                    onClick={() => void handleCopyBrief()}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                  >
                    {dispatchState.copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[var(--accent-emerald)]" />
                        <span>Brief Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Formatted Brief</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <span>© {new Date().getFullYear()} Basant Koiri · basantkoiri.com.np</span>
          <span className="font-mono">Built with React 19 · TypeScript · Tailwind CSS v4 · Static Edge</span>
        </div>
      </div>
    </footer>
  );
};