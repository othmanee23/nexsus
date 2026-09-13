import { EcosystemDivision, PortfolioProject, OperatingStep, Leader, BusinessArea } from './types';

export const DIVISIONS: EcosystemDivision[] = [
  {
    id: 'amaris',
    number: '01',
    name: 'AMARIS',
    label: 'CREATIVE DEPARTMENT',
    tagline: 'amaris from nexsus™',
    description: 'Building brands, content and creative experiences that connect businesses with people.',
    extendedDescription: 'AMARIS operates as the central creative engine of the group. We partner with high-ambition organizations and internal ventures to craft brand identities, cinematic production, editorial publications, and bespoke digital experiences grounded in cultural resonance.',
    services: [
      'Production',
      'Brand Identity',
      'Creative Support',
      'Digital Experiences',
      'Art Direction',
      'Editorial Systems'
    ],
    ctaText: 'EXPLORE AMARIS',
    image: '/images/division-amaris.jpg',
    previewImage: '/images/project-brand.jpg',
    capabilities: [
      { title: 'Brand Identity Systems', desc: 'Holistic visual systems, typography standards, and brand guidelines crafted for enduring longevity.' },
      { title: 'Film & Editorial Production', desc: 'Still and motion capture that articulates architectural, product, and human narratives.' },
      { title: 'Digital Environments', desc: 'Interactive experiences and digital editorial platforms with Swiss typographical rigor.' }
    ],
    highlightMetric: { value: '42+', label: 'Global brand identities & campaigns deployed' },
    deliverables: ['Visual Systems', 'Campaign Films', 'Design Guidelines', 'Interactive Web Systems']
  },
  {
    id: 'projects',
    number: '02',
    name: 'PROJECTS',
    label: 'BUILT ENVIRONMENT',
    tagline: 'Spatial intelligence and execution',
    description: 'From concept to delivery, NEXSUS develops functional, distinctive spaces across private and public projects.',
    extendedDescription: 'PROJECTS translates spatial ambition into built reality. Handling architectural planning, interior fit-outs, bespoke structural elements, and large-scale public-sector contracts across Morocco and the Mediterranean basin with rigorous material integrity.',
    services: [
      'Construction',
      'Interior Architecture',
      'Fit-out',
      'Space Design',
      'Public Sector Contracts',
      'Material Sourcing'
    ],
    ctaText: 'EXPLORE PROJECTS',
    image: '/images/division-projects.jpg',
    previewImage: '/images/project-villa.jpg',
    capabilities: [
      { title: 'Architectural Interiors', desc: 'Monolithic stone, raw timber, and ambient light studies for commercial headquarters and residences.' },
      { title: 'Public Sector Realization', desc: 'Turnkey procurement and compliance for civic pavilions, institutional centers, and public tenders.' },
      { title: 'Full-Cycle Delivery', desc: 'Rigorous engineering oversight from raw structural framing through custom millwork installation.' }
    ],
    highlightMetric: { value: '180,000 m²', label: 'Built environment engineered & delivered' },
    deliverables: ['Architectural Execution', 'Turnkey Fit-Outs', 'Custom Spatial Fixtures', 'Civic Facilities']
  },
  {
    id: 'technology',
    number: '03',
    name: 'TECHNOLOGY & SOLUTIONS',
    label: 'DIGITAL INFRASTRUCTURE',
    tagline: 'Systems engineered for longevity',
    description: 'We design and build technology that helps organizations operate, scale and create new opportunities.',
    extendedDescription: 'TECHNOLOGY & SOLUTIONS engineers robust software infrastructure, proprietary enterprise tools, SaaS platforms, and custom B2B operating systems. We eliminate operational friction with lean, high-velocity digital architectures.',
    services: [
      'Enterprise Software',
      'SaaS Platforms',
      'Digital Products',
      'B2B Consulting',
      'Custom Solutions',
      'Cloud Architecture'
    ],
    ctaText: 'EXPLORE TECHNOLOGY',
    image: '/images/division-technology.jpg',
    previewImage: '/images/project-cyber.jpg',
    capabilities: [
      { title: 'Core Enterprise Engines', desc: 'Mission-critical database architectures, automated workflows, and high-concurrency API backbones.' },
      { title: 'SaaS Platforms & Interfaces', desc: 'Data-dense operational dashboards designed with immediate cognitive clarity and keyboard-first workflows.' },
      { title: 'Strategic Technical Advisory', desc: 'Technical due diligence, modernization roadmaps, and systems consolidation for scaling enterprises.' }
    ],
    highlightMetric: { value: '99.99%', label: 'Infrastructure uptime across group platforms' },
    deliverables: ['Custom Web & Native Platforms', 'API Architectures', 'Operational Toolkits', 'Data Pipelines']
  },
  {
    id: 'ventures',
    number: '04',
    name: 'VENTURES',
    label: 'BUSINESSES & INVESTMENTS',
    tagline: 'Capital and operational execution',
    description: 'We create, operate and invest in businesses built around long-term opportunities.',
    extendedDescription: 'VENTURES originates and incubates proprietary operating businesses, from premium consumer goods to vertical tech software and logistics services. We deploy permanent capital, internal talent, and shared operational leverage to build enduring category leaders.',
    services: [
      'Consumer Brands',
      'Proprietary Products',
      'New Ventures',
      'Strategic Investments',
      'Incubation',
      'Operating Leverage'
    ],
    ctaText: 'EXPLORE VENTURES',
    image: '/images/division-ventures.jpg',
    previewImage: '/images/project-bank.jpg',
    capabilities: [
      { title: 'Proprietary Incubation', desc: 'Direct formation of high-margin companies leveraging NEXSUS creative, space, and tech divisions.' },
      { title: 'Strategic Equity Deployment', desc: 'Long-term equity stakes in founder-led businesses where operational synergy accelerates velocity.' },
      { title: 'Shared Group Infrastructure', desc: 'Immediate access to group legal, brand, talent, engineering, and physical real estate capabilities.' }
    ],
    highlightMetric: { value: '€14.5M+', label: 'Combined venture asset value under management' },
    deliverables: ['Brand Incubation', 'Growth Capital', 'Operating Playbooks', 'Commercial Distribution']
  }
];

export const SELECTED_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-01',
    divisionId: 'amaris',
    division: 'AMARIS',
    category: 'BRAND IDENTITY',
    name: 'Lumina Group Master Identity',
    year: '2026',
    location: 'Casablanca / Paris',
    image: '/images/division-ventures.jpg',
    summary: 'A unified editorial brand and design system for a premier Mediterranean investment holding company.',
    overview: 'Lumina required a sovereign brand system capable of uniting international private equity holdings under a quiet, rigorous European aesthetic. AMARIS devised an identity grounded in Swiss typography and warm monolithic paper stock.',
    scope: ['Brand Strategy', 'Visual Identity System', 'Executive Stationery', 'Digital Flagship'],
    metrics: 'Unified 12 sub-entities under one coherent design language.'
  },
  {
    id: 'proj-02',
    divisionId: 'projects',
    division: 'PROJECTS',
    category: 'INTERIOR ARCHITECTURE',
    name: 'Pavilion Atlas & Executive Workspace',
    year: '2026',
    location: 'Marrakech',
    image: '/images/project-spatial.jpg',
    summary: 'Turnkey architectural fit-out merging brutalist poured concrete with traditional tadelakt plasterwork.',
    overview: 'Commissioned to construct an executive retreat and headquarters for regional operations. The structure emphasizes passive thermal cooling, native stone framing, and bespoke recessed lighting fixtures.',
    scope: ['Structural Engineering', 'Interior Fit-Out', 'Custom Millwork', 'Landscape Architecture'],
    metrics: 'Completed 2 weeks ahead of scheduled government summit.'
  },
  {
    id: 'proj-03',
    divisionId: 'technology',
    division: 'TECHNOLOGY',
    category: 'ENTERPRISE PLATFORM',
    name: 'Kora Freight Orchestration Engine',
    year: '2026',
    location: 'Tangier Med / Remote',
    image: '/images/project-tech.jpg',
    summary: 'High-throughput logistics dashboard and automated container dispatch platform.',
    overview: 'Kora transforms Mediterranean freight routing by integrating customs telemetry, vessel arrival forecasts, and fleet scheduling into a sub-second response control room interface.',
    scope: ['System Architecture', 'High-Concurrency Engine', 'Custom UI System', 'Security Audits'],
    metrics: '42,000 TEU processed monthly with zero system latency.'
  },
  {
    id: 'proj-04',
    divisionId: 'ventures',
    division: 'VENTURES',
    category: 'CONSUMER VENTURE',
    name: 'Sillage Botanical Goods',
    year: '2026',
    location: 'Casablanca',
    image: '/images/project-studio.jpg',
    summary: 'Proprietary consumer formulation brand utilizing regenerative Atlas mountain botanicals.',
    overview: 'Conceived, incubated, and funded internally by NEXSUS VENTURES with brand design by AMARIS. Sillage has expanded into 14 luxury hospitality properties across North Africa and Southern Europe.',
    scope: ['Venture Incubation', 'Supply Chain Formulation', 'Packaging Engineering', 'Direct-to-Consumer Platform'],
    metrics: 'Profitable within first 9 months of market introduction.'
  },
  {
    id: 'proj-05',
    divisionId: 'projects',
    division: 'PROJECTS',
    category: 'PUBLIC SECTOR CONTRACT',
    name: 'Civic Innovation Atrium',
    year: '2025',
    location: 'Rabat',
    image: '/images/project-tower.jpg',
    summary: 'A 4,200 m² municipal public exhibition hall and civic meeting council chambers.',
    overview: 'Awarded through competitive public tender, NEXSUS PROJECTS engineered acoustic ceiling baffles, modular partition assemblies, and public circulation plazas built for high daily foot-traffic.',
    scope: ['Public Tender Execution', 'Acoustic Engineering', 'LEED Silver Certification', 'Fire Safety Architecture'],
    metrics: 'Hosting 60+ public civic delegations annually.'
  },
  {
    id: 'proj-06',
    divisionId: 'amaris',
    division: 'AMARIS',
    category: 'DIGITAL EXPERIENCE',
    name: 'Monolith Architecture Archives',
    year: '2026',
    location: 'Amsterdam / Zurich',
    image: '/images/project-interior.jpg',
    summary: 'Digital monograph and searchable archive honoring contemporary brutalist works.',
    overview: 'An editorial interactive experience displaying archival photography, blueprints, and architectural essays. Features typographic scaling inspired by Swiss international style posters.',
    scope: ['Art Direction', 'Custom WebGL Shader Transitions', 'Editorial Curation', 'Typography Systems'],
    metrics: 'Featured across international design publications.'
  }
];

export const OPERATING_STEPS: OperatingStep[] = [
  {
    number: '01',
    title: 'IDENTIFY',
    headline: 'Opportunities, problems and market needs.',
    description: 'We assess market inefficiencies, underutilized assets, and systemic gaps across physical spaces, software infrastructure, and consumer markets.',
    aspects: ['Market validation', 'Strategic diligence', 'Capital modeling']
  },
  {
    number: '02',
    title: 'CREATE',
    headline: 'Brands, environments and digital products.',
    description: 'Our creative and architectural teams conceive distinct concepts with profound visual restraint, functional clarity, and cultural authority.',
    aspects: ['System identity', 'Spatial concepts', 'Interface prototyping']
  },
  {
    number: '03',
    title: 'BUILD',
    headline: 'Execution across design, technology and physical spaces.',
    description: 'Rigorous engineering and on-site fabrication. From software codebases and APIs to structural masonry and turnkey millwork.',
    aspects: ['Production oversight', 'Turnkey construction', 'Robust code deployment']
  },
  {
    number: '04',
    title: 'GROW',
    headline: 'Operate, improve and scale.',
    description: 'We operate what we build. Providing ongoing executive management, product optimization, and capital allocation for long-term compound growth.',
    aspects: ['Operational governance', 'Platform scaling', 'Value realization']
  }
];

export const LEADERSHIP: Leader[] = [
  {
    id: 'haitham',
    name: 'Haitham',
    role: 'Founder & Owner — NEXSUS',
    bio: 'Leading strategy, growth and business development across the NEXSUS group.',
    image: '/images/leader-adam.jpg',
    focus: ['Group Strategy', 'Capital Allocation', 'New Market Expansion', 'Public Affairs'],
    location: 'Morocco / International'
  },
  {
    id: 'abdelatif',
    name: 'Abdelatif Haissoun',
    role: 'CEO — AMARIS',
    secondaryRole: 'Manager — Technology & Solutions',
    bio: 'Creative direction, digital products, brand strategy and technology initiatives.',
    image: '/images/leader-karim.jpg',
    focus: ['Creative Direction', 'Product Architecture', 'Brand Positioning', 'Digital Systems'],
    location: 'Morocco'
  },
  {
    id: 'othman',
    name: 'Othman',
    role: 'Developer',
    bio: 'Building scalable digital products, platforms and technical solutions.',
    image: '/images/leader-mehdi.jpg',
    focus: ['Full-Stack Platforms', 'Cloud Infrastructure', 'API Engineering', 'UI Performance'],
    location: 'Morocco'
  }
];

export const BUSINESS_AREAS: BusinessArea[] = [
  {
    index: '01',
    title: 'Creative',
    divisionId: 'amaris',
    description: 'Brand systems, visual identity, advertising production, and digital experiences through AMARIS.',
    previewImage: '/images/project-brand.jpg'
  },
  {
    index: '02',
    title: 'Built Environment',
    divisionId: 'projects',
    description: 'Architectural spaces, structural fit-outs, space design, and public contracts through PROJECTS.',
    previewImage: '/images/project-spatial.jpg'
  },
  {
    index: '03',
    title: 'Technology',
    divisionId: 'technology',
    description: 'Enterprise platforms, digital products, SaaS, and bespoke technical advisory through TECHNOLOGY & SOLUTIONS.',
    previewImage: '/images/project-tech.jpg'
  },
  {
    index: '04',
    title: 'Ventures',
    divisionId: 'ventures',
    description: 'Proprietary consumer brands, commercial incubations, and strategic asset holdings through VENTURES.',
    previewImage: '/images/project-tower.jpg'
  }
];
