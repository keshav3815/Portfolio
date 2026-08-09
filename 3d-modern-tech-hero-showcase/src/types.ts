export interface TechStackItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'frontend' | 'backend' | 'ai' | 'cloud';
}

export interface ValuePropCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  metrics?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  x: number; // position percentage
  y: number;
  description: string;
  details: string[];
}

export interface HeroConfig {
  greeting: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  accentTheme: 'cyber-neon' | 'matrix-cyan' | 'sunset-gold' | 'deep-violet';
  heroMode: 'combined' | 'pure-3d-image' | 'interactive-canvas';
  techStack: TechStackItem[];
  valueProps: ValuePropCard[];
  architectureNodes: ArchitectureNode[];
  badgeText: string;
}
