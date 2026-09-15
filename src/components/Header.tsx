import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NexsusLogo } from './NexsusLogo';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { copy, LANGUAGES, Language } from '../i18n';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
  onRouteNavigate: (path: string) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onRouteNavigate, language, onLanguageChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  const t = copy[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTimeString(`${formatter.format(now)} GMT`);
      } catch {
        setTimeString('23:35 GMT');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateTo = (path: string) => {
    setMobileMenuOpen(false);
    onRouteNavigate(path);
  };

  return (
    <>
      {/* 1. TOP STATIC HEADER */}
      <motion.header
        id="top-header"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white py-5 sm:py-6 px-4 sm:px-8 lg:px-12 select-none"
      >
        <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Left: Official Nexsus Brand Logo */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center cursor-pointer group focus:outline-none"
            aria-label="Back to top"
          >
            <NexsusLogo className="h-5 sm:h-6 w-auto object-contain transition-opacity duration-200 group-hover:opacity-70" />
          </button>

          {/* Center: Navigation "SERVICES ABOUT" */}
          <nav className="hidden md:flex items-center space-x-10 text-xs sm:text-[13px] tracking-widest font-medium uppercase text-black">
            <button onClick={() => navigateTo('/')} className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none">
              {t.home}
            </button>
            <button
              onClick={() => navigateTo('/contact')}
              className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
            >
              {t.contact}
            </button>
            <button
              onClick={() => navigateTo('/about')}
              className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
            >
              {t.about}
            </button>
            <button
              onClick={() => navigateTo('/insight')}
              className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
            >
              {t.insights}
            </button>
          </nav>

          {/* Right: GMT Time & Underlined "GET IN TOUCH →" */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="hidden sm:inline-block text-xs font-mono tracking-wider text-black/80">
              {timeString}
            </span>

            <div className="hidden sm:flex items-center gap-1 border border-black/15 p-0.5">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onLanguageChange(item.code)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors ${
                    language === item.code ? 'bg-black text-white' : 'text-black/60 hover:text-black'
                  }`}
                  aria-pressed={language === item.code}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigateTo('/contact')}
              className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-black hover:opacity-60 transition-opacity cursor-pointer border-b border-black pb-0.5 group focus:outline-none"
            >
              <span>{t.getInTouch}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-black focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* 2. SCROLL HEADER: Sticky header that slides in smoothly with the official brand logo */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            id="scroll-header"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/10 py-3.5 px-4 sm:px-8 lg:px-12 shadow-[0_1px_3px_rgba(0,0,0,0.03)] select-none"
          >
            <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
              {/* Left: Official Nexsus Brand Logo */}
              <button
                onClick={() => navigateTo('/')}
                className="flex items-center cursor-pointer group focus:outline-none"
                aria-label="Back to top"
              >
                <NexsusLogo className="h-5 sm:h-5.5 w-auto object-contain transition-opacity duration-200 group-hover:opacity-70" />
              </button>

              {/* Center: Navigation "SERVICES ABOUT" */}
              <nav className="hidden md:flex items-center space-x-10 text-xs sm:text-[13px] tracking-widest font-medium uppercase text-black">
                <button onClick={() => navigateTo('/')} className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none">
                  {t.home}
                </button>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
                >
                  {t.contact}
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
                >
                  {t.about}
                </button>
                <button
                  onClick={() => navigateTo('/insight')}
                  className="hover:opacity-60 transition-opacity cursor-pointer focus:outline-none"
                >
                  {t.insights}
                </button>
              </nav>

              {/* Right: GMT Time & Underlined "GET IN TOUCH →" */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <span className="hidden sm:inline-block text-xs font-mono tracking-wider text-black/80">
                  {timeString}
                </span>

                <div className="hidden sm:flex items-center gap-1 border border-black/15 p-0.5">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => onLanguageChange(item.code)}
                      className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors ${
                        language === item.code ? 'bg-black text-white' : 'text-black/60 hover:text-black'
                      }`}
                      aria-pressed={language === item.code}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => navigateTo('/contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-black hover:opacity-60 transition-opacity cursor-pointer border-b border-black pb-0.5 group focus:outline-none"
                >
                  <span>{t.getInTouch}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1 text-black focus:outline-none cursor-pointer"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-[56px] bg-white z-40 px-6 py-8 flex flex-col justify-between border-t border-black/10"
          >
            <div className="space-y-8 pt-4">
              <div className="text-[11px] font-mono tracking-widest text-black/50 uppercase">
                {t.navigation}
              </div>
              <div className="flex flex-col space-y-6 text-xl font-medium tracking-tight text-black uppercase">
                <button onClick={() => navigateTo('/')} className="text-left hover:opacity-60 transition-opacity cursor-pointer">
                  {t.home}
                </button>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="text-left hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {t.contact}
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="text-left hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {t.aboutNexsus}
                </button>
                <button
                  onClick={() => navigateTo('/insight')}
                  className="text-left hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {t.insights}
                </button>
              </div>
              <div className="flex items-center gap-2 pt-2">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => onLanguageChange(item.code)}
                    className={`px-3 py-2 border text-xs font-mono uppercase ${
                      language === item.code
                        ? 'bg-black text-white border-black'
                        : 'border-black/20 text-black/70'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-black/10 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono tracking-wider text-black/60 uppercase">
                <span>{t.heroLocation} / 2025</span>
                <span>{timeString}</span>
              </div>
              <button
                onClick={() => {
                  navigateTo('/contact');
                }}
                className="w-full py-3.5 bg-black text-white text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer hover:bg-black/90 transition-colors"
              >
                <span>{t.getInTouch}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
