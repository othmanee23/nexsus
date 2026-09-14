import { TEMPLATE_INSIGHTS } from './insightTemplate';

export type Insight = {
  slug: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  published: string;
  author: string;
  sections: { heading: string; body: string }[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: 'sustainable-brand-identity',
    category: 'Brand identity',
    readTime: '4 min',
    title: 'The impact of sustainability on brand identity',
    excerpt:
      'How responsible choices can shape stronger trust, clearer loyalty, and a more durable connection between brands and their communities.',
    image: '/images/insights/amaris-nexsus-hero.jpeg',
    published: 'July 1, 2025',
    author: 'NEXSUS Editorial',
    sections: [
      {
        heading: 'Beyond green messaging',
        body:
          'Sustainability is not a marketing campaign. It is an operating principle that affects product choices, communication, production, and long-term trust. Strong brands integrate responsibility into their culture instead of treating it as a visual layer.',
      },
      {
        heading: 'Building trust through action',
        body:
          'Every decision tells a story. From sourcing materials to reducing emissions and improving accessibility, visible action reinforces credibility. When responsibility is supported by data and transparent behavior, it becomes proof of commitment.',
      },
      {
        heading: 'Design with purpose',
        body:
          'A sustainable identity extends beyond logos and palettes. It influences packaging, digital experiences, messaging, and customer journeys. Thoughtful choices can reduce excess while making the brand easier to understand and remember.',
      },
      {
        heading: 'A brand built for tomorrow',
        body:
          'Markets, expectations, and customer standards continue to evolve. Brands that embed responsibility into their identity are better positioned to adapt, innovate, and remain relevant in a changing landscape.',
      },
    ],
  },
  {
    slug: 'brand-storytelling-success',
    category: 'Creative direction',
    readTime: '4 min',
    title: 'Unlocking the power of brand storytelling',
    excerpt:
      'Why coherent stories help businesses move from being recognized to being remembered.',
    image: '/images/insights/amaris-red.jpeg',
    published: 'July 8, 2025',
    author: 'NEXSUS Editorial',
    sections: [
      {
        heading: 'Clarity before expression',
        body:
          'Strong storytelling begins with a clear business position. Before visuals, tone, or campaigns are developed, the brand needs to understand what it stands for and why people should care.',
      },
      {
        heading: 'Consistency creates memory',
        body:
          'A story becomes powerful when it repeats with discipline across touchpoints. The same strategic idea should be visible in identity, content, digital experience, spaces, and customer communication.',
      },
      {
        heading: 'Emotion needs structure',
        body:
          'Memorable brands often feel effortless, but the work behind them is precise. Narrative, design systems, production choices, and distribution all need a shared direction.',
      },
    ],
  },
  {
    slug: 'digital-systems-for-growing-teams',
    category: 'Technology',
    readTime: '5 min',
    title: 'Digital systems for growing teams',
    excerpt:
      'How practical platforms, reporting, and workflow automation can make operations easier to run.',
    image: '/images/project-tech.jpg',
    published: 'July 15, 2025',
    author: 'NEXSUS Editorial',
    sections: [
      {
        heading: 'Start from the workflow',
        body:
          'Technology creates value when it is built around how people actually work. Understanding roles, decisions, handoffs, and bottlenecks helps define the system that is truly needed.',
      },
      {
        heading: 'Make information easier to use',
        body:
          'Good reporting does not simply collect data. It helps teams see priorities, track progress, and make decisions with less friction. The interface should support action, not just observation.',
      },
      {
        heading: 'Build foundations that can evolve',
        body:
          'Growing teams need systems that can adapt. A practical digital foundation should support current operations while leaving room for new users, processes, and integrations.',
      },
    ],
  },
];

export const getInsight = (slug: string): Insight | undefined => {
  const existing = INSIGHTS.find(insight => insight.slug === slug);
  const template = TEMPLATE_INSIGHTS.find(insight => insight.slug === slug);
  if (!template) return existing;
  return {
    slug: template.slug, category: 'Tooling', readTime: '4 min',
    title: template.title, excerpt: template.excerpt,
    image: template.image,
    published: existing?.published || 'September 14, 2026', author: 'NEXSUS Editorial',
    sections: existing?.sections || [{ heading: template.title, body: template.excerpt }],
  };
};
