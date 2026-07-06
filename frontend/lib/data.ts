import {
  Atom,
  BarChart3,
  Bot,
  Boxes,
  Braces,
  CandlestickChart,
  Code2,
  Coins,
  Component,
  FileCode,
  FileSignature,
  HardHat,
  Image as ImageIcon,
  Layers,
  Link2,
  LineChart,
  MessageSquare,
  Network,
  Plug,
  RadioTower,
  Sparkles,
  TrendingUp,
  Triangle,
  Users,
  Wallet,
  Wind,
  Workflow,
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
    title: "Frontend",
    icon: Component,
    skills: [
      { name: "Next.js", icon: Triangle },
      { name: "React", icon: Atom },
      { name: "TypeScript", icon: Braces },
      { name: "Tailwind CSS", icon: Wind },
      { name: "Framer Motion", icon: Sparkles },
      { name: "shadcn/ui", icon: Component },
    ],
  },
  {
    title: "Backend",
    icon: Network,
    skills: [
      { name: "FastAPI", icon: Zap },
      { name: "Python", icon: Code2 },
      { name: "REST API", icon: Network },
      { name: "WebSocket", icon: Plug },
      { name: "SSE Streaming", icon: RadioTower },
    ],
  },
  {
    title: "AI Stack",
    icon: Bot,
    featured: true,
    skills: [
      { name: "LangChain", icon: Link2 },
      { name: "LlamaIndex", icon: Workflow },
      { name: "Ollama", icon: Bot },
      { name: "OpenAI API", icon: MessageSquare },
      { name: "Google Gemini", icon: Sparkles },
      { name: "vLLM", icon: Zap },
      { name: "MCP", icon: Plug },
      { name: "AI Agents", icon: Bot },
      { name: "RAG", icon: Layers },
      { name: "Multi-Agent", icon: Workflow },
    ],
  },
  {
    title: "Blockchain & Web3",
    icon: Boxes,
    skills: [
      { name: "Solidity", icon: FileCode },
      { name: "Hardhat", icon: HardHat },
      { name: "Ethers.js", icon: Boxes },
      { name: "MetaMask", icon: Wallet },
      { name: "Smart Contracts", icon: FileSignature },
      { name: "NFT", icon: ImageIcon },
      { name: "ERC20", icon: Coins },
      { name: "DeFi", icon: TrendingUp },
      { name: "DAO", icon: Users },
    ],
  },
  {
    title: "Crypto APIs",
    icon: LineChart,
    skills: [
      { name: "CoinGecko", icon: Coins },
      { name: "CoinMarketCap", icon: BarChart3 },
      { name: "Binance API", icon: LineChart },
      { name: "TradingView", icon: CandlestickChart },
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
    title: "Freequademy",
    status: "In Development",
    ribbon: "AI",
    image: "/free.png",
    blurb: "AI-powered learning platform with a RAG chatbot over your notes & PDFs.",
    description:
      "Student-centric learning platform with a RAG chatbot, MCQ generation and LLM-powered content summarisation.",
    tags: ["Next.js", "FastAPI", "LangChain", "LlamaIndex", "RAG"],
    live: "https://www.freequademy.com/",
    code: "https://github.com/Keshav3815",
  },
  {
    title: "TRV Technologies LLP",
    status: "Completed",
    image: "/TRV1.jpg",
    blurb: "Corporate website with dark/light mode, smooth motion & modern UI.",
    description:
      "A professional company website focused on performance, responsive layouts and accessibility.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "http://trvtech.in/",
    code: "https://github.com/Keshav3815",
  },
  {
    title: "APC",
    status: "In Progress",
    ribbon: "Web3",
    image: "/dailyjob2.jpg",
    blurb: "Community & NGO engagement platform with real-time dashboards.",
    description:
      "Community & NGO engagement platform with role-based onboarding, book management and real-time contribution dashboards.",
    tags: ["Next.js", "React", "FastAPI", "WebSocket", "Tailwind CSS"],
    code: "https://github.com/Keshav3815",
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
    metaValue: "Jul–Dec 2024",
    icon: RadioTower,
  },
  {
    org: "Infosys Springboard",
    issuer: "Blockchain",
    title: "Introduction to Blockchain and Ethereum",
    description:
      "Fundamentals of blockchain technology, smart contracts and the Ethereum ecosystem.",
    metaLabel: "Issued",
    metaValue: "May 2024",
    icon: Boxes,
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
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
