import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { NexsusLogo } from './NexsusLogo';
import { copy, Language } from '../i18n';

const InteractiveHeroLogo = lazy(() =>
  import('./InteractiveHeroLogo').then((module) => ({ default: module.InteractiveHeroLogo })),
);

interface HeroProps {
  onOpenContact: () => void;
  onSelectDivision?: (divisionId: 'projects' | 'technology' | 'amaris' | 'ventures') => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onSelectDivision, language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enhanceLogo, setEnhanceLogo] = useState(false);
  const t = copy[language];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth architectural scale down on scroll
  const logoScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.5]);
  const logoY = useTransform(scrollYProgress, [0, 0.8], [0, 16]);

  const handleDisciplineClick = (divisionId: 'projects' | 'technology' | 'amaris' | 'ventures') => {
    if (onSelectDivision) {
      onSelectDivision(divisionId);
    } else {
      const el = document.getElementById('divisions-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const enableEnhancement = () => setEnhanceLogo(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(enableEnhancement, { timeout: 1800 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(enableEnhancement, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative flex flex-col pt-4 sm:pt-6 pb-14 sm:pb-20 px-4 sm:px-8 lg:px-12 w-full"
    >
      {/* Massive Visual Hero: NEXSUS Wordmark spanning full width */}
      <div className="w-full pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 select-none overflow-hidden">
        <motion.h1
          style={{
            scale: logoScale,
            opacity: logoOpacity,
            y: logoY,
            transformOrigin: 'left center',
          }}
          className="w-full transition-transform ease-out will-change-transform"
        >
          <span className="sr-only">NEXSUS</span>
          {enhanceLogo ? (
            <Suspense
              fallback={
                <NexsusLogo
                  fillColor="#000000"
                  className="w-full h-auto max-h-[35vh] sm:max-h-[46vh] object-contain"
                />
              }
            >
              <InteractiveHeroLogo className="w-full h-auto max-h-[35vh] sm:max-h-[46vh] object-contain" />
            </Suspense>
          ) : (
            <NexsusLogo
              fillColor="#000000"
              className="w-full h-auto max-h-[35vh] sm:max-h-[46vh] object-contain"
            />
          )}
        </motion.h1>
      </div>

      {/* Editorial Content Below Logo - Full Width, One Left, One Right */}
      <div className="pt-8 sm:pt-14 pb-4 w-full">
        <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16">
          {/* Left Block: Strictly on Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-3 font-mono text-[11px] sm:text-xs tracking-widest uppercase text-black/60 shrink-0"
          >
            <div className="flex items-center gap-2 text-black">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="font-semibold">{t.independentGroup}</span>
            </div>
            <p className="text-black/60">33.9265° N, 6.9123° W • {t.heroLocation}</p>
            <p className="text-[10px] text-black/60">{t.rights}</p>
          </motion.div>

          {/* Right Block: Strictly on Right */}
          <div className="flex flex-col space-y-6 sm:space-y-8 max-w-2xl lg:max-w-3xl">
            <p className="text-lg sm:text-xl lg:text-2xl font-light tracking-[-0.015em] leading-[1.35] text-black">
              {t.heroLead}
              {t.heroEmphasis ? (
                <>
                  {' '}
                  <span className="font-medium text-black underline decoration-black/25 underline-offset-6">
                    {t.heroEmphasis}
                  </span>
                  .
                </>
              ) : null}
            </p>

            {/* Minimal Discipline Index Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              {(
                [
                  { id: 'projects', label: 'PROJECTS' },
                  { id: 'technology', label: 'TECHNOLOGY & SOLUTIONS' },
                  { id: 'amaris', label: 'AMARIS' },
                  { id: 'ventures', label: 'VENTURES' },
                ] as const
              ).map((d, i) => (
                <a
                  key={d.id}
                  href={`${language === 'en' ? '' : `/${language}`}/${d.id}`}
                  onClick={(event) => {
                    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    handleDisciplineClick(d.id);
                  }}
                  className="text-[11px] font-mono tracking-widest uppercase px-3 py-1.5 border border-black/15 hover:border-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  0{i + 1} / {d.label}
                </a>
              ))}

              <a
                id="hero-contact-btn"
                href={`${language === 'en' ? '' : `/${language}`}/contact`}
                onClick={(event) => {
                  if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  onOpenContact();
                }}
                className="text-[11px] font-mono tracking-widest uppercase px-3.5 py-1.5 bg-black text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                {t.connect} →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
