import React, { useState } from 'react';
import { HeroConfig } from '../types';
import { X, Copy, Check, Code, Download } from 'lucide-react';

interface CodeExportModalProps {
  config: HeroConfig;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ config, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'react' | 'json'>('react');

  const reactCodeSnippet = `import React from 'react';
import { Zap, Bot, Cloud, Database, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden py-16 px-6">
      {/* Background glow mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/30 to-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Value Props */}
        <div className="lg:col-span-6 space-y-8 z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <span>${config.greeting}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            ${config.headlinePrefix}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ${config.headlineHighlight}
            </span>
            ${config.headlineSuffix}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            ${config.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="${config.primaryCtaLink}" className="px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center">
              ${config.primaryCtaText}
            </a>
            <a href="${config.secondaryCtaLink}" className="px-6 py-3.5 rounded-xl font-semibold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 transition-all">
              ${config.secondaryCtaText}
            </a>
          </div>

          {/* Tech stack badges */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">Core Stack & AI Tools</div>
            <div className="flex flex-wrap gap-2">
              ${config.techStack.map((t) => `<span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">${t.name}</span>`).join('\n              ')}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visual Cards */}
        <div className="lg:col-span-6 relative z-10">
          <div className="relative p-6 rounded-3xl bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-xl">
            <img 
              src="${config.heroMode === 'pure-3d-image' ? '/assets/hero_3d.jpg' : 'https://picsum.photos/seed/3dtech/1200/675'}" 
              alt="3D Tech Hero" 
              className="w-full h-auto rounded-2xl shadow-lg border border-slate-800"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}`;

  const jsonCodeSnippet = JSON.stringify(config, null, 2);

  const handleCopy = () => {
    const textToCopy = activeTab === 'react' ? reactCodeSnippet : jsonCodeSnippet;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToCopy = activeTab === 'react' ? reactCodeSnippet : jsonCodeSnippet;
    const blob = new Blob([textToCopy], { type: activeTab === 'react' ? 'text/typescript' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HeroSection.${activeTab === 'react' ? 'tsx' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-3xl overflow-hidden border rounded-2xl bg-slate-900/95 border-slate-700 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 border rounded-lg bg-indigo-950/50 border-indigo-800 text-indigo-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Export Hero Section Code</h3>
              <p className="text-xs text-slate-400">Copy React + Tailwind code or download JSON configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('react')}
            className={`px-5 py-3 border-b-2 transition-colors ${
              activeTab === 'react'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            React 19 + Tailwind Component (.tsx)
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-5 py-3 border-b-2 transition-colors ${
              activeTab === 'json'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Hero Configuration (.json)
          </button>
        </div>

        <div className="p-5">
          <pre className="p-4 overflow-x-auto text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-indigo-200 max-h-96 leading-relaxed">
            {activeTab === 'react' ? reactCodeSnippet : jsonCodeSnippet}
          </pre>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/80">
          <span className="text-xs text-slate-400">
            Copy into your project or export to Vite / Next.js
          </span>
          <div className="flex space-x-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold border rounded-lg bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1.5" /> Download File
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors flex items-center"
            >
              {copied ? <Check className="w-4 h-4 mr-1.5 text-emerald-300" /> : <Copy className="w-4 h-4 mr-1.5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
