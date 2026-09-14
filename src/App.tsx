import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DivisionsGrid } from './components/DivisionsGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { LoadingScreen } from './components/LoadingScreen';
import { FAQSection } from './components/FAQSection';
import { ClientsSection } from './components/ClientsSection';
import { LANGUAGES, Language } from './i18n';

export const App: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactDivision, setContactDivision] = useState<string>('group');
  const initialLanguage = (): Language => {
    if (window.location.pathname.startsWith('/fr')) return 'fr';
    if (window.location.pathname.startsWith('/ar')) return 'ar';
    return 'en';
  };
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const dir = LANGUAGES.find((item) => item.code === language)?.dir || 'ltr';

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    const nextPath = nextLanguage === 'en' ? '/' : `/${nextLanguage}/`;
    window.history.replaceState({}, '', nextPath);
  };

  const handleOpenContact = (divisionId = 'group') => {
    setContactDivision(divisionId);
    setContactOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={dir}
      lang={language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-MA' : 'en-MA'}
      className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white flex flex-col justify-between"
    >
      {/* Intro Loading Screen with Centered Logo & Zoom-Out Website Entry */}
      <LoadingScreen durationMs={1600} />

      {/* Top Header */}
      <Header
        onOpenContact={() => handleOpenContact('group')}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content: Hero, Disciplines Interactive Grid, and About The Brand */}
      <main className="flex-1 w-full flex flex-col">
        <Hero
          onOpenContact={() => handleOpenContact('group')}
          onSelectDivision={(id) => handleNavigate(`division-${id}`)}
          language={language}
        />

        {/* Divisions Interactive Showcase & Cards Grid */}
        <DivisionsGrid
          onSelectDivision={(id) => handleNavigate(`division-${id}`)}
          onOpenContact={handleOpenContact}
          language={language}
        />

        {/* High-Level About The Brand Section */}
        <AboutSection
          onOpenContact={() => handleOpenContact('group')}
          language={language}
        />

        <FAQSection
          onOpenContact={() => handleOpenContact('group')}
          onSelectDivision={(id) => handleNavigate(`division-${id}`)}
          language={language}
        />

        <ClientsSection language={language} />
      </main>

      {/* Minimal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact('group')}
        onSelectDivision={(id) => handleOpenContact(id)}
        language={language}
      />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        preselectedDivision={contactDivision}
        language={language}
      />

      <Analytics />
    </div>
  );
};

export default App;
