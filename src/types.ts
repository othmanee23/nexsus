export interface EcosystemDivision {
  id: 'amaris' | 'projects' | 'technology' | 'ventures';
  number: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  services: string[];
  ctaText: string;
  image: string;
  previewImage: string;
  capabilities: { title: string; desc: string }[];
  highlightMetric: { value: string; label: string };
  deliverables: string[];
}

export interface PortfolioProject {
  id: string;
  divisionId: 'amaris' | 'projects' | 'technology' | 'ventures';
  division: string;
  category: string;
  name: string;
  year: string;
  location?: string;
  image: string;
  summary: string;
  overview: string;
  scope: string[];
  metrics?: string;
}

export interface OperatingStep {
  number: string;
  title: string;
  headline: string;
  description: string;
  aspects: string[];
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  secondaryRole?: string;
  bio: string;
  image: string;
  focus: string[];
  location: string;
}

export interface BusinessArea {
  index: string;
  title: string;
  divisionId: 'amaris' | 'projects' | 'technology' | 'ventures';
  description: string;
  previewImage: string;
}
