import type { DivisionSlug } from './insights';

export type DivisionLink = { text: string; href: string };
export type DivisionParagraph = { text: string; links?: DivisionLink[] };
export type DivisionCapability = { title: string; description: string };
export type DivisionFaqItem = { question: string; answer: DivisionParagraph[] };

export interface DivisionLandingContent {
  heroTitle: string;
  heroStatement: string;
  primaryCta: string;
  secondaryCta: string;
  offerTitle: string;
  offerIntro: string;
  capabilities: DivisionCapability[];
  supportingSections: {
    title: string;
    paragraphs: DivisionParagraph[];
    items?: string[];
  }[];
  approachTitle: string;
  approachIntro: string;
  approach: string[];
  relatedTitle: string;
  faqTitle: string;
  faqIntro: string;
  faq: DivisionFaqItem[];
}

export const DIVISION_LANDING_CONTENT: Record<DivisionSlug, DivisionLandingContent> = {
  projects: {
    heroTitle: 'NEXSUS PROJECTS',
    heroStatement: 'Coordinated construction, renovation, interior architecture and fit-out projects in Morocco, from a clear brief through execution and handover.',
    primaryCta: 'Discuss your project',
    secondaryCta: 'Explore Projects Insights',
    offerTitle: 'What NEXSUS Projects delivers',
    offerIntro: 'We connect design intent with practical delivery, coordinating the people, materials, programme and quality requirements needed to create functional, well-considered spaces.',
    capabilities: [
      { title: 'Construction & Renovation', description: 'Commercial renovations, upgrades, refurbishment and construction works delivered through coordinated site execution.' },
      { title: 'Interior Architecture & Space Design', description: 'Spatial and workplace planning, functional design, material and finish direction, and the development of client-facing environments.' },
      { title: 'Fit-Out & Finishes', description: 'Office and commercial fit-outs covering partitions, ceilings, flooring, lighting, joinery, finishes and furniture coordination where required.' },
      { title: 'Project Coordination & Delivery', description: 'Scope coordination, supplier management, site execution, timeline and quality control, followed by testing and handover.' },
    ],
    supportingSections: [
      {
        title: 'Who we work with',
        paragraphs: [{ text: 'NEXSUS Projects supports companies, institutions, commercial operators, public-sector projects and private project owners with requirements that call for coordinated design and execution.' }],
      },
    ],
    approachTitle: 'Our approach',
    approachIntro: 'Every assignment is organised around its intended use, site conditions, budget and delivery constraints.',
    approach: [
      'Understand the operational requirement',
      'Assess the site and scope',
      'Coordinate design and technical requirements',
      'Plan budget and procurement',
      'Execute and supervise',
      'Test and hand over',
    ],
    relatedTitle: 'Related Projects Insights',
    faqTitle: 'Projects FAQ',
    faqIntro: 'Practical answers about planning and delivering construction, renovation and fit-out work.',
    faq: [
      { question: 'What is the difference between fit-out and renovation?', answer: [{ text: 'A fit-out prepares or completes an interior for its intended use, while renovation improves or changes an existing space and may involve repairing or replacing existing elements. Some projects combine both. Our guide to fit-out versus renovation explains how the scope affects planning and delivery.', links: [{ text: 'guide to fit-out versus renovation', href: '/insights/fit-out-vs-renovation-morocco' }] }] },
      { question: 'How much does an office fit-out cost in Morocco?', answer: [{ text: 'Cost depends on the existing condition, area, technical requirements, finishes, furniture, procurement choices and schedule. The office fit-out planning guide explains the main budget drivers without presenting unsupported fixed prices.', links: [{ text: 'office fit-out planning guide', href: '/insights/office-fit-out-morocco-costs-timeline-key-decisions' }] }] },
      { question: 'Does NEXSUS Projects handle both design and execution?', answer: [{ text: 'NEXSUS Projects brings together interior architecture, space design, construction, fit-out and project coordination. The exact responsibilities and any specialist or regulated inputs are defined clearly for each assignment.' }] },
      { question: 'Can a project be delivered while the site remains operational?', answer: [{ text: 'Phased delivery may be possible depending on the scope, access, safety requirements and site conditions. This must be assessed before the programme and working zones are confirmed.' }] },
      { question: 'Does NEXSUS Projects work on both private and public projects?', answer: [{ text: 'Yes. The division is positioned to support private projects and public contracts, subject to the project requirements, procurement route and agreed scope.' }] },
      { question: 'How long does a commercial fit-out take?', answer: [{ text: 'The programme depends on area, design readiness, approvals, technical complexity, procurement lead times and whether work must be phased. A realistic schedule is developed after the site and scope are understood.' }] },
      { question: 'What should a client prepare before requesting a fit-out proposal?', answer: [{ text: 'Share the site location, approximate area, intended use, target capacity, key requirements, available plans, desired completion date and an indicative budget range if known.' }] },
    ],
  },
  technology: {
    heroTitle: 'NEXSUS TECHNOLOGY & SOLUTIONS',
    heroStatement: 'Enterprise software, digital platforms, automation, data and system integration designed around how organisations actually operate.',
    primaryCta: 'Discuss your technology needs',
    secondaryCta: 'Explore Technology Insights',
    offerTitle: 'What NEXSUS Technology delivers',
    offerIntro: 'We translate operational requirements into useful digital systems, choosing whether to integrate, configure or build according to the business context.',
    capabilities: [
      { title: 'Enterprise Software & B2B Consulting', description: 'Internal platforms, business systems, requirements definition and digital operating models shaped around users and workflows.' },
      { title: 'Digital Platforms & Products', description: 'Web platforms, portals, operational tools and customer-facing products built for clear, reliable use.' },
      { title: 'Data & Business Intelligence', description: 'Dashboards, reporting and decision-support systems that improve operational visibility and make information easier to use.' },
      { title: 'Automation & System Integration', description: 'Workflow automation and API-led connections between CRM, ERP, accounting and internal systems to reduce repetitive manual work.' },
    ],
    supportingSections: [
      {
        title: 'When custom software makes sense',
        paragraphs: [{ text: 'Custom software can be appropriate when workflows are distinctive, systems are fragmented, manual work is repeated, reporting is specialised, or an organisation needs a customer portal or operational capability that creates meaningful differentiation. The custom software versus SaaS guide can help frame that decision.', links: [{ text: 'custom software versus SaaS guide', href: '/insights/custom-software-vs-saas-morocco' }] }],
      },
      {
        title: 'Automation before software',
        paragraphs: [{ text: 'Technology should follow a clear understanding of the process. Mapping the work first helps identify what should be simplified, automated, integrated or left unchanged. Read where companies should start with business process automation.', links: [{ text: 'where companies should start with business process automation', href: '/insights/business-process-automation-morocco' }] }],
      },
    ],
    approachTitle: 'Our approach',
    approachIntro: 'The work begins with the business process, not a predetermined technology.',
    approach: ['Understand the business process', 'Map requirements and existing systems', 'Decide whether to buy, integrate or build', 'Design the solution', 'Build or integrate', 'Test', 'Deploy', 'Support adoption'],
    relatedTitle: 'Related Technology Insights',
    faqTitle: 'Technology FAQ',
    faqIntro: 'Clear answers about software, automation and systems integration.',
    faq: [
      { question: 'When should a company build custom software instead of buying SaaS?', answer: [{ text: 'Custom software is worth considering when standard products cannot support an important workflow, integration or operating model without excessive compromise. The custom software versus SaaS guide sets out the main trade-offs.', links: [{ text: 'custom software versus SaaS guide', href: '/insights/custom-software-vs-saas-morocco' }] }] },
      { question: 'Can NEXSUS integrate existing software instead of replacing it?', answer: [{ text: 'Yes, where systems provide suitable APIs or other supported integration methods. Integration can preserve useful tools while improving data flow and reducing duplicate work.' }] },
      { question: 'What business processes can be automated?', answer: [{ text: 'Common candidates include approvals, reporting, lead routing, document generation, onboarding and repeatable internal workflows. The first step is to confirm that the process itself is clear and stable enough to automate.' }] },
      { question: 'Does NEXSUS build ERP systems?', answer: [{ text: 'NEXSUS can develop or integrate enterprise software according to the requirements. We do not present a fixed off-the-shelf ERP product; the appropriate route may be configuration, integration or custom development.' }] },
      { question: 'Can you connect CRM, accounting and internal systems?', answer: [{ text: 'Potentially, yes. Feasibility depends on the systems, their APIs, permissions, data quality and security requirements. These are reviewed during discovery.' }] },
      { question: 'How does a software project start?', answer: [{ text: 'It starts with discovery: understanding the users, process, systems, constraints and desired outcome. That work defines the requirements and the most appropriate delivery route.' }] },
      { question: 'Does NEXSUS provide AI solutions?', answer: [{ text: 'AI may be evaluated when it is appropriate to the problem, data and risk context, but not every problem requires AI. Our AI Transparency page explains the principles that guide its responsible use.', links: [{ text: 'AI Transparency page', href: '/ai-transparency' }] }] },
    ],
  },
  amaris: {
    heroTitle: 'AMARIS',
    heroStatement: 'Brand strategy, identity, creative direction and production for organisations that need a clear, distinctive and coherent expression in Morocco.',
    primaryCta: 'Discuss your brand project',
    secondaryCta: 'Explore Brand & Creative Insights',
    offerTitle: 'What AMARIS does',
    offerIntro: 'AMARIS translates business positioning into strategic and creative systems that can work consistently across physical and digital touchpoints.',
    capabilities: [
      { title: 'Brand Strategy & Positioning', description: 'Positioning, proposition, audience definition, competitive context and brand architecture where the organisation requires it.' },
      { title: 'Brand Identity', description: 'Visual identity, typography, colour systems, guidelines and applications, including multilingual identity considerations.' },
      { title: 'Creative & Art Direction', description: 'Coherent creative systems, campaign concepts, visual language and brand expression across relevant channels.' },
      { title: 'Campaigns & Branded Content', description: 'Campaign concepts, branded content, launch materials and communication assets grounded in the brand strategy.' },
      { title: 'Audiovisual Production', description: 'Corporate video, brand films, campaign production and creative support from concept through production.' },
    ],
    supportingSections: [
      {
        title: 'Branding for Morocco',
        paragraphs: [{ text: 'Brands in Morocco may need to communicate across English, French and Arabic while serving local and international audiences. The right balance depends on the organisation, audience and context; multilingual expression should preserve clarity and identity rather than rely on superficial translation.' }],
      },
      {
        title: 'Who AMARIS is for',
        paragraphs: [{ text: 'AMARIS works with established companies, growing businesses, new brands, organisations repositioning or rebranding, and international companies that need a thoughtful market expression in Morocco.' }],
      },
    ],
    approachTitle: 'Our branding approach',
    approachIntro: 'Strategy establishes the foundation before identity and production begin.',
    approach: ['Understand the business', 'Research the market and audience', 'Clarify positioning', 'Build the strategy', 'Develop identity and creative direction', 'Apply the system across touchpoints', 'Support rollout'],
    relatedTitle: 'Related Brand & Creative Insights',
    faqTitle: 'AMARIS FAQ',
    faqIntro: 'Answers about strategy, identity, creative direction and production.',
    faq: [
      { question: 'What does a branding agency actually do?', answer: [{ text: 'A branding agency helps clarify what an organisation stands for, how it should be positioned and how that strategy should be expressed through identity, language and creative direction.' }] },
      { question: 'How much does branding cost in Morocco?', answer: [{ text: 'The scope can range from focused strategic or identity work to a complete system and rollout. Our branding cost guide discusses common cost drivers and market references; those references are not AMARIS pricing.', links: [{ text: 'branding cost guide', href: '/insights/branding-cost-morocco' }] }] },
      { question: 'How do I choose a branding agency in Morocco?', answer: [{ text: 'Look for strategic thinking, relevant work, a clear process, realistic scope and a team that understands both the business and its audiences. Our guide to choosing a branding agency provides a practical evaluation framework.', links: [{ text: 'guide to choosing a branding agency', href: '/insights/how-to-choose-a-branding-agency-in-morocco' }] }] },
      { question: 'What is the difference between brand strategy and brand identity?', answer: [{ text: 'Brand strategy defines what the brand stands for, who it serves and how it is positioned. Brand identity expresses that strategy through visual and verbal systems.' }] },
      { question: 'Does AMARIS only design logos?', answer: [{ text: 'No. A logo is one part of an identity. AMARIS focuses on the broader system: strategy, positioning, identity, creative direction, campaigns, content and production.' }] },
      { question: 'Can AMARIS work with international brands entering Morocco?', answer: [{ text: 'Yes. AMARIS can help assess how an existing brand should be expressed for audiences in Morocco while preserving the elements that make the global brand recognisable.' }] },
      { question: 'Can AMARIS build identities for English, French and Arabic?', answer: [{ text: 'Yes, where the brief requires multilingual expression. Typography, hierarchy, naming and applications must be considered as one identity system rather than handled as separate afterthoughts.' }] },
      { question: 'Does AMARIS provide social media management or paid media?', answer: [{ text: 'AMARIS is positioned around brand strategy, identity, creative direction, campaigns, branded content and production—not ongoing media-buying or generic performance-marketing management.' }] },
    ],
  },
  ventures: {
    heroTitle: 'NEXSUS VENTURES',
    heroStatement: 'Venture building, market validation and business development for new propositions, proprietary brands and selected opportunities in Morocco.',
    primaryCta: 'Discuss an opportunity',
    secondaryCta: 'Explore Ventures Insights',
    offerTitle: 'What NEXSUS Ventures does',
    offerIntro: 'We assess opportunities, test customer propositions and develop practical commercial and operating models before resources are committed to scale.',
    capabilities: [
      { title: 'Opportunity Assessment', description: 'Assessment of market opportunities, customer problems, business potential and the competitive context.' },
      { title: 'Market Validation', description: 'Customer research, tests, pilots and evidence of willingness to pay before full-scale commitment.' },
      { title: 'Go-to-Market Strategy', description: 'Positioning, pricing, channels and launch strategy shaped around the proposition and target customer.' },
      { title: 'Business Model & Operations', description: 'Unit economics, processes, partnerships and a practical operating model for launch and growth.' },
      { title: 'Proprietary Brands & Selected Opportunities', description: 'Development of proprietary consumer businesses and consideration of selected strategic partnerships or investments aligned with NEXSUS capabilities.' },
    ],
    supportingSections: [],
    approachTitle: 'From idea to scale',
    approachIntro: 'Progressive validation replaces assumptions with evidence and helps determine whether an opportunity should advance.',
    approach: ['Identify the opportunity', 'Research the customer and problem', 'Validate demand', 'Test the proposition', 'Define the business model', 'Pilot', 'Measure', 'Scale selectively'],
    relatedTitle: 'Related Ventures Insights',
    faqTitle: 'Ventures FAQ',
    faqIntro: 'Answers about venture building, validation and go-to-market planning.',
    faq: [
      { question: 'What is venture building?', answer: [{ text: 'Venture building is the structured process of identifying an opportunity, validating the customer need, shaping the proposition and business model, piloting the operation and scaling only when the evidence supports it.' }] },
      { question: 'How do you validate a business idea before investing?', answer: [{ text: 'Validation combines customer research with behavioural evidence such as tests, pilot activity, pre-orders, enquiries or willingness to pay. Our business idea validation guide explains the process in detail.', links: [{ text: 'business idea validation guide', href: '/insights/validate-business-idea-morocco' }] }] },
      { question: 'How do you launch a new brand in Morocco?', answer: [{ text: 'A strong launch starts with a defined customer, validated proposition, clear positioning, viable channel and practical operating model. Read the guide to launching a new brand in Morocco.', links: [{ text: 'guide to launching a new brand in Morocco', href: '/insights/launching-a-new-brand-in-morocco' }] }] },
      { question: 'Does NEXSUS Ventures invest in startups?', answer: [{ text: 'Selected strategic investments may be considered where there is a strong fit, but NEXSUS Ventures is not presented as an open venture-capital fund and does not imply a commitment to invest in submitted opportunities.' }] },
      { question: 'Can international companies use NEXSUS Ventures to assess Morocco?', answer: [{ text: 'Where the opportunity fits the division, NEXSUS Ventures can support market assessment, proposition testing and practical market-entry planning for Morocco.' }] },
      { question: 'What is the difference between market research and market validation?', answer: [{ text: 'Market research studies the market, customers and competitors. Market validation tests whether real customers respond to a specific proposition strongly enough to support a business decision.' }] },
      { question: 'When should a business scale?', answer: [{ text: 'Scale should follow evidence of demand, viable economics, usable acquisition or distribution channels and an operation that can deliver reliably as volume increases.' }] },
    ],
  },
};
