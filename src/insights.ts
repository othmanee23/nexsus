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
];

export const getInsight = (slug: string): Insight | undefined => {
  const existing = INSIGHTS.find(insight => insight.slug === slug);
  const template = TEMPLATE_INSIGHTS.find(insight => insight.slug === slug);
  if (slug === 'sustainable-brand-identity') return {
    ...INSIGHTS[0], category: 'Tooling', author: 'AI Gorithm',
    excerpt: 'Sustainability has evolved from a corporate initiative into a defining brand characteristic. Today’s audiences expect more than promises—they look for transparency, measurable action, and a clear purpose behind every product and decision. Brands that embrace sustainability authentically build stronger trust, deeper loyalty, and a more meaningful connection with their communities.',
    sections: [
      { heading: 'Beyond Green Messaging', body: 'Sustainability isn’t a marketing campaign—it’s an operating principle. Consumers can quickly distinguish between genuine commitments and surface-level claims. The strongest brands integrate responsible practices into their products, culture, and communication, creating consistency across every touchpoint.' },
      { heading: 'Building Trust Through Action', body: 'Every decision tells a story. From sourcing materials to reducing emissions and improving accessibility, visible actions reinforce brand credibility. When sustainability is backed by data and shared transparently, it transforms from a statement into proof of long-term commitment.' },
      { heading: 'Design With Purpose', body: 'A sustainable identity extends beyond logos and color palettes. It influences packaging, digital experiences, messaging, and the overall customer journey. Thoughtful design choices—minimal waste, inclusive experiences, and accessible communication—reflect values that audiences recognize and remember.' },
      { heading: 'Creating Emotional Value', body: 'People increasingly support brands that align with their personal beliefs. Sustainability creates an emotional layer that goes beyond product features or price, giving customers a reason to participate in a larger mission and become long-term advocates rather than one-time buyers.' },
      { heading: 'A Brand Built for Tomorrow', body: 'Markets, regulations, and customer expectations continue to evolve. Brands that embed sustainability into their identity are better positioned to adapt, innovate, and remain relevant in a changing landscape. Flexibility and responsibility become competitive advantages rather than compliance requirements.' },
      { heading: 'From Purpose to Perception', body: 'A sustainable brand is more than an environmentally conscious business—it’s a promise consistently delivered through actions, experiences, and storytelling. When purpose is woven into every interaction, sustainability becomes a defining part of how people recognize, trust, and remember your brand.' },
    ],
  };
  if (!template) return existing;
  return {
    slug: template.slug, category: 'Tooling', readTime: '4 min',
    title: template.title, excerpt: template.excerpt,
    image: template.image,
    published: existing?.published || 'September 14, 2026', author: 'NEXSUS Editorial',
    sections: existing?.sections || [{ heading: template.title, body: template.excerpt }],
  };
};
