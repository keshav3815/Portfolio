import React, { useState } from 'react';
import { HeroConfig, TechStackItem, ValuePropCard } from '../types';
import { X, Sparkles, Plus, Trash2, Check, RotateCcw, Palette } from 'lucide-react';

interface HeroEditorPanelProps {
  config: HeroConfig;
  onChange: (newConfig: HeroConfig) => void;
  onReset: () => void;
  onClose: () => void;
}

export const HeroEditorPanel: React.FC<HeroEditorPanelProps> = ({
  config,
  onChange,
  onReset,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'theme' | 'tech' | 'values'>('content');

  const updateField = <K extends keyof HeroConfig>(field: K, value: HeroConfig[K]) => {
    onChange({ ...config, [field]: value });
  };

  // Add new tech stack item
  const [newTechName, setNewTechName] = useState('');
  const handleAddTech = () => {
    if (!newTechName.trim()) return;
    const newItem: TechStackItem = {
      id: Date.now().toString(),
      name: newTechName.trim(),
      icon: 'Code',
      color: '#38BDF8',
      category: 'ai'
    };
    onChange({ ...config, techStack: [...config.techStack, newItem] });
    setNewTechName('');
  };

  const handleRemoveTech = (id: string) => {
    onChange({ ...config, techStack: config.techStack.filter((t) => t.id !== id) });
  };

  // Add new value prop card
  const handleAddValueProp = () => {
    const newProp: ValuePropCard = {
      id: Date.now().toString(),
      title: 'New Capability',
      description: 'Describe your core feature or product value proposition here.',
      iconName: 'Zap',
      badge: 'Feature Highlight',
      metrics: '100% Custom'
    };
    onChange({ ...config, valueProps: [...config.valueProps, newProp] });
  };

  const handleUpdateValueProp = (id: string, field: keyof ValuePropCard, val: string) => {
    const updated = config.valueProps.map((vp) => (vp.id === id ? { ...vp, [field]: val } : vp));
    onChange({ ...config, valueProps: updated });
  };

  const handleRemoveValueProp = (id: string) => {
    onChange({ ...config, valueProps: config.valueProps.filter((vp) => vp.id !== id) });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900/95 border-l border-slate-700 shadow-2xl backdrop-blur-xl flex flex-col text-slate-100 animate-slideInRight">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Hero Studio Customizer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="p-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center space-x-1 border border-slate-800 rounded-md hover:bg-slate-800"
            title="Reset to initial setup"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-medium">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors ${
            activeTab === 'content'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Copy & Text
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors ${
            activeTab === 'theme'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Theme Accents
        </button>
        <button
          onClick={() => setActiveTab('tech')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors ${
            activeTab === 'tech'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Tech Stack
        </button>
        <button
          onClick={() => setActiveTab('values')}
          className={`flex-1 py-3 text-center border-b-2 transition-colors ${
            activeTab === 'values'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Value Cards
        </button>
      </div>

      {/* Content body */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 text-sm">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase">Greeting Tag</label>
              <input
                type="text"
                value={config.greeting}
                onChange={(e) => updateField('greeting', e.target.value)}
                className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase">Status / Badge Pill</label>
              <input
                type="text"
                value={config.badgeText || ''}
                onChange={(e) => updateField('badgeText', e.target.value)}
                placeholder="e.g. Available for AI Roles"
                className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase">Headline Prefix</label>
                <input
                  type="text"
                  value={config.headlinePrefix}
                  onChange={(e) => updateField('headlinePrefix', e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase">Highlighted Keyword</label>
                <input
                  type="text"
                  value={config.headlineHighlight}
                  onChange={(e) => updateField('headlineHighlight', e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase">Subtitle Description</label>
              <textarea
                rows={3}
                value={config.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase">Primary CTA Text</label>
                <input
                  type="text"
                  value={config.primaryCtaText}
                  onChange={(e) => updateField('primaryCtaText', e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase">Secondary CTA Text</label>
                <input
                  type="text"
                  value={config.secondaryCtaText}
                  onChange={(e) => updateField('secondaryCtaText', e.target.value)}
                  className="w-full px-3 py-2 mt-1 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">3D Accent Palette</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'cyber-neon', name: 'Cyber Neon (Blue/Purple)', colors: 'from-blue-500 via-indigo-500 to-purple-500' },
                  { id: 'matrix-cyan', name: 'Matrix Electric (Cyan/Teal)', colors: 'from-cyan-400 via-teal-500 to-blue-600' },
                  { id: 'sunset-gold', name: 'Sunset Solar (Gold/Orange)', colors: 'from-amber-400 via-orange-500 to-red-500' },
                  { id: 'deep-violet', name: 'Deep Violet (Purple/Pink)', colors: 'from-purple-500 via-pink-500 to-indigo-600' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateField('accentTheme', t.id as any)}
                    className={`p-3 text-left rounded-xl border transition-all flex flex-col space-y-2 ${
                      config.accentTheme === t.id
                        ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className={`h-3 w-full rounded-full bg-gradient-to-r ${t.colors}`} />
                    <span className="text-xs font-medium text-slate-200">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Display Mode</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'combined', label: 'Interactive 3D Overlay' },
                  { id: 'pure-3d-image', label: 'High-Res 3D Image' },
                  { id: 'interactive-canvas', label: 'Pure CSS 3D Glass' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateField('heroMode', m.id as any)}
                    className={`p-2.5 text-xs font-medium rounded-lg border text-center transition-colors ${
                      config.heroMode === m.id
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTechName}
                onChange={(e) => setNewTechName(e.target.value)}
                placeholder="Add technology badge (e.g. PyTorch)"
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAddTech}
                disabled={!newTechName.trim()}
                className="px-3 py-2 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase">Active Tech Pills</label>
              <div className="flex flex-wrap gap-2">
                {config.techStack.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs"
                  >
                    <span>{item.name}</span>
                    <button
                      onClick={() => handleRemoveTech(item.id)}
                      className="text-slate-400 hover:text-rose-400 transition-colors ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase">Value Proposition Cards</label>
              <button
                onClick={handleAddValueProp}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center font-medium"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Card
              </button>
            </div>

            <div className="space-y-3">
              {config.valueProps.map((card) => (
                <div key={card.id} className="p-3 border rounded-xl bg-slate-950/60 border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleUpdateValueProp(card.id, 'title', e.target.value)}
                      className="font-semibold text-sm bg-transparent border-b border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleRemoveValueProp(card.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={card.description}
                    onChange={(e) => handleUpdateValueProp(card.id, 'description', e.target.value)}
                    className="w-full text-xs p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={card.badge || ''}
                      placeholder="Badge"
                      onChange={(e) => handleUpdateValueProp(card.id, 'badge', e.target.value)}
                      className="text-xs p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    />
                    <input
                      type="text"
                      value={card.metrics || ''}
                      placeholder="Metric"
                      onChange={(e) => handleUpdateValueProp(card.id, 'metrics', e.target.value)}
                      className="text-xs p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors flex items-center"
        >
          <Check className="w-4 h-4 mr-1.5" /> Apply Changes
        </button>
      </div>
    </div>
  );
};
