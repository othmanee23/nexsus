import React, { useEffect, useId, useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';
import { CONTACT_EMAIL, FORMATTED_PHONE, FORMATTED_SECONDARY_PHONE } from '../config';
import { copy, Language } from '../i18n';

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDivision?: string;
  language: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedDivision,
  language,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>(
    preselectedDivision || 'group'
  );
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileWidgetId, setTurnstileWidgetId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const turnstileId = useId().replace(/:/g, '');
  const t = copy[language];

  useEffect(() => {
    if (isOpen) {
      setSelectedDivision(preselectedDivision || 'group');
    }
  }, [isOpen, preselectedDivision]);

  useEffect(() => {
    if (!isOpen || !turnstileSiteKey || turnstileWidgetId) return;

    const renderTurnstile = () => {
      const element = document.getElementById(turnstileId);
      if (!element || !window.turnstile || turnstileWidgetId) return;

      const widgetId = window.turnstile.render(element, {
        sitekey: turnstileSiteKey,
        callback: setTurnstileToken,
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
      setTurnstileWidgetId(widgetId);
    };

    if (!window.turnstile) {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
      );

      if (existingScript) {
        existingScript.addEventListener('load', renderTurnstile, { once: true });
        return () => existingScript.removeEventListener('load', renderTurnstile);
      }

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderTurnstile;
      document.head.appendChild(script);
      return;
    }

    renderTurnstile();
  }, [isOpen, turnstileId, turnstileWidgetId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          division: selectedDivision,
          name,
          organization,
          email,
          message,
          website,
          turnstileToken,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || t.contactError);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.contactError);
      if (turnstileWidgetId) {
        window.turnstile?.reset(turnstileWidgetId);
        setTurnstileToken('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setOrganization('');
    setEmail('');
    setMessage('');
    setWebsite('');
    setTurnstileToken('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        className="relative w-full max-w-2xl bg-white border border-black p-8 sm:p-12 shadow-2xl z-10 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-black/60 hover:text-black transition-colors cursor-pointer"
          aria-label="Close conversation dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-sans tracking-widest text-black/60 uppercase">
                {t.sentRef}
              </span>
              <h3 className="text-3xl font-normal tracking-tight text-black">
                {t.sentTitle}
              </h3>
              <p className="text-sm text-black/70 font-light leading-relaxed max-w-md">
                {t.sentBody}
              </p>
            </div>

            <div className="pt-4 border-t border-black/20">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-black hover:opacity-60 transition-opacity cursor-pointer border-b border-black pb-0.5"
              >
                <span>{t.returnOverview}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-[11px] font-sans tracking-widest text-black/60 uppercase">
                {t.directEngagement}
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-black">
                {t.startConversation}
              </h3>
              <p className="text-xs sm:text-sm text-black/60 font-light">
                {t.contactIntro}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="sr-only" htmlFor="contact-modal-website">
                Leave this field empty
              </label>
              <input
                id="contact-modal-website"
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Discipline Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-sans tracking-wider text-black uppercase block">
                  {t.selectDivision}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans">
                  {[
                    { id: 'projects', label: '01 / PROJECTS' },
                    { id: 'technology', label: '02 / TECHNOLOGY & SOLUTIONS' },
                    { id: 'amaris', label: '03 / AMARIS' },
                    { id: 'ventures', label: '04 / VENTURES' },
                    { id: 'group', label: t.groupLevel.toUpperCase() },
                  ].map((div) => (
                    <button
                      type="button"
                      key={div.id}
                      onClick={() => setSelectedDivision(div.id)}
                      className={`px-3 py-2 text-left border transition-colors cursor-pointer ${
                        selectedDivision === div.id
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black/70 border-black/20 hover:border-black hover:text-black'
                      }`}
                    >
                      {div.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-sans tracking-wider text-black/60 uppercase">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marc Dubois"
                    className="w-full bg-white border border-black/30 px-3.5 py-2.5 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-sans tracking-wider text-black/60 uppercase">
                    {t.organizationLabel}
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Atlas Holding SA"
                    className="w-full bg-white border border-black/30 px-3.5 py-2.5 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-sans tracking-wider text-black/60 uppercase">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white border border-black/30 px-3.5 py-2.5 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-sans tracking-wider text-black/60 uppercase">
                  {t.messageLabel}
                </label>
                <textarea
                  required
                  minLength={2}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the scope, objectives, timeframe, or partnership parameters..."
                  className="w-full bg-white border border-black/30 px-3.5 py-2.5 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black resize-none"
                />
              </div>

              {turnstileSiteKey ? (
                <div
                  id={turnstileId}
                  className="min-h-[65px]"
                  aria-label="Spam protection"
                />
              ) : null}

              <div className="pt-2">
                {error ? (
                  <p className="mb-3 text-xs text-red-700 font-sans" role="alert">
                    {error} {t.errorFallback}{' '}
                    <a className="underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                    {' '}or {FORMATTED_PHONE} / {FORMATTED_SECONDARY_PHONE}.
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black text-white py-3.5 text-xs font-sans tracking-widest uppercase hover:bg-black/85 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{submitting ? t.submitting : t.submit}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
