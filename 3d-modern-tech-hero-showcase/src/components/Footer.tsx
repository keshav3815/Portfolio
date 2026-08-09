import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950 py-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-bold text-white text-sm">3D Tech Hero Studio</span>
            <p className="text-[11px] text-slate-500">Professional Modern Tech Branding & Product Showcase</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-slate-400 font-medium">
          <a href="#work" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#features" className="hover:text-white transition-colors">Value Props</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-slate-500 text-[11px]">Built with React 19, Tailwind & 3D GenAI</span>
        </div>
      </div>
    </footer>
  );
};
