import React from 'react';
import { HeroConfig } from '../types';
import { PRESET_CONFIGS } from '../data/initialData';
import { Sparkles, Sliders, Code, Eye, RefreshCw, Layers } from 'lucide-react';

interface NavbarProps {
  config: HeroConfig;
  onSelectPreset: (key: string) => void;
  onOpenCustomizer: () => void;
  onOpenExport: () => void;
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onSelectPreset,
  onOpenCustomizer,
  onOpenExport,
  onToggleViewMode
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand logo & tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base text-white tracking-tight">3D Tech Hero Studio</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO 3D
              </span>
            </div>
            <p className="text-[11px] text-slate-400">High-Resolution Tech Branding & Hero Architecture</p>
          </div>
        </div>

        {/* Quick Presets & View Switcher */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-900/90 p-1 border border-slate-800 rounded-xl text-xs font-medium">
          <button
            onClick={() => onSelectPreset('genai_engineer')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1"
          >
            <span>Keshav (GenAI Dev)</span>
          </button>
          <button
            onClick={() => onSelectPreset('enterprise_saas')}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1"
          >
            <span>Enterprise SaaS</span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onToggleViewMode}
            className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center"
            title="Switch display view mode"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
            <span className="hidden sm:inline">View: </span>
            <span className="ml-1 text-cyan-300 capitalize">{config.heroMode.replace('-', ' ')}</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 transition-all flex items-center"
          >
            <Sliders className="w-3.5 h-3.5 mr-1.5" />
            <span>Customize Hero</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-3 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center"
          >
            <Code className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
            <span className="hidden sm:inline">Export Code</span>
          </button>
        </div>
      </div>
    </header>
  );
};
