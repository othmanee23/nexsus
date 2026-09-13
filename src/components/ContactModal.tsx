import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';
import { CONTACT_EMAIL } from '../config';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDivision?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preselectedDivision,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<string>(
    preselectedDivision || 'group'
  );
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your inquiry right now.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your inquiry right now.');
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
                INQUIRY DISPATCHED • REF: NX-2026-921
              </span>
              <h3 className="text-3xl font-normal tracking-tight text-black">
                Transmission received.
              </h3>
              <p className="text-sm text-black/70 font-light leading-relaxed max-w-md">
                Thank you, <span className="text-black font-medium">{name}</span>. The NEXSUS executive team will evaluate your inquiry across the relevant division and establish contact within 24 business hours.
              </p>
            </div>

            <div className="pt-4 border-t border-black/20">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-black hover:opacity-60 transition-opacity cursor-pointer border-b border-black pb-0.5"
              >
                <span>RETURN TO OVERVIEW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="text-[11px] font-sans tracking-widest text-black/60 uppercase">
                DIRECT ENGAGEMENT
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-black">
                Start a <span className="font-editorial-italic font-normal text-3xl sm:text-4xl">conversation.</span>
              </h3>
              <p className="text-xs sm:text-sm text-black/60 font-light">
                Direct your proposal or partnership inquiry to the appropriate operating discipline.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

              {/* Discipline Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-sans tracking-wider text-black uppercase block">
                  Select Relevant Division:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-sans">
                  {[
                    { id: 'group', label: 'GROUP LEVEL' },
                    { id: 'amaris', label: '01 / AMARIS' },
                    { id: 'projects', label: '02 / PROJECTS' },
                    { id: 'technology', label: '03 / TECH & SOL' },
                    { id: 'ventures', label: '04 / VENTURES' },
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
                    Your Name *
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
                    Organization / Entity
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
                  Email Address *
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
                  Brief / Opportunity Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the scope, objectives, timeframe, or partnership parameters..."
                  className="w-full bg-white border border-black/30 px-3.5 py-2.5 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="pt-2">
                {error ? (
                  <p className="mb-3 text-xs text-red-700 font-sans" role="alert">
                    {error} You can also email us directly at{' '}
                    <a className="underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black text-white py-3.5 text-xs font-sans tracking-widest uppercase hover:bg-black/85 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{submitting ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}</span>
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
