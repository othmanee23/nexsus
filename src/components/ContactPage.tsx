import React, { useState } from 'react';
import { ArrowRight, Instagram, Phone } from 'lucide-react';
import {
  AMARIS_INSTAGRAM_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FORMATTED_PHONE,
  FORMATTED_SECONDARY_PHONE,
  INSTAGRAM_URL,
  SECONDARY_PHONE,
} from '../config';
import { copy, Language } from '../i18n';

interface ContactPageProps {
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const t = copy[language];
  const [division, setDivision] = useState('group');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ division, name, organization, email, message, website }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || t.contactError);

      setStatus(t.sentBody);
      setName('');
      setOrganization('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : t.contactError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-1 bg-white px-4 py-16 text-black sm:px-8 sm:py-20 lg:px-12">
      <section className="mx-auto grid w-full max-w-[1800px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-black/50">
            Contact
          </div>
          <h1 className="mt-4 text-4xl font-medium uppercase leading-[0.98] tracking-tight sm:text-6xl">
            {t.startConversation}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60">
            {t.contactIntro}
          </p>

          <div className="mt-10 space-y-3 border-t border-black/10 pt-6 text-sm text-black/75">
            <a className="block hover:text-black" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL.toUpperCase()}
            </a>
            <a className="inline-flex items-center gap-2 hover:text-black" href={`tel:${CONTACT_PHONE}`}>
              <Phone className="h-4 w-4" />
              {FORMATTED_PHONE}
            </a>
            <a className="flex items-center gap-2 hover:text-black" href={`tel:${SECONDARY_PHONE}`}>
              <Phone className="h-4 w-4" />
              {FORMATTED_SECONDARY_PHONE}
            </a>
            <a className="inline-flex items-center gap-2 hover:text-black" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram className="h-4 w-4" />
              @the_nexsus_
            </a>
            <a className="flex items-center gap-2 hover:text-black" href={AMARIS_INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram className="h-4 w-4" />
              @amaris_from_nexsus
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-7">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="space-y-7">
            <div>
              <label className="text-[11px] font-sans uppercase tracking-wider text-black">
                {t.selectDivision}
              </label>
              <div className="mt-3 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
                {[
                  { id: 'projects', label: '01 / PROJECTS' },
                  { id: 'technology', label: '02 / TECHNOLOGY & SOLUTIONS' },
                  { id: 'amaris', label: '03 / AMARIS' },
                  { id: 'ventures', label: '04 / VENTURES' },
                  { id: 'group', label: t.groupLevel.toUpperCase() },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDivision(item.id)}
                    className={`border px-4 py-3 text-left uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                      division === item.id
                        ? 'border-black bg-black text-white'
                        : 'border-black/20 text-black/70 hover:border-black hover:text-black'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-sans uppercase tracking-wider text-black/60">{t.nameLabel}</span>
                <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full border border-black/30 px-4 py-3 text-sm focus:outline-none focus:border-black" />
              </label>
              <label className="block">
                <span className="text-[11px] font-sans uppercase tracking-wider text-black/60">{t.organizationLabel}</span>
                <input value={organization} onChange={(e) => setOrganization(e.target.value)} className="mt-2 w-full border border-black/30 px-4 py-3 text-sm focus:outline-none focus:border-black" />
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] font-sans uppercase tracking-wider text-black/60">{t.emailLabel}</span>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border border-black/30 px-4 py-3 text-sm focus:outline-none focus:border-black" />
            </label>

            <label className="block">
              <span className="text-[11px] font-sans uppercase tracking-wider text-black/60">{t.messageLabel}</span>
              <textarea required minLength={2} rows={7} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full resize-none border border-black/30 px-4 py-3 text-sm focus:outline-none focus:border-black" />
            </label>

            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            {status ? <p className="text-sm text-black">{status}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 bg-black px-6 py-4 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-black/85 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              <span>{submitting ? t.submitting : t.submit}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;
