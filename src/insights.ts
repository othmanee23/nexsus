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
    slug: 'how-to-choose-a-branding-agency-in-morocco',
    title: 'How to Choose a Branding Agency in Morocco',
    excerpt: 'A practical framework for evaluating branding agencies in Morocco, from strategy and market understanding to multilingual identity, process and long-term implementation.',
    content: [
      { type: 'paragraph', text: 'Choosing a branding agency is not simply a question of finding the portfolio you like most.' },
      { type: 'paragraph', text: 'A strong branding partner should be able to understand your business, challenge your assumptions, clarify your positioning and translate that strategy into a coherent identity that works across every relevant touchpoint.' },
      { type: 'paragraph', text: 'That becomes even more important in Morocco, where brands may need to communicate across different markets, cultures and languages while remaining recognisable and consistent.' },
      { type: 'paragraph', text: 'Whether you are creating a new brand, entering the Moroccan market or considering a rebrand, here is how to evaluate a branding agency before making your decision.' },
      { type: 'heading', level: 2, text: 'Start by defining the problem, not the deliverables' },
      { type: 'paragraph', text: 'One of the most common mistakes is beginning with a predefined output:' },
      { type: 'paragraph', text: '“We need a new logo.”' },
      { type: 'paragraph', text: '“We need a brand book.”' },
      { type: 'paragraph', text: '“We need to refresh our visual identity.”' },
      { type: 'paragraph', text: 'Those may eventually be the right deliverables, but they are not necessarily the actual problem.' },
      { type: 'paragraph', text: 'Perhaps your company has grown beyond its original positioning. Your different business units may no longer feel connected. Your visual identity may look inconsistent across channels. You may be entering Morocco with a global brand that does not yet translate naturally to the local market.' },
      { type: 'paragraph', text: 'A capable branding agency should investigate the business problem before prescribing the creative solution.' },
      { type: 'paragraph', text: 'During your first conversations, pay attention to the questions the agency asks.' },
      { type: 'paragraph', text: 'If the discussion immediately moves toward colours, typography and logo preferences without exploring customers, competitors, positioning, objectives and business context, the process may be starting too late.' },
      { type: 'paragraph', text: 'Strategy should normally come before execution.' },
      { type: 'heading', level: 2, text: 'Look beyond the portfolio' },
      { type: 'paragraph', text: 'A strong portfolio matters, but attractive work alone does not tell you whether an agency can solve your problem.' },
      { type: 'paragraph', text: 'Beautiful identity systems can demonstrate design quality. They do not automatically demonstrate strategic thinking.' },
      { type: 'paragraph', text: 'When reviewing previous work, try to understand the reasoning behind it.' },
      { type: 'paragraph', text: 'What was the original business challenge?' },
      { type: 'paragraph', text: 'What changed?' },
      { type: 'paragraph', text: 'Why was that particular positioning chosen?' },
      { type: 'paragraph', text: 'How did the creative system express the strategy?' },
      { type: 'paragraph', text: 'How was the identity applied across different environments?' },
      { type: 'paragraph', text: 'The strongest case studies connect a problem to a decision and a decision to an outcome.' },
      { type: 'paragraph', text: 'This is particularly important if you are comparing a strategic branding agency with a graphic design studio. Both may produce excellent-looking work, but the scope of the engagement can be fundamentally different.' },
      { type: 'heading', level: 2, text: "Evaluate the agency's strategic capabilities" },
      { type: 'paragraph', text: 'Branding should help a company answer fundamental questions.' },
      { type: 'paragraph', text: 'Who are we?' },
      { type: 'paragraph', text: 'Who are we relevant to?' },
      { type: 'paragraph', text: 'What makes us different?' },
      { type: 'paragraph', text: 'What should people understand or feel when they encounter us?' },
      { type: 'paragraph', text: 'Why should they choose us?' },
      { type: 'paragraph', text: 'A serious branding process may therefore involve research, competitive analysis, positioning, audience definition, brand architecture, messaging, naming, verbal identity or other strategic work before visual design begins.' },
      { type: 'paragraph', text: 'Not every project requires every one of these disciplines.' },
      { type: 'paragraph', text: 'What matters is whether the agency has the ability to identify which ones your project actually needs.' },
      { type: 'paragraph', text: 'The goal is not to purchase the largest branding package. It is to create the right scope for the business problem.' },
      { type: 'heading', level: 2, text: 'Make sure they understand the Moroccan market' },
      { type: 'paragraph', text: 'Local knowledge matters when the brand operates in Morocco.' },
      { type: 'paragraph', text: 'This does not mean every Moroccan brand needs to look “Moroccan.” It means decisions should account for the actual environment in which the brand will operate.' },
      { type: 'paragraph', text: 'Your audience may interact with your company in English, French, Arabic or a combination of them.' },
      { type: 'paragraph', text: 'Your competitors may be local, international or both.' },
      { type: 'paragraph', text: 'Tone, naming, cultural references and communication conventions can change depending on the audience.' },
      { type: 'paragraph', text: 'For an international company entering Morocco, this becomes particularly important. The objective should not be to redesign a global brand unnecessarily, but to determine how its existing positioning and identity should adapt to the market without losing consistency.' },
      { type: 'paragraph', text: 'A useful question to ask an agency is:' },
      { type: 'paragraph', text: 'How would you distinguish between localization and changing the brand itself?' },
      { type: 'paragraph', text: 'The answer can reveal a great deal about its strategic maturity.' },
      { type: 'heading', level: 2, text: 'Check whether the identity can work across English, French and Arabic' },
      { type: 'paragraph', text: 'Multilingual branding deserves more attention than simply translating copy.' },
      { type: 'paragraph', text: 'English and French use Latin characters and read from left to right. Arabic introduces a different script, different typographic behaviours and right-to-left layouts.' },
      { type: 'paragraph', text: 'An identity that works beautifully in English can become visually unbalanced when Arabic is added later as an afterthought.' },
      { type: 'paragraph', text: 'If your brand needs to operate across these languages, evaluate whether the agency thinks about multilingual applications from the beginning.' },
      { type: 'paragraph', text: 'This includes typography, hierarchy, spacing, logo lockups, layouts, signage, digital interfaces and brand guidelines.' },
      { type: 'paragraph', text: 'The goal is not to create three different identities.' },
      { type: 'paragraph', text: 'It is to create one system capable of behaving consistently across all three.' },
      { type: 'heading', level: 2, text: "Understand the agency's process before signing" },
      { type: 'paragraph', text: 'The quality of the process often tells you more than the pitch presentation.' },
      { type: 'paragraph', text: 'Ask the agency to explain how a typical project moves from discovery to final delivery.' },
      { type: 'paragraph', text: 'A robust process might move through stages such as discovery, research, strategy, creative exploration, identity development, testing, refinement and rollout.' },
      { type: 'paragraph', text: 'The terminology is less important than the logic.' },
      { type: 'paragraph', text: 'You want to understand where decisions happen, who participates in them and how the agency prevents subjective feedback from turning the process into endless rounds of “I like this one more.”' },
      { type: 'paragraph', text: 'Also clarify how your own team will participate.' },
      { type: 'paragraph', text: 'Branding projects usually become more difficult when there are ten internal stakeholders but nobody has clear decision authority.' },
      { type: 'paragraph', text: 'Establishing the decision process early can save weeks later.' },
      { type: 'heading', level: 2, text: 'Ask who will actually work on your project' },
      { type: 'paragraph', text: 'The people presenting the agency are not always the people delivering the work.' },
      { type: 'paragraph', text: 'Before committing, understand who will be responsible for strategy, creative direction, design, production and project management.' },
      { type: 'paragraph', text: 'This is particularly important when comparing agencies of very different sizes.' },
      { type: 'paragraph', text: 'A large agency may provide greater specialist depth.' },
      { type: 'paragraph', text: 'A smaller team may provide more direct senior involvement.' },
      { type: 'paragraph', text: 'Neither model is automatically better.' },
      { type: 'paragraph', text: 'What matters is knowing what you are buying.' },
      { type: 'paragraph', text: 'Ask whether the senior people involved in the pitch will remain involved after the project begins.' },
      { type: 'heading', level: 2, text: 'Compare thinking, not just price' },
      { type: 'paragraph', text: 'Branding proposals can be difficult to compare because two agencies may describe very different scopes using similar terminology.' },
      { type: 'paragraph', text: 'One proposal might include a logo and a basic visual guide.' },
      { type: 'paragraph', text: 'Another might include research, strategy, positioning, messaging, a complete identity system and rollout support.' },
      { type: 'paragraph', text: 'Calling both offers “branding” does not make them equivalent.' },
      { type: 'paragraph', text: 'Before comparing prices, normalize the scope.' },
      { type: 'paragraph', text: 'Compare what each agency is actually proposing, how deeply it intends to investigate the business, who will work on the project, what will be delivered and what happens after approval.' },
      { type: 'paragraph', text: 'The cheapest proposal can become expensive if the company needs to redo the work two years later.' },
      { type: 'paragraph', text: 'Likewise, the most expensive proposal is not automatically the strongest.' },
      { type: 'paragraph', text: 'Price should make sense relative to the problem, the expertise required and the scope of work.' },
      { type: 'heading', level: 2, text: 'Examine how the agency handles disagreement' },
      { type: 'paragraph', text: 'A branding agency should not simply agree with every request.' },
      { type: 'paragraph', text: 'You are paying partly for judgment.' },
      { type: 'paragraph', text: "There will be moments when your internal preferences and the agency's recommendation are different." },
      { type: 'paragraph', text: 'A strong partner should be able to explain why it recommends a particular direction, connect the decision to the strategy and challenge feedback constructively.' },
      { type: 'paragraph', text: 'At the same time, strategy should not become an excuse for creative arrogance.' },
      { type: 'paragraph', text: 'Good collaboration requires both conviction and listening.' },
      { type: 'paragraph', text: 'During the selection process, notice whether the agency explains its opinions or simply presents them as unquestionable creative truths.' },
      { type: 'heading', level: 2, text: 'Clarify ownership and final deliverables' },
      { type: 'paragraph', text: 'This is a practical detail that companies sometimes discover too late.' },
      { type: 'paragraph', text: 'Before signing, make sure the agreement clearly defines what you will receive when the project ends.' },
      { type: 'paragraph', text: 'Depending on the scope, this may include master logo files, typography specifications, colour systems, templates, brand guidelines, production files, photography or video assets and other creative materials.' },
      { type: 'paragraph', text: 'Also clarify usage and intellectual-property rights.' },
      { type: 'paragraph', text: 'Your team should understand which assets belong to the company, which licences may have restrictions and whether third-party materials are involved.' },
      { type: 'paragraph', text: 'The exact requirements depend on the project, but they should not remain ambiguous.' },
      { type: 'heading', level: 2, text: 'Think about what happens after launch' },
      { type: 'paragraph', text: 'A brand is not finished when the presentation is approved.' },
      { type: 'paragraph', text: 'It has to survive reality.' },
      { type: 'paragraph', text: 'Sales presentations will be created. Campaigns will launch. New employees will join. Social content will be produced. Websites will evolve. New products may appear.' },
      { type: 'paragraph', text: 'Ask how the proposed identity will remain coherent as your company grows.' },
      { type: 'paragraph', text: 'For some organizations, a detailed brand system is enough.' },
      { type: 'paragraph', text: 'Others may need templates, training, rollout support or an ongoing creative partnership.' },
      { type: 'paragraph', text: 'A good agency should design for use, not only for presentation.' },
      { type: 'heading', level: 2, text: 'Questions worth asking before choosing an agency' },
      { type: 'paragraph', text: 'A useful agency conversation should eventually answer questions such as what business problem the agency believes you are trying to solve, how it approaches research and positioning, who will work on the project, how multilingual requirements are handled, how decisions and revisions work, which deliverables are included, what you will own at the end, and how the identity will be implemented after launch.' },
      { type: 'paragraph', text: 'The quality of the answers matters more than rehearsed promises.' },
      { type: 'paragraph', text: 'You are looking for evidence that the team understands both the strategic and creative sides of the assignment.' },
      { type: 'heading', level: 2, text: 'Agency, freelancer or internal team?' },
      { type: 'paragraph', text: 'Not every branding need requires an agency.' },
      { type: 'paragraph', text: 'A freelancer can be an excellent solution for a clearly defined creative assignment when the strategy already exists.' },
      { type: 'paragraph', text: 'An internal design team can work particularly well when the company produces a high volume of ongoing brand material and already has strong strategic direction.' },
      { type: 'paragraph', text: 'A branding agency becomes especially valuable when the challenge crosses multiple disciplines: research, strategy, positioning, identity, creative direction and implementation.' },
      { type: 'paragraph', text: 'The correct model depends on the problem you need to solve.' },
      { type: 'heading', level: 2, text: 'Choosing the right branding partner in Morocco' },
      { type: 'paragraph', text: 'The right agency should leave you with more than an attractive identity.' },
      { type: 'paragraph', text: 'It should help your organization become clearer about who it is, where it competes, how it should communicate and how its brand can remain coherent as the business evolves.' },
      { type: 'paragraph', text: 'When comparing agencies in Morocco, look beyond presentation quality and ask a more useful question:' },
      { type: 'paragraph', text: 'Does this team understand our business well enough to make better brand decisions with us?' },
      { type: 'paragraph', text: 'If the answer is yes—and the agency has the strategic thinking, creative ability and execution capacity to support those decisions—you are probably evaluating the right kind of partner.' },
      { type: 'heading', level: 2, text: 'Building or repositioning a brand in Morocco?' },
      { type: 'paragraph', text: 'AMARIS works with organizations on brand strategy, identity, creative direction and brand expression, helping turn business ambition into coherent brand systems designed to work across markets and touchpoints.', links: [{ text: 'AMARIS', href: '/amaris' }] },
      { type: 'paragraph', text: '', links: [{ text: 'Discuss your brand project with AMARIS', href: '/contact' }] },
    ],
    primaryCategory: 'brand-creative',
    topics: ['branding', 'brand-strategy', 'brand-identity', 'rebranding', 'morocco', 'multilingual-branding'],
    relatedDivisions: ['amaris'],
    featuredImage: '/images/insights/amaris-nexsus-hero.jpeg',
    featuredImageAlt: 'AMARIS and NEXSUS wordmarks on a monochrome textured background',
    featuredImageWidth: 4160,
    featuredImageHeight: 1505,
    author: 'NEXSUS Editorial',
    publishedAt: '2026-09-26',
    updatedAt: '2026-09-26',
    readingTime: '10 min',
    seoTitle: 'How to Choose a Branding Agency in Morocco | AMARIS',
    seoDescription: 'Learn how to evaluate branding agencies in Morocco, compare strategy, expertise, process and deliverables, and choose the right creative partner.',
    canonicalUrl: 'https://nexsus.ma/insights/how-to-choose-a-branding-agency-in-morocco',
    ogTitle: 'How to Choose a Branding Agency in Morocco | AMARIS',
    ogDescription: 'Learn how to evaluate branding agencies in Morocco, compare strategy, expertise, process and deliverables, and choose the right creative partner.',
    ogImage: 'https://nexsus.ma/images/insights/amaris-nexsus-hero.jpeg',
    targetKeywords: [
      'how to choose a branding agency in Morocco',
      'branding agency Morocco',
      'brand agency Morocco',
      'branding agency Casablanca',
      'brand strategy agency Morocco',
    ],
    relatedServices: ['Brand strategy & identity', 'Creative & art direction'],
    relatedDivision: 'amaris',
    relatedTopics: ['branding', 'brand strategy', 'brand identity', 'rebranding', 'multilingual branding'],
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
