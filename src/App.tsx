import React, { Suspense, lazy, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DivisionsGrid } from './components/DivisionsGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { FAQSection } from './components/FAQSection';
import { ClientsSection } from './components/ClientsSection';
import { getInsight, getInsightCategory, type DivisionSlug, type InsightCategorySlug } from './insights';
import { applySeoMetadata, getSeoMetadata } from './seo';
import { LANGUAGES, Language } from './i18n';

const ContactModal = lazy(() =>
  import('./components/ContactModal').then((module) => ({ default: module.ContactModal })),
);
const ContactPage = lazy(() =>
  import('./components/ContactPage').then((module) => ({ default: module.ContactPage })),
);
const DivisionPage = lazy(() =>
  import('./components/DivisionPage').then((module) => ({ default: module.DivisionPage })),
);
const InsightsPage = lazy(() =>
  import('./components/InsightsPage').then((module) => ({ default: module.InsightsPage })),
);
const InsightArticlePage = lazy(() =>
  import('./components/InsightArticlePage').then((module) => ({
    default: module.InsightArticlePage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

export const App: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactDivision, setContactDivision] = useState<string>('group');
  const initialLanguage = (): Language => {
    if (window.location.pathname.startsWith('/fr')) return 'fr';
    if (window.location.pathname.startsWith('/ar')) return 'ar';
    return 'en';
  };
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const shouldLoadAnalytics = !['localhost', '127.0.0.1'].includes(window.location.hostname);
  const normalizePath = () => {
    const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
    const withoutLanguage = pathname.replace(/^\/(fr|ar)(?=\/|$)/, '') || '/';
    if (withoutLanguage === '/insight') return '/insights';
    if (withoutLanguage.startsWith('/insight/')) return withoutLanguage.replace('/insight/', '/insights/');
    return withoutLanguage;
  };
  const [route, setRoute] = useState<string>(normalizePath);
  const dir = LANGUAGES.find((item) => item.code === language)?.dir || 'ltr';

  const pathForLanguage = (path: string, targetLanguage = language) => {
    const cleanPath = path === '/' ? '' : path.replace(/^\/?/, '/');
    if (cleanPath.startsWith('/insights')) return cleanPath;
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
    applySeoMetadata(getSeoMetadata(route, language));
  }, [route, language]);

  React.useEffect(() => {
    const pathname = window.location.pathname;
    if (!pathname.includes('/insight')) return;
    const canonicalPath = pathname.replace(/\/insight(?=\/|$)/, '/insights');
    window.history.replaceState({}, '', canonicalPath);
  }, []);

  const categoryMatch = route.match(/^\/insights\/(projects|technology|brand-creative|ventures)$/);
  const articleMatch = route.match(/^\/insights\/([^/]+)$/);
  const divisionMatch = route.match(/^\/(projects|technology|amaris|ventures)$/);
  const article = articleMatch && !categoryMatch ? getInsight(articleMatch[1]) : undefined;
  const category = categoryMatch ? getInsightCategory(categoryMatch[1]) : undefined;
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
    ) : divisionMatch ? (
      <DivisionPage
        slug={divisionMatch[1] as DivisionSlug}
        language={language}
        onNavigate={handleRouteNavigate}
      />
    ) : route === '/insights' ? (
      <InsightsPage onNavigate={handleRouteNavigate} language={language} />
    ) : category ? (
      <InsightsPage
        onNavigate={handleRouteNavigate}
        language={language}
        categorySlug={category.slug as InsightCategorySlug}
      />
    ) : article ? (
      <InsightArticlePage slug={article.slug} onNavigate={handleRouteNavigate} language={language} />
    ) : route === '/' ? (
      <main className="flex-1 w-full flex flex-col">
        <Hero
          onOpenContact={() => handleRouteNavigate('/contact')}
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          language={language}
        />

        <DivisionsGrid
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          onOpenContact={handleOpenContact}
          onRouteNavigate={handleRouteNavigate}
          language={language}
        />

        <FAQSection
          onOpenContact={() => handleRouteNavigate('/contact')}
          onSelectDivision={(id) => handleSectionNavigate(`division-${id}`)}
          language={language}
        />

        <ClientsSection language={language} />
      </main>
    ) : (
      <NotFoundPage onNavigate={handleRouteNavigate} />
    );

  return (
    <div
      dir={dir}
      lang={language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-MA' : 'en-MA'}
      className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white flex flex-col justify-between"
    >
      {/* Top Header */}
      <Header
        onNavigate={handleSectionNavigate}
        onRouteNavigate={handleRouteNavigate}
        language={language}
        onLanguageChange={setLanguage}
      />

      <Suspense fallback={null}>{page}</Suspense>

      {/* Minimal Footer */}
      <Footer
        onNavigate={handleSectionNavigate}
        onOpenContact={() => handleRouteNavigate('/contact')}
        onSelectDivision={(id) => handleOpenContact(id)}
        language={language}
      />

      {/* Interactive Contact Modal */}
      {contactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={contactOpen}
            onClose={() => setContactOpen(false)}
            preselectedDivision={contactDivision}
            language={language}
          />
        </Suspense>
      )}

      {shouldLoadAnalytics && <Analytics />}
    </div>
  );
};

export default App;
