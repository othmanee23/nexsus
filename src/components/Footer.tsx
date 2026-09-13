import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Phone } from 'lucide-react';
import { NexsusLogo } from './NexsusLogo';
import {
  ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FORMATTED_PHONE,
  FOUNDER_EMAIL,
  INSTAGRAM_URL,
  LEGAL_NAME,
} from '../config';
import { copy, Language } from '../i18n';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onOpenContact: () => void;
  onSelectDivision?: (divisionId: 'amaris' | 'projects' | 'technology' | 'ventures') => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, language }) => {
  const t = copy[language];

  return (
    <footer
      id="main-footer"
      className="w-full bg-white border-t border-black/10 pt-8 sm:pt-12 lg:pt-14 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1800px] mx-auto flex flex-col justify-between">
        {/* Top 3-Column Metadata Row with Staggered Scroll Animations */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-10 items-start text-xs sm:text-sm font-sans tracking-wider uppercase text-black">
          {/* Column 1: Location & Email */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col space-y-1 font-mono text-[11px] sm:text-xs text-black/80"
          >
            <p className="font-semibold text-black tracking-widest">{LEGAL_NAME}</p>
            {ADDRESS_LINES.map((line) => (
              <p key={line}>{line.toUpperCase()}</p>
            ))}
            <button
              onClick={onOpenContact}
              className="text-left hover:text-black hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              E: {CONTACT_EMAIL.toUpperCase()}
            </button>
          </motion.div>

          {/* Column 2: Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col space-y-1.5 font-mono text-[11px] sm:text-xs text-black/80"
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-black hover:translate-x-1 transition-all w-fit cursor-pointer"
            >
              {CONTACT_EMAIL.toUpperCase()}
            </a>
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="hover:text-black hover:translate-x-1 transition-all w-fit cursor-pointer"
            >
              {FOUNDER_EMAIL.toUpperCase()}
            </a>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="inline-flex items-center gap-2 hover:text-black hover:translate-x-1 transition-all w-fit cursor-pointer"
            >
              <Phone className="w-3 h-3" />
              {FORMATTED_PHONE}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-black hover:translate-x-1 transition-all w-fit cursor-pointer"
            >
              <Instagram className="w-3 h-3" />
              INSTAGRAM
            </a>
          </motion.div>

          {/* Column 3: Action Link (Right-aligned on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex lg:justify-end items-start"
          >
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 border-b border-black pb-0.5 text-xs font-mono uppercase tracking-widest text-black hover:opacity-60 transition-opacity cursor-pointer group"
            >
              <span>{t.getInTouch}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Giant Typography Section & Nexsus Brand Logo (Reduced Gap) */}
        <div className="w-full mt-8 sm:mt-12 lg:mt-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10">
          {/* Massive "Let's talk" Headline: "Let's" in Clean Sans, "talk" in Flowing Italic Serif */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            onClick={onOpenContact}
            className="cursor-pointer group flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 lg:gap-x-10 leading-[0.84] select-none"
            title={t.footerTitle}
          >
            <span className="text-[18vw] sm:text-[19vw] lg:text-[18vw] font-normal tracking-[-0.04em] text-black transition-opacity duration-300 group-hover:opacity-75 font-sans">
              {t.lets}
            </span>
            {t.talk ? (
              <span className="text-[19vw] sm:text-[20vw] lg:text-[19vw] font-serif italic font-normal tracking-[-0.03em] text-black transition-opacity duration-300 group-hover:opacity-75 font-['Instrument_Serif',Georgia,serif]">
                {t.talk}
              </span>
            ) : null}
          </motion.div>

          {/* Official NEXSUS Brandmark Logo in Bottom Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:mb-4 shrink-0 flex items-baseline self-end lg:self-auto"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer group flex items-center focus:outline-none"
              title="Back to top"
              aria-label="Back to top"
            >
              <NexsusLogo className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain transition-opacity duration-300 group-hover:opacity-70" />
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
