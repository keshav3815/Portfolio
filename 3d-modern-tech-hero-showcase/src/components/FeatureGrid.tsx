import React from 'react';
import { ARCHITECTURE_IMAGE_PATH } from '../data/initialData';
import { Zap, ShieldCheck, Cpu, Code2, Sparkles, Database, ArrowUpRight, Check } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: "Generative AI Integration",
      description: "Direct server-side Gemini 1.5 Flash & Pro orchestration with context caching and streaming response pipelines."
    },
    {
      icon: <Database className="w-6 h-6 text-purple-400" />,
      title: "RAG & Vector Search",
      description: "Sub-50ms hybrid semantic search using pgvector and Pinecone index embeddings for enterprise precision."
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      title: "Autonomous Agent Swarms",
      description: "Multi-step tool execution engine capable of executing function calls, code synthesis, and API automation."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Production Infrastructure",
      description: "Cloud Run containerization, automated build optimization with esbuild, and zero trust API security."
    }
  ];

  return (
    <section className="relative z-10 py-20 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered for High-Scale GenAI Applications
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Everything you need to deliver production-grade AI applications with high resolution 3D visual branding, resilient backend services, and sub-50ms latency.
          </p>
        </div>

        {/* 3D Architecture Diagram Highlight */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                Interactive Architecture
              </span>
              <h3 className="text-2xl font-bold text-white">
                Next-Gen RAG & Agent Flow
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect documents, knowledge bases, and API integrations directly into high-speed vector indices. Our multi-agent swarm handles step-by-step reasoning effortlessly.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  'Sub-50ms RAG retrieval benchmark',
                  'Multi-modal text, image, and vector embeddings',
                  'Automated loss-curve telemetry & model drift monitoring'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              <img
                src={ARCHITECTURE_IMAGE_PATH}
                alt="3D AI Architecture Flow"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 space-y-3"
            >
              <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800">
                {feat.icon}
              </div>
              <h4 className="text-lg font-bold text-white">{feat.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
