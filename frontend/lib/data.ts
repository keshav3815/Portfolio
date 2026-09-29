import {
  Activity,
  Atom,
  Binary,
  Bot,
  Boxes,
  Braces,
  Briefcase,
  Cloud,
  Code2,
  Component,
  Container,
  Database,
  Drama,
  Feather,
  FileCode,
  FileSpreadsheet,
  Flame,
  FlaskConical,
  FolderGit2,
  Frame,
  Gauge,
  GitBranch,
  GraduationCap,
  KeyRound,
  Layers,
  LayoutGrid,
  Leaf,
  LineChart,
  Link2,
  MessageSquare,
  Network,
  PanelsTopLeft,
  RadioTower,
  Rocket,
  Route,
  Send,
  Server,
  ShieldCheck,
  Sigma,
  Table,
  Table2,
  Terminal,
  Waypoints,
  Wind,
  Workflow,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Skill = { name: string; icon: LucideIcon };
export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  featured?: boolean;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", icon: Code2 },
      { name: "TypeScript", icon: Braces },
      { name: "JavaScript", icon: FileCode },
      { name: "Go", icon: Binary },
      { name: "SQL", icon: Database },
      { name: "HTML5 / CSS3", icon: PanelsTopLeft },
    ],
  },
  {
    title: "Frontend",
    icon: Component,
    skills: [
      { name: "React (18/19)", icon: Atom },
      { name: "Vue.js", icon: Component },
      { name: "TanStack", icon: Table2 },
      { name: "Zustand", icon: Boxes },
      { name: "Tailwind CSS", icon: Wind },
      { name: "Bootstrap", icon: LayoutGrid },
    ],
  },
  {
    title: "Backend",
    icon: Network,
    skills: [
      { name: "FastAPI", icon: Zap },
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: Route },
      { name: "PHP", icon: FileCode },
      { name: "Pydantic v2", icon: ShieldCheck },
      { name: "Celery", icon: Workflow },
    ],
  },
  {
    title: "GenAI / LLM",
    icon: Bot,
    featured: true,
    skills: [
      { name: "LangChain", icon: Link2 },
      { name: "LangGraph", icon: Workflow },
      { name: "RAG", icon: Layers },
      { name: "OpenAI API", icon: MessageSquare },
      { name: "LiteLLM", icon: Feather },
      { name: "ChromaDB", icon: Database },
      { name: "pgvector", icon: Waypoints },
    ],
  },
  {
    title: "Data / ML",
    icon: LineChart,
    skills: [
      { name: "pandas", icon: Table },
      { name: "NumPy", icon: Sigma },
      { name: "scikit-learn", icon: FlaskConical },
      { name: "XGBoost", icon: GitBranch },
      { name: "MLflow", icon: Activity },
      { name: "Playwright", icon: Drama },
      { name: "pdfplumber / openpyxl", icon: FileSpreadsheet },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "SQLAlchemy / Alembic", icon: Layers },
      { name: "asyncpg", icon: Zap },
      { name: "MySQL", icon: Database },
      { name: "MongoDB", icon: Leaf },
      { name: "Redis", icon: Zap },
    ],
  },
  {
    title: "Infra / Platform",
    icon: Boxes,
    skills: [
      { name: "Docker", icon: Container },
      { name: "Kong API Gateway", icon: Network },
      { name: "Cerbos (RBAC)", icon: ShieldCheck },
      { name: "Zitadel OAuth2", icon: KeyRound },
      { name: "NATS", icon: RadioTower },
      { name: "MinIO / S3", icon: Cloud },
      { name: "OpenTelemetry", icon: Activity },
      { name: "Prometheus", icon: Flame },
      { name: "Grafana", icon: Gauge },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: FolderGit2 },
      { name: "Postman", icon: Send },
      { name: "Linux", icon: Terminal },
      { name: "VS Code", icon: Code2 },
      { name: "Figma", icon: Frame },
    ],
  },
];

export type Project = {
  title: string;
  status: string;
  ribbon?: string;
  image: string;
  blurb: string;
  description: string;
  tags: string[];
  live?: string;
  code?: string;
};

export const projects: Project[] = [
  {
    title: "Oz Builders Depot",
    status: "Live",
    ribbon: "Client",
    image: "/ozbuildersdepot.svg",
    blurb:
      "Premium bathroom & kitchen fittings catalogue for an Australian supplier.",
    description:
      "Marketing & product-catalogue site for an Australian bathroom and kitchen fittings supplier with Sydney and Adelaide showrooms — collection browsing, product enquiries and a downloadable catalogue.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://ozbuildersdepot.com.au/",
  },
  {
    title: "Spice Route Enterprises",
    status: "Live",
    ribbon: "Client",
    image: "/spiceroute.png",
    blurb:
      "Export-facing site for an Indian spice, food & grocery exporter.",
    description:
      "Marketing and enquiry site for Spiceroute Enterprises Pvt Ltd, an Indian spice, food and grocery exporter — product range, sourcing story and a one-business-day export enquiry flow.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://spicerouteenterprises.in/",
  },
  {
    title: "Durgam Systems",
    status: "In Development",
    ribbon: "Client",
    image: "/durgam.png",
    blurb:
      "Corporate gifting & custom-branding storefront for a Gurugram supplier.",
    description:
      "E-commerce storefront for Durgam Systems, a Gurugram corporate-gifting supplier — branded gifts, notebooks, cables and IT accessories with custom logo branding and MOQ-based ordering.",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
  },
  {
    title: "Freequademy",
    status: "In Development",
    ribbon: "AI",
    image: "/free.png",
    blurb: "AI-powered learning platform with a RAG chatbot over your notes & PDFs.",
    description:
      "Student-centric learning platform with a RAG chatbot, MCQ generation and LLM-powered content summarisation.",
    tags: ["React", "Vue", "Node.js", "MySQL", "LangChain"],
    live: "https://www.freequademy.com/",
    code: "https://github.com/Keshav3815",
  },
  {
    title: "DailyJob",
    status: "In Development",
    ribbon: "Product",
    image: "/dailyjob.png",
    blurb: "Job marketplace connecting job seekers and employers.",
    description:
      "Job marketplace connecting job seekers and employers — job listings, candidate profiles, applications and hiring workflows.",
    tags: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "TRV Technologies LLP",
    status: "Live",
    ribbon: "Client",
    image: "/trvtech.png",
    blurb:
      "Corporate site for a Delhi NCR IT infrastructure & security solutions provider.",
    description:
      "Corporate site for TRV Technologies LLP, a Delhi NCR IT solutions provider — IT infrastructure, CCTV security, networking, AMC and web development services, with a service catalogue and enquiry flow.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    live: "https://trvtech.in/",
  },
  {
    title: "APC Bheja",
    status: "Live",
    ribbon: "Community",
    image: "/apcbheja.png",
    blurb:
      "Community hub for books, events, donations, volunteering & exam prep.",
    description:
      "Community hub for APC Bheja (बौद्धिक उत्थान केंद्र) — books, events, donations, volunteering, exam prep and member initiatives, with role-based onboarding and contribution tracking.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://apcbheja.in/",
  },
];

export type Certification = {
  org: string;
  issuer: string;
  title: string;
  description: string;
  metaLabel: string;
  metaValue: string;
  icon: LucideIcon;
};

export const certifications: Certification[] = [
  {
    org: "NPTEL",
    issuer: "IIT Guwahati",
    title: "Multi-Core Computer Architecture",
    description:
      "Elite Certification covering parallel processing, multi-core design principles and modern computer architecture.",
    metaLabel: "Duration",
    metaValue: "Jul–Oct 2023",
    icon: Layers,
  },
  {
    org: "SWAYAM",
    issuer: "NITTTR Chandigarh",
    title: "Internet of Things: Design Concepts & Use Cases",
    description:
      "Explored IoT design concepts, architectures and real-world use cases across connected systems.",
    metaLabel: "Duration",
    metaValue: "2024",
    icon: RadioTower,
  },
  {
    org: "Metacrafters",
    issuer: "Chandigarh University",
    title: "Blockchain Technology using Ethereum & Polygon",
    description:
      "Hands-on program on building and deploying smart contracts across the Ethereum and Polygon ecosystems.",
    metaLabel: "Issued",
    metaValue: "2024",
    icon: Boxes,
  },
  {
    org: "Infosys Springboard",
    issuer: "Blockchain",
    title: "Introduction to Blockchain and Ethereum",
    description:
      "Fundamentals of blockchain technology, smart contracts and the Ethereum ecosystem.",
    metaLabel: "Issued",
    metaValue: "2024",
    icon: Link2,
  },
];

export type JourneyMilestone = {
  date: string;
  chapter: string;
  title: string;
  org: string;
  description: string;
  icon: LucideIcon;
  current?: boolean;
};

export const journey: JourneyMilestone[] = [
  {
    date: "2022",
    chapter: "The Beginning",
    title: "Started B.E. Computer Science",
    org: "Chandigarh University",
    description:
      "Wrote my first real programs and fell for the question behind every system: how does this actually work under the hood?",
    icon: GraduationCap,
  },
  {
    date: "2023",
    chapter: "Going Deeper",
    title: "Multi-Core Computer Architecture — Elite",
    org: "NPTEL · IIT Guwahati",
    description:
      "Parallel processing and multi-core design — the systems thinking that later shaped how I build async backends.",
    icon: Layers,
  },
  {
    date: "2024",
    chapter: "Exploring",
    title: "IoT, Blockchain & Smart Contracts",
    org: "SWAYAM · Metacrafters · Infosys Springboard",
    description:
      "Branched out into connected systems and shipped smart contracts on Ethereum & Polygon — learning by building.",
    icon: Boxes,
  },
  {
    date: "2024 – 25",
    chapter: "First Clients",
    title: "Freelance & community builds",
    org: "Oz Builders Depot · Spice Route · TRV Tech · APC Bheja",
    description:
      "Turned skills into shipped products — client websites for businesses in Australia and India, and a community platform for an NGO.",
    icon: Code2,
  },
  {
    date: "Feb 2026",
    chapter: "Going Pro",
    title: "Gen-AI Engineer",
    org: "Simplifyai",
    description:
      "Built the co-lending module for SimplifyCredit — ~35 backend services, an append-only sub-ledger, settlement & reconciliation on FastAPI, PostgreSQL and Celery/Redis.",
    icon: Briefcase,
  },
  {
    date: "2026",
    chapter: "AI in Production",
    title: "SimplifyInsights",
    org: "Simplifyai",
    description:
      "Analytics for 945+ listed companies: async XBRL ingestion at ~96% coverage, XGBoost credit-scoring, and an SSE-streamed RAG chatbot behind a governed LLM orchestrator.",
    icon: Bot,
  },
  {
    date: "Now",
    chapter: "Next Chapter",
    title: "Building what's next",
    org: "Open to new opportunities",
    description:
      "Finishing my degree and looking for the next hard problem in backend and GenAI engineering. Maybe it's yours?",
    icon: Rocket,
    current: true,
  },
];

export const social = {
  email: "keshavsingh3815@gmail.com",
  github: "https://github.com/keshav3815",
  linkedin: "https://www.linkedin.com/in/keshav-singh3815/",
  instagram: "https://www.instagram.com/thisiskeshavsingh/",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
