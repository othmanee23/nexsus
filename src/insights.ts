export type InsightCategorySlug = 'projects' | 'technology' | 'brand-creative' | 'ventures';
export type DivisionSlug = 'projects' | 'technology' | 'amaris' | 'ventures';

export type InsightContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string; links?: { text: string; href: string }[] }
  | { type: 'list'; style: 'ordered' | 'unordered'; items: string[] }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'embed'; title: string; url: string };

export interface Insight {
  title: string;
  slug: string;
  excerpt: string;
  content: InsightContentBlock[];
  primaryCategory: InsightCategorySlug;
  topics: string[];
  relatedDivisions: DivisionSlug[];
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  targetKeywords: string[];
  relatedInsights?: string[];
  relatedServices?: string[];
  relatedDivision?: DivisionSlug;
  relatedTopics?: string[];
}

export interface InsightCategory {
  slug: InsightCategorySlug;
  label: string;
  heading: string;
  introduction: string;
  division: DivisionSlug;
  divisionLabel: string;
  seoTitle: string;
  seoDescription: string;
}

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  {
    slug: 'projects',
    label: 'Projects',
    heading: 'Construction, Interior Architecture & Fit-Out Insights',
    introduction: 'Practical perspectives on planning, coordinating, and delivering considered spaces for private projects and public contracts.',
    division: 'projects',
    divisionLabel: 'NEXSUS Projects',
    seoTitle: 'Construction, Interior Architecture & Fit-Out Insights | NEXSUS',
    seoDescription: 'Insights from NEXSUS Projects on construction, renovation, interior architecture, fit-out, and coordinated project delivery.',
  },
  {
    slug: 'technology',
    label: 'Technology',
    heading: 'Technology & Digital Transformation Insights',
    introduction: 'Perspectives on enterprise software, digital platforms, data, automation, and the systems that support better operations.',
    division: 'technology',
    divisionLabel: 'NEXSUS Technology & Solutions',
    seoTitle: 'Technology & Digital Transformation Insights | NEXSUS',
    seoDescription: 'Insights on enterprise software, digital platforms, data, business intelligence, automation, and system integration.',
  },
  {
    slug: 'brand-creative',
    label: 'Brand & Creative',
    heading: 'Brand Strategy & Creative Insights',
    introduction: 'Thinking from AMARIS on brand strategy, identity, creative direction, campaigns, content, and audiovisual production.',
    division: 'amaris',
    divisionLabel: 'AMARIS',
    seoTitle: 'Brand Strategy & Creative Insights | AMARIS by NEXSUS',
    seoDescription: 'Insights from AMARIS on brand strategy, identity, creative direction, campaigns, branded content, and production.',
  },
  {
    slug: 'ventures',
    label: 'Ventures',
    heading: 'Business Building & Venture Insights',
    introduction: 'Perspectives on customer propositions, market strategy, partnerships, investments, and building businesses for durable growth.',
    division: 'ventures',
    divisionLabel: 'NEXSUS Ventures',
    seoTitle: 'Business Building & Venture Insights | NEXSUS',
    seoDescription: 'Insights from NEXSUS Ventures on business building, market strategy, strategic partnerships, investments, and growth.',
  },
];

export const INSIGHTS: Insight[] = [
  {
    slug: 'brand-storytelling-success',
    title: 'Unlocking the Power of Brand Storytelling: Success',
    excerpt: 'Brand storytelling goes beyond traditional marketing tactics by creating a narrative that captures the essence of your brand and communicates its values, mission, and purpose.',
    content: [
      { type: 'heading', level: 2, text: 'Clarity before expression' },
      { type: 'paragraph', text: 'Strong storytelling begins with a clear business position. Before visuals, tone, or campaigns are developed, the brand needs to understand what it stands for and why people should care.' },
      { type: 'heading', level: 2, text: 'Consistency creates memory' },
      { type: 'paragraph', text: 'A story becomes powerful when it repeats with discipline across touchpoints. The same strategic idea should be visible in identity, content, digital experience, spaces, and customer communication.' },
      { type: 'heading', level: 2, text: 'Emotion needs structure' },
      { type: 'paragraph', text: 'Memorable brands often feel effortless, but the work behind them is precise. Narrative, design systems, production choices, and distribution all need a shared direction.' },
    ],
    primaryCategory: 'brand-creative',
    topics: ['Brand storytelling', 'Creative direction', 'Brand strategy'],
    relatedDivisions: ['amaris'],
    featuredImage: '/images/insights/amaris-nexsus-hero.jpeg',
    featuredImageAlt: 'AMARIS and NEXSUS wordmarks on a monochrome textured background',
    featuredImageWidth: 4160,
    featuredImageHeight: 1505,
    author: 'NEXSUS Editorial',
    publishedAt: '2025-07-08',
    updatedAt: '2025-07-08',
    readingTime: '4 min',
    seoTitle: 'Unlocking the Power of Brand Storytelling | NEXSUS Insights',
    seoDescription: 'Why coherent brand stories help businesses move from being recognized to being remembered.',
    canonicalUrl: 'https://nexsus.ma/insights/brand-storytelling-success',
    ogTitle: 'Unlocking the Power of Brand Storytelling',
    ogDescription: 'Why coherent brand stories help businesses move from being recognized to being remembered.',
    ogImage: 'https://nexsus.ma/images/insights/amaris-nexsus-hero.jpeg',
    targetKeywords: ['brand storytelling', 'brand strategy', 'creative direction'],
    relatedInsights: ['sustainable-brand-identity'],
    relatedServices: ['Brand strategy & identity', 'Creative & art direction'],
    relatedDivision: 'amaris',
    relatedTopics: ['Brand identity', 'Branded content'],
  },
  {
    slug: 'sustainable-brand-identity',
    title: 'The Impact of Sustainability on Brand Identity: Building a Greener Future',
    excerpt: 'Sustainability has evolved from a corporate initiative into a defining brand characteristic. Audiences increasingly look for transparency, measurable action, and a clear purpose behind every decision.',
    content: [
      { type: 'heading', level: 2, text: 'Beyond Green Messaging' },
      { type: 'paragraph', text: 'Sustainability is not a marketing campaign; it is an operating principle. Consumers can distinguish genuine commitments from surface-level claims. Strong brands integrate responsible practices into their products, culture, and communication.' },
      { type: 'heading', level: 2, text: 'Building Trust Through Action' },
      { type: 'paragraph', text: 'Every decision tells a story. From sourcing materials to reducing emissions and improving accessibility, visible actions reinforce credibility. When sustainability is backed by data and shared transparently, it becomes proof of commitment.' },
      { type: 'heading', level: 2, text: 'Design With Purpose' },
      { type: 'paragraph', text: 'A sustainable identity extends beyond logos and color palettes. It influences packaging, digital experiences, messaging, and the overall customer journey.' },
      { type: 'image', src: '/images/insights/amaris-red.jpeg', alt: 'AMARIS from NEXSUS on a red abstract background', width: 1280, height: 461 },
      { type: 'heading', level: 2, text: 'Creating Emotional Value' },
      { type: 'paragraph', text: 'People increasingly support brands that align with their personal beliefs. Sustainability creates an emotional layer that gives customers a reason to participate in a larger mission.' },
      { type: 'heading', level: 2, text: 'A Brand Built for Tomorrow' },
      { type: 'paragraph', text: 'Markets, regulations, and customer expectations continue to evolve. Brands that embed responsibility into their identity are better positioned to adapt, innovate, and remain relevant.' },
      { type: 'heading', level: 2, text: 'From Purpose to Perception' },
      { type: 'paragraph', text: 'When purpose is woven into every interaction, sustainability becomes a defining part of how people recognize, trust, and remember a brand.' },
    ],
    primaryCategory: 'brand-creative',
    topics: ['Sustainability', 'Brand identity', 'Trust'],
    relatedDivisions: ['amaris'],
    featuredImage: '/images/insights/amaris-red.jpeg',
    featuredImageAlt: 'AMARIS from NEXSUS on a red abstract background',
    featuredImageWidth: 1280,
    featuredImageHeight: 461,
    author: 'NEXSUS Editorial',
    publishedAt: '2025-07-01',
    updatedAt: '2025-07-01',
    readingTime: '4 min',
    seoTitle: 'Sustainability and Brand Identity | NEXSUS Insights',
    seoDescription: 'How responsible choices can shape stronger trust, clearer loyalty, and a more durable connection between brands and communities.',
    canonicalUrl: 'https://nexsus.ma/insights/sustainable-brand-identity',
    ogTitle: 'The Impact of Sustainability on Brand Identity',
    ogDescription: 'How responsible choices can shape stronger trust and more durable brand relationships.',
    ogImage: 'https://nexsus.ma/images/insights/amaris-red.jpeg',
    targetKeywords: ['sustainable brand identity', 'brand trust', 'responsible branding'],
    relatedInsights: ['brand-storytelling-success'],
    relatedServices: ['Brand strategy & identity', 'Creative direction'],
    relatedDivision: 'amaris',
    relatedTopics: ['Sustainability', 'Brand strategy'],
  },
];

export const getInsight = (slug: string) => INSIGHTS.find((insight) => insight.slug === slug);
export const getInsightCategory = (slug: string) => INSIGHT_CATEGORIES.find((category) => category.slug === slug);
export const getInsightsByCategory = (slug: InsightCategorySlug) => INSIGHTS.filter((insight) => insight.primaryCategory === slug);
export const getInsightsByDivision = (division: DivisionSlug) => INSIGHTS.filter((insight) => insight.relatedDivisions.includes(division));

export const getRelatedInsights = (insight: Insight, limit = 3): Insight[] => {
  const manual = (insight.relatedInsights || []).map(getInsight).filter((item): item is Insight => Boolean(item));
  const automatic = INSIGHTS.filter((candidate) =>
    candidate.slug !== insight.slug
    && !manual.some((item) => item.slug === candidate.slug)
    && (candidate.primaryCategory === insight.primaryCategory || candidate.topics.some((topic) => insight.topics.includes(topic))),
  );
  return [...manual, ...automatic].slice(0, limit);
};
