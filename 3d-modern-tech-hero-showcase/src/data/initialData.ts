import { HeroConfig } from '../types';

export const HERO_IMAGE_PATH = '/src/assets/images/hero_3d_tech_branding_1785914593899.jpg';
export const ARCHITECTURE_IMAGE_PATH = '/src/assets/images/ai_architecture_3d_1785914611227.jpg';

export const PRESET_CONFIGS: Record<string, HeroConfig> = {
  genai_engineer: {
    greeting: "Hi, I'm Keshav 👋",
    headlinePrefix: "Full-Stack Developer & ",
    headlineHighlight: "GenAI Engineer",
    headlineSuffix: "",
    subtitle: "I build modern, scalable web applications and intelligent AI-powered products that solve real world problems with high performance architecture.",
    primaryCtaText: "View My Work →",
    primaryCtaLink: "#work",
    secondaryCtaText: "Let's Connect",
    secondaryCtaLink: "#contact",
    accentTheme: "cyber-neon",
    heroMode: "combined",
    badgeText: "Available for Senior AI & Full-Stack Roles",
    techStack: [
      { id: 'react', name: 'React 19', icon: 'Atom', color: '#61DAFB', category: 'frontend' },
      { id: 'next', name: 'Next.js', icon: 'Zap', color: '#FFFFFF', category: 'frontend' },
      { id: 'node', name: 'Node.js', icon: 'Server', color: '#5FA04E', category: 'backend' },
      { id: 'python', name: 'Python', icon: 'Code', color: '#3776AB', category: 'backend' },
      { id: 'langchain', name: 'LangChain', icon: 'Layers', color: '#00A3E0', category: 'ai' },
      { id: 'openai', name: 'OpenAI / Gemini', icon: 'Bot', color: '#10A37F', category: 'ai' }
    ],
    valueProps: [
      {
        id: 'web-apps',
        title: 'Scalable Web Apps',
        description: 'Blazing fast, sub-50ms React & Next.js full-stack architectures built for enterprise scale.',
        iconName: 'Zap',
        badge: 'High Latency Efficiency',
        metrics: '< 50ms TTFB'
      },
      {
        id: 'ai-solutions',
        title: 'AI-Powered Solutions',
        description: 'Production RAG, autonomous multi-agent swarms, and function-calling LLM integrations.',
        iconName: 'Bot',
        badge: 'Gemini & OpenAI SDKs',
        metrics: '99.8% Precision'
      },
      {
        id: 'cloud-devops',
        title: 'Cloud & DevOps',
        description: 'Serverless Cloud Run, Docker orchestration, Automated CI/CD, and robust security posture.',
        iconName: 'Cloud',
        badge: 'Cloud Native',
        metrics: '99.99% Uptime'
      },
      {
        id: 'data-products',
        title: 'Data-Driven Products',
        description: 'Vector databases (Pinecone, Firestore), real-time pipelines, and analytics telemetry.',
        iconName: 'Database',
        badge: 'Vector Search',
        metrics: '10M+ Embeddings'
      }
    ],
    architectureNodes: [
      {
        id: 'llms',
        label: 'LLMs Engine',
        sublabel: 'Gemini 1.5 Pro & GPT-4o',
        icon: 'Cpu',
        x: 52,
        y: 18,
        description: 'High-speed reasoning foundation models with structured function calling and streaming token generation.',
        details: [
          'Streaming response pipeline with zero backpressure',
          'Custom system instruction injection & dynamic safety filters',
          'Token optimization & semantic caching layers'
        ]
      },
      {
        id: 'rag',
        label: 'RAG Pipeline',
        sublabel: 'Vector DB -> Embeddings',
        icon: 'Database',
        x: 50,
        y: 35,
        description: 'Retrieval Augmented Generation pipeline providing accurate ground truth context from proprietary knowledge bases.',
        details: [
          'Chunking with hybrid dense & sparse keyword search',
          'Pinecone / Firestore pgvector embedding index',
          'Re-ranking via Cohere rerank models for top-k precision'
        ]
      },
      {
        id: 'agents',
        label: 'AI Agents',
        sublabel: 'Autonomous Tools & Memory',
        icon: 'Bot',
        x: 88,
        y: 18,
        description: 'Multi-step autonomous agent swarms capable of executing API calls, browsing data, and completing complex workflows.',
        details: [
          'Short-term & long-term conversation memory retention',
          'Tool execution engine with sandboxed bash & API fallback',
          'Self-correcting code synthesis loop'
        ]
      },
      {
        id: 'finetuning',
        label: 'Fine-tuning & Benchmarks',
        sublabel: 'Evaluation & Loss Curves',
        icon: 'TrendingUp',
        x: 88,
        y: 36,
        description: 'Model optimization through domain-specific LoRA adapters and continuous LLM evaluation metrics.',
        details: [
          'LoRA & QLoRA fine-tuning pipelines',
          'Automated evaluation benchmark against ground truth datasets',
          'Latency & cost telemetry dashboard'
        ]
      }
    ]
  },

  enterprise_saas: {
    greeting: "Next-Gen AI Platform 🚀",
    headlinePrefix: "Autonomous Agents & ",
    headlineHighlight: "Real-Time Intelligence",
    headlineSuffix: " for Enterprise",
    subtitle: "Empower your product team with self-healing workflow pipelines, vector-native search, and instant LLM orchestration.",
    primaryCtaText: "Start Free Trial →",
    primaryCtaLink: "#trial",
    secondaryCtaText: "Book Architecture Demo",
    secondaryCtaLink: "#demo",
    accentTheme: "matrix-cyan",
    heroMode: "combined",
    badgeText: "SOC2 Type II Certified & HIPAA Compliant",
    techStack: [
      { id: 'typescript', name: 'TypeScript', icon: 'Code', color: '#3178C6', category: 'frontend' },
      { id: 'python', name: 'Python', icon: 'Terminal', color: '#3776AB', category: 'backend' },
      { id: 'docker', name: 'Docker / K8s', icon: 'Box', color: '#2496ED', category: 'cloud' },
      { id: 'pinecone', name: 'Pinecone', icon: 'Database', color: '#000000', category: 'ai' },
      { id: 'gemini', name: 'Gemini 1.5', icon: 'Sparkles', color: '#8E75FF', category: 'ai' }
    ],
    valueProps: [
      {
        id: 'instant-deploy',
        title: 'Instant Deployment',
        description: 'Ship AI agent workflows in minutes with standard Docker images and one-click cloud ingress.',
        iconName: 'Rocket',
        badge: 'Zero Config',
        metrics: '3-Min Setup'
      },
      {
        id: 'enterprise-security',
        title: 'Bank-Grade Security',
        description: 'End-to-end encryption at rest and in transit, private VPC peering, and zero data training leaks.',
        iconName: 'ShieldCheck',
        badge: 'SOC2 Compliant',
        metrics: '256-bit AES'
      },
      {
        id: 'smart-routing',
        title: 'Smart Model Routing',
        description: 'Dynamic fallback across Gemini, Claude, and OpenAI models based on latency and cost optimization.',
        iconName: 'GitMerge',
        badge: 'Cost Savings',
        metrics: '40% Lower Cost'
      },
      {
        id: 'live-telemetry',
        title: 'Real-Time Telemetry',
        description: 'Full audit trails, token usage graphs, latency heatmaps, and continuous model drift monitoring.',
        iconName: 'Activity',
        badge: 'Live Insights',
        metrics: '100% Visibility'
      }
    ],
    architectureNodes: [
      {
        id: 'gateway',
        label: 'API Ingress Gateway',
        sublabel: 'Rate Limiting & Auth',
        icon: 'Lock',
        x: 52,
        y: 18,
        description: 'Edge security proxy managing JWT tokens, rate limits, and DDoS protection.',
        details: ['OAuth 2.0 & OIDC authentication', 'Global CDN caching', 'Sub-millisecond SSL handshake']
      },
      {
        id: 'agent-orchestrator',
        label: 'Agent Swarm Manager',
        sublabel: 'DAG Workflow Execution',
        icon: 'Workflow',
        x: 88,
        y: 18,
        description: 'Orchestrates complex multi-agent execution graphs with automatic retry logic.',
        details: ['Parallel task scheduling', 'State persistence across sessions', 'Human-in-the-loop review triggers']
      }
    ]
  }
};
