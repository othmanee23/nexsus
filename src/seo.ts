import { ADDRESS_TEXT, CONTACT_EMAIL, CONTACT_PHONE, LEGAL_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from './config';
import { INSIGHTS, INSIGHT_CATEGORIES, getInsight, getInsightCategory, getInsightsByCategory } from './insights';
import type { Language } from './i18n';

export interface SeoMetadata {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt?: string;
  type: 'website' | 'article';
  robots: string;
  language: string;
  alternates: { hreflang: string; href: string }[];
  structuredData: Record<string, unknown>[];
}

const DEFAULT_IMAGE = SITE_URL + '/images/nexsus-logo-og.jpeg';
const INDEXABLE_ROBOTS = 'index, follow, max-image-preview:large';
const LANGUAGE_META: Record<Language, { html: string; hreflang: string }> = {
  en: { html: 'en-MA', hreflang: 'en-MA' },
  fr: { html: 'fr-MA', hreflang: 'fr-MA' },
  ar: { html: 'ar-MA', hreflang: 'ar-MA' },
};

const DIVISION_SEO = {
  projects: {
    title: 'NEXSUS Projects | Construction, Interior Architecture & Fit-Out',
    description: 'Construction, renovation, interior architecture, fit-out, project coordination, and delivery from NEXSUS Projects.',
    name: 'NEXSUS Projects',
  },
  technology: {
    title: 'Technology & Solutions | NEXSUS',
    description: 'Enterprise software, B2B consulting, digital platforms, data, automation, and system integration from NEXSUS.',
    name: 'NEXSUS Technology & Solutions',
  },
  amaris: {
    title: 'AMARIS | Brand Strategy & Creative Direction',
    description: 'Brand strategy, identity, creative direction, campaigns, branded content, and audiovisual production from AMARIS.',
    name: 'AMARIS',
  },
  ventures: {
    title: 'NEXSUS Ventures | Business Building & Strategic Investments',
    description: 'Consumer business development, proprietary brands, market strategy, partnerships, and strategic investments from NEXSUS Ventures.',
    name: 'NEXSUS Ventures',
  },
} as const;

const DIVISION_LOCALIZED_SEO: Record<Language, Partial<Record<keyof typeof DIVISION_SEO, { title: string; description: string }>>> = {
  en: {},
  fr: {
    projects: {
      title: 'NEXSUS Projects | Construction, architecture intérieure et aménagement',
      description: 'Construction, rénovation, architecture intérieure, aménagement, coordination et livraison de projets par NEXSUS Projects.',
    },
    technology: {
      title: 'Technologie & Solutions | NEXSUS Maroc',
      description: 'Logiciels d’entreprise, conseil B2B, plateformes digitales, data, automatisation et intégration de systèmes par NEXSUS.',
    },
    amaris: {
      title: 'AMARIS | Stratégie de marque et direction créative',
      description: 'Stratégie de marque, identité, direction créative, campagnes, contenus et production audiovisuelle par AMARIS.',
    },
    ventures: {
      title: 'NEXSUS Ventures | Développement d’entreprises et investissements',
      description: 'Développement d’activités, marques propriétaires, stratégie commerciale, partenariats et investissements par NEXSUS Ventures.',
    },
  },
  ar: {
    projects: {
      title: 'NEXSUS Projects | البناء والتصميم الداخلي والتهيئة',
      description: 'البناء والتجديد والهندسة الداخلية والتهيئة وتنسيق وتسليم المشاريع من NEXSUS Projects.',
    },
    technology: {
      title: 'التكنولوجيا والحلول | NEXSUS المغرب',
      description: 'برمجيات المؤسسات والاستشارات والمنصات الرقمية والبيانات والأتمتة وتكامل الأنظمة من NEXSUS.',
    },
    amaris: {
      title: 'AMARIS | استراتيجية العلامة والتوجيه الإبداعي',
      description: 'استراتيجية العلامة والهوية والتوجيه الإبداعي والحملات والمحتوى والإنتاج السمعي البصري من AMARIS.',
    },
    ventures: {
      title: 'NEXSUS Ventures | تطوير الأعمال والاستثمارات الاستراتيجية',
      description: 'تطوير الأعمال والعلامات المملوكة والاستراتيجية التجارية والشراكات والاستثمارات من NEXSUS Ventures.',
    },
  },
};

const CORE_PAGE_COPY: Record<Language, Record<'home' | 'about' | 'contact', { title: string; description: string }>> = {
  en: {
    home: { title: SITE_TITLE, description: SITE_DESCRIPTION },
    about: { title: 'About NEXSUS | One Company, Four Complementary Divisions', description: 'Learn how NEXSUS PROJECT SARL brings together projects, technology, creative direction, and ventures from Temara, Morocco.' },
    contact: { title: 'Contact NEXSUS | Discuss a Project or Opportunity', description: 'Contact NEXSUS to discuss a construction, technology, creative, or venture project and partnership opportunity.' },
  },
  fr: {
    home: { title: 'NEXSUS PROJECT SARL | Entreprise multidisciplinaire au Maroc', description: 'NEXSUS réunit projets, solutions technologiques, direction créative et développement business depuis Témara, Maroc.' },
    about: { title: 'À propos de NEXSUS | Quatre divisions complémentaires', description: 'Découvrez comment NEXSUS PROJECT SARL réunit projets, technologie, création et ventures depuis Témara, Maroc.' },
    contact: { title: 'Contact NEXSUS | Discuter d’un projet ou partenariat', description: 'Contactez NEXSUS pour discuter d’un projet de construction, technologie, création ou développement business.' },
  },
  ar: {
    home: { title: 'NEXSUS PROJECT SARL | شركة متعددة التخصصات في المغرب', description: 'تجمع NEXSUS بين المشاريع والحلول التقنية والتوجيه الإبداعي وتطوير الأعمال انطلاقاً من تمارة، المغرب.' },
    about: { title: 'عن NEXSUS | أربعة أقسام متكاملة', description: 'تعرف على كيفية جمع NEXSUS PROJECT SARL بين المشاريع والتقنية والإبداع وتطوير الأعمال.' },
    contact: { title: 'تواصل مع NEXSUS | ناقش مشروعاً أو شراكة', description: 'تواصل مع NEXSUS لمناقشة مشروع أو فرصة شراكة في البناء أو التقنية أو الإبداع أو تطوير الأعمال.' },
  },
};

const localizedPath = (route: string, language: Language) => {
  if (language === 'en') return route === '/' ? '/' : route;
  return route === '/' ? '/' + language : '/' + language + route;
};

const absoluteUrl = (path: string) => SITE_URL + (path === '/' ? '/' : path);

const standardAlternates = (route: string) => [
  ...(['en', 'fr', 'ar'] as Language[]).map((language) => ({
    hreflang: LANGUAGE_META[language].hreflang,
    href: absoluteUrl(localizedPath(route, language)),
  })),
  { hreflang: 'x-default', href: absoluteUrl(route) },
];

const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const schemaDate = (date: string) => date.includes('T') ? date : date + 'T00:00:00+00:00';

export const GLOBAL_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: LEGAL_NAME,
      alternateName: SITE_NAME,
      url: SITE_URL + '/',
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      logo: SITE_URL + '/images/nexsus-logo-og.jpeg',
      image: SITE_URL + '/images/nexsus-logo-og.jpeg',
      foundingDate: '2025',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'LOT ALWAHDA FATH AL KHIR N 60',
        addressLocality: 'Temara',
        addressCountry: 'MA',
      },
      sameAs: [
        'https://www.instagram.com/the_nexsus_/',
        'https://www.instagram.com/amaris_from_nexsus/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      url: SITE_URL + '/',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': SITE_URL + '/#organization' },
      inLanguage: ['en-MA', 'fr-MA', 'ar-MA'],
    },
  ],
};

export const getSeoMetadata = (route: string, language: Language = 'en'): SeoMetadata => {
  const cleanRoute = route === '/' ? '/' : route.replace(/\/+$/, '');
  const languageInfo = LANGUAGE_META[language];
  const coreKey = cleanRoute === '/' ? 'home' : cleanRoute === '/about' ? 'about' : cleanRoute === '/contact' ? 'contact' : null;

  if (coreKey) {
    const page = CORE_PAGE_COPY[language][coreKey];
    const path = localizedPath(cleanRoute, language);
    const structuredData = cleanRoute === '/' ? [] : [breadcrumbSchema([
      { name: 'Home', path: localizedPath('/', language) },
      { name: coreKey === 'about' ? 'About' : 'Contact', path },
    ])];
    return {
      ...page,
      canonical: absoluteUrl(path),
      image: DEFAULT_IMAGE,
      type: 'website',
      robots: INDEXABLE_ROBOTS,
      language: languageInfo.html,
      alternates: standardAlternates(cleanRoute),
      structuredData,
    };
  }

  const divisionSlug = cleanRoute.slice(1) as keyof typeof DIVISION_SEO;
  if (divisionSlug in DIVISION_SEO) {
    const basePage = DIVISION_SEO[divisionSlug];
    const page = { ...basePage, ...DIVISION_LOCALIZED_SEO[language][divisionSlug] };
    const path = localizedPath(cleanRoute, language);
    return {
      title: page.title,
      description: page.description,
      canonical: absoluteUrl(path),
      image: SITE_URL + '/images/service-' + divisionSlug + '.png',
      type: 'website',
      robots: INDEXABLE_ROBOTS,
      language: languageInfo.html,
      alternates: standardAlternates(cleanRoute),
      structuredData: [breadcrumbSchema([
        { name: 'Home', path: localizedPath('/', language) },
        { name: page.name, path },
      ])],
    };
  }

  if (cleanRoute === '/insights') {
    return {
      title: 'Insights | NEXSUS',
      description: 'Perspectives from NEXSUS across projects, technology, brand and creative direction, and venture development.',
      canonical: SITE_URL + '/insights',
      image: DEFAULT_IMAGE,
      type: 'website',
      robots: INDEXABLE_ROBOTS,
      language: 'en-MA',
      alternates: [],
      structuredData: [breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Insights', path: '/insights' },
      ])],
    };
  }

  const categoryMatch = cleanRoute.match(/^\/insights\/(projects|technology|brand-creative|ventures)$/);
  if (categoryMatch) {
    const category = getInsightCategory(categoryMatch[1])!;
    const hasPublishedArticles = getInsightsByCategory(category.slug).length > 0;
    return {
      title: category.seoTitle,
      description: category.seoDescription,
      canonical: SITE_URL + '/insights/' + category.slug,
      image: DEFAULT_IMAGE,
      type: 'website',
      robots: hasPublishedArticles ? INDEXABLE_ROBOTS : 'noindex, follow',
      language: 'en-MA',
      alternates: [],
      structuredData: [breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Insights', path: '/insights' },
        { name: category.label, path: '/insights/' + category.slug },
      ])],
    };
  }

  const articleMatch = cleanRoute.match(/^\/insights\/([^/]+)$/);
  const insight = articleMatch ? getInsight(articleMatch[1]) : undefined;
  if (insight) {
    const category = getInsightCategory(insight.primaryCategory)!;
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: insight.title,
      description: insight.seoDescription,
      image: [insight.ogImage],
      datePublished: schemaDate(insight.publishedAt),
      dateModified: schemaDate(insight.updatedAt),
      author: { '@type': 'Organization', name: insight.author, url: SITE_URL + '/insights' },
      publisher: { '@id': SITE_URL + '/#organization' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': insight.canonicalUrl },
      articleSection: category.label,
      keywords: insight.topics,
    };
    return {
      title: insight.seoTitle,
      description: insight.seoDescription,
      canonical: insight.canonicalUrl,
      image: insight.ogImage,
      imageAlt: insight.featuredImageAlt,
      type: 'article',
      robots: INDEXABLE_ROBOTS,
      language: 'en-MA',
      alternates: [],
      structuredData: [
        articleSchema,
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: category.label, path: '/insights/' + category.slug },
          { name: insight.title, path: '/insights/' + insight.slug },
        ]),
      ],
    };
  }

  return {
    title: 'Page not found | NEXSUS',
    description: 'The requested page could not be found.',
    canonical: absoluteUrl(localizedPath(cleanRoute, language)),
    image: DEFAULT_IMAGE,
    type: 'website',
    robots: 'noindex, follow',
    language: languageInfo.html,
    alternates: [],
    structuredData: [],
  };
};

const setMeta = (selector: string, attribute: string, value: string) => {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
};

export const applySeoMetadata = (metadata: SeoMetadata) => {
  document.title = metadata.title;
  document.documentElement.lang = metadata.language;
  setMeta('meta[name="description"]', 'content', metadata.description);
  setMeta('meta[name="robots"]', 'content', metadata.robots);
  setMeta('meta[property="og:title"]', 'content', metadata.title);
  setMeta('meta[property="og:description"]', 'content', metadata.description);
  setMeta('meta[property="og:type"]', 'content', metadata.type);
  setMeta('meta[property="og:url"]', 'content', metadata.canonical);
  setMeta('meta[property="og:image"]', 'content', metadata.image);
  setMeta('meta[property="og:image:alt"]', 'content', metadata.imageAlt || 'NEXSUS wordmark');
  setMeta('meta[property="og:locale"]', 'content', metadata.language.replace('-', '_'));
  setMeta('meta[name="twitter:title"]', 'content', metadata.title);
  setMeta('meta[name="twitter:description"]', 'content', metadata.description);
  setMeta('meta[name="twitter:image"]', 'content', metadata.image);

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = metadata.canonical;

  document.querySelectorAll('link[data-seo-alternate]').forEach((element) => element.remove());
  metadata.alternates.forEach((alternate) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = alternate.hreflang;
    link.href = alternate.href;
    link.dataset.seoAlternate = 'true';
    document.head.appendChild(link);
  });

  const schema = document.querySelector<HTMLScriptElement>('#route-structured-data');
  if (schema) schema.textContent = JSON.stringify(metadata.structuredData);
};

export const INDEXABLE_ROUTES = [
  '/',
  '/about',
  '/contact',
  ...Object.keys(DIVISION_SEO).map((slug) => '/' + slug),
  '/insights',
  ...INSIGHT_CATEGORIES.map((category) => '/insights/' + category.slug),
  ...INSIGHTS.map((insight) => '/insights/' + insight.slug),
];

export const MULTILINGUAL_ROUTES = ['/', '/about', ...Object.keys(DIVISION_SEO).map((slug) => '/' + slug), '/contact'];

export const formatPublishedDate = (date: string) => new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date(date + 'T00:00:00Z'));

export const ORGANIZATION_SUMMARY = LEGAL_NAME + ', ' + ADDRESS_TEXT;
