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
import { InsightsPage } from './components/InsightsPage';
import { InsightArticlePage } from './components/InsightArticlePage';
import { ContactPage } from './components/ContactPage';
import { getInsight } from './insights';
import { SITE_DESCRIPTION, SITE_TITLE } from './config';
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
  const normalizePath = () => {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    return pathname.replace(/^\/(fr|ar)(?=\/|$)/, '') || '/';
  };
  const [route, setRoute] = useState<string>(normalizePath);
  const dir = LANGUAGES.find((item) => item.code === language)?.dir || 'ltr';

  const pathForLanguage = (path: string, targetLanguage = language) => {
    const cleanPath = path === '/' ? '' : path.replace(/^\/?/, '/');
    return targetLanguage === 'en' ? cleanPath || '/' : `/${targetLanguage}${cleanPath || ''}`;
  };

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.history.replaceState({}, '', pathForLanguage(route, nextLanguage));
  };

  const handleOpenContact = (divisionId = 'group') => {
    setContactDivision(divisionId);
    setContactOpen(true);
  };

  const handleRouteNavigate = (path: string) => {
    const nextRoute = path === '/' ? '/' : path.replace(/\/+$/, '');
    setRoute(nextRoute);
    window.history.pushState({}, '', pathForLanguage(nextRoute));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionNavigate = (sectionId: string) => {
    if (route !== '/') {
      setRoute('/');
      window.history.pushState({}, '', pathForLanguage('/'));
      window.setTimeout(() => handleSectionNavigate(sectionId), 40);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(normalizePath());
      setLanguageState(initialLanguage());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    const matchedInsight = route.match(/^\/insight\/([^/]+)$/);
    const title = matchedInsight
      ? `${getInsight(matchedInsight[1])?.title || 'Insight'} - NEXSUS`
      : route === '/insight'
        ? 'Insights - NEXSUS'
        : route === '/about'
          ? 'About - NEXSUS PROJECT SARL'
          : route === '/contact'
            ? 'Contact - NEXSUS PROJECT SARL'
            : SITE_TITLE;
    const description = route === '/insight'
      ? 'Perspectives from NEXSUS on projects, technology, creative direction, and venture development.'
      : matchedInsight
        ? getInsight(matchedInsight[1])?.excerpt || SITE_DESCRIPTION
        : SITE_DESCRIPTION;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    document.title = title;
    if (descriptionTag) descriptionTag.content = description;
  }, [route]);

  const articleMatch = route.match(/^\/insight\/([^/]+)$/);
  const page =
    route === '/about' ? (
      <main className="flex-1 w-full flex flex-col">
        <AboutSection onOpenContact={() => handleOpenContact('group')} language={language} />
        <FAQSection
          onOpenContact={() => handleRouteNavigate('/contact')}
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          language={language}
        />
      </main>
    ) : route === '/contact' ? (
      <ContactPage language={language} />
    ) : route === '/insight' ? (
      <InsightsPage onNavigate={handleRouteNavigate} language={language} />
    ) : articleMatch ? (
      <InsightArticlePage slug={articleMatch[1]} onNavigate={handleRouteNavigate} language={language} />
    ) : (
      <main className="flex-1 w-full flex flex-col">
        <Hero
          onOpenContact={() => handleRouteNavigate('/contact')}
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          language={language}
        />

        <DivisionsGrid
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          onOpenContact={handleOpenContact}
          language={language}
        />

        <FAQSection
          onOpenContact={() => handleRouteNavigate('/contact')}
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          language={language}
        />

        <ClientsSection language={language} />
      </main>
    );

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
        onNavigate={handleSectionNavigate}
        onRouteNavigate={handleRouteNavigate}
        language={language}
        onLanguageChange={setLanguage}
      />

      {page}

      {/* Minimal Footer */}
      <Footer
        onNavigate={handleSectionNavigate}
        onOpenContact={() => handleRouteNavigate('/contact')}
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
