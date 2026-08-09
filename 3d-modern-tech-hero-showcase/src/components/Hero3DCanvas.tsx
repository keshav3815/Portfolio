import React, { useState, useRef } from 'react';
import { HeroConfig, ArchitectureNode } from '../types';
import { HERO_IMAGE_PATH } from '../data/initialData';
import { GeminiAgentDemo } from './GeminiAgentDemo';
import {
  Zap,
  Bot,
  Cloud,
  Database,
  ArrowRight,
  Sparkles,
  Cpu,
  TrendingUp,
  Layers,
  Code,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Rocket,
  Activity
} from 'lucide-react';

interface Hero3DCanvasProps {
  config: HeroConfig;
  onNodeClick: (node: ArchitectureNode) => void;
  onOpenCustomizer: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ config, onNodeClick, onOpenCustomizer }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Cap tilt angles
    setTilt({
      x: Math.max(-10, Math.min(10, -(y / rect.height) * 15)),
      y: Math.max(-10, Math.min(10, (x / rect.width) * 15))
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getThemeGradient = () => {
    switch (config.accentTheme) {
      case 'matrix-cyan':
        return 'from-cyan-400 via-teal-400 to-blue-500';
      case 'sunset-gold':
        return 'from-amber-400 via-orange-400 to-red-500';
      case 'deep-violet':
        return 'from-purple-400 via-pink-400 to-indigo-400';
      case 'cyber-neon':
      default:
        return 'from-blue-400 via-indigo-400 to-purple-400';
    }
  };

  const renderValIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-amber-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-rose-400" />;
      case 'Zap':
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full min-h-[calc(100vh-4rem)] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
    >
      {/* Background glow orb */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 bg-gradient-to-tr ${getThemeGradient()}`}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COLUMN: Value Proposition & Copy */}
        <div className="lg:col-span-5 space-y-6 z-20">
          {/* Badge */}
          {config.badgeText && (
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-lg shadow-indigo-950/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{config.badgeText}</span>
            </div>
          )}

          {/* Greeting */}
          <div className="text-sm font-bold tracking-wide text-indigo-400 uppercase">
            {config.greeting}
          </div>

          {/* Main 3D Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            {config.headlinePrefix}
            <span className={`bg-gradient-to-r ${getThemeGradient()} bg-clip-text text-transparent drop-shadow-sm`}>
              {config.headlineHighlight}
            </span>
            {config.headlineSuffix}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
            {config.subtitle}
          </p>

          {/* Core Feature Value Props (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {config.valueProps.map((vp) => (
              <div
                key={vp.id}
                className="group p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-md backdrop-blur-md"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                    {renderValIcon(vp.iconName)}
                  </div>
                  {vp.metrics && (
                    <span className="text-[10px] font-mono font-bold text-indigo-300 px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-900">
                      {vp.metrics}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {vp.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                  {vp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={config.primaryCtaLink}
              className={`px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl shadow-indigo-600/30 transition-all duration-300 transform hover:-translate-y-0.5 bg-gradient-to-r ${getThemeGradient()} flex items-center`}
            >
              <span>{config.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>

            <a
              href={config.secondaryCtaLink}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:text-white transition-all shadow-md"
            >
              {config.secondaryCtaText}
            </a>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Powered by Modern Ecosystem
            </div>
            <div className="flex flex-wrap gap-2">
              {config.techStack.map((tech) => (
                <span
                  key={tech.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-medium hover:border-indigo-500/40 hover:text-white transition-colors"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Interactive Hero Canvas (Parallax + Nodes + Preview Monitor) */}
        <div className="lg:col-span-7 relative z-20">
          <div
            className="relative transition-transform duration-200 ease-out preserve-3d"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            }}
          >
            {/* Glass Container */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/80 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/70">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">3D-GenAI-Architecture-Stage.v2</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Click Nodes to Inspect Architecture</span>
                </div>
              </div>

              {/* Main Visual Display */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                {/* 3D Generated Background Image */}
                <img
                  src={HERO_IMAGE_PATH}
                  alt="3D High-Res Tech Hero"
                  className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient Neon Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Interactive Hotspot Nodes overlay */}
                {config.architectureNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => onNodeClick(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950/90 border border-indigo-500/60 text-white text-xs font-semibold shadow-xl shadow-indigo-900/50 hover:border-cyan-400 hover:scale-110 transition-all duration-300"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                    </span>
                    <span className="text-slate-200 group-hover:text-cyan-300 font-medium">
                      {node.label}
                    </span>
                  </button>
                ))}

                {/* Embedded Live Agent Playground Monitor (Bottom-right corner of desk visual) */}
                <div className="absolute bottom-3 right-3 w-72 sm:w-80 h-44 z-20 hidden sm:block">
                  <GeminiAgentDemo />
                </div>
              </div>

              {/* Bottom Interactive Architecture Bar */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-slate-300 flex items-center">
                    <Layers className="w-4 h-4 mr-1.5 text-indigo-400" /> Live Pipeline:
                  </span>
                  <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
                    <span className="text-cyan-400 font-mono">Vector Embeddings</span>
                    <span>→</span>
                    <span className="text-purple-400 font-mono">Gemini Reasoning</span>
                    <span>→</span>
                    <span className="text-emerald-400 font-mono">Autonomous Execution</span>
                  </div>
                </div>

                <button
                  onClick={onOpenCustomizer}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Edit 3D Elements
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
