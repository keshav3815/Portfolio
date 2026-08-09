import React, { useState } from 'react';
import { HeroConfig, ArchitectureNode } from './types';
import { PRESET_CONFIGS } from './data/initialData';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero3DCanvas } from './components/Hero3DCanvas';
import { FeatureGrid } from './components/FeatureGrid';
import { Footer } from './components/Footer';
import { InteractiveNodeModal } from './components/InteractiveNodeModal';
import { HeroEditorPanel } from './components/HeroEditorPanel';
import { CodeExportModal } from './components/CodeExportModal';

export default function App() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(PRESET_CONFIGS.genai_engineer);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleSelectPreset = (key: string) => {
    if (PRESET_CONFIGS[key]) {
      setHeroConfig(PRESET_CONFIGS[key]);
    }
  };

  const handleReset = () => {
    setHeroConfig(PRESET_CONFIGS.genai_engineer);
  };

  const handleToggleViewMode = () => {
    const modes: HeroConfig['heroMode'][] = ['combined', 'pure-3d-image', 'interactive-canvas'];
    const currentIndex = modes.indexOf(heroConfig.heroMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setHeroConfig((prev) => ({ ...prev, heroMode: nextMode }));
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* 3D Animated Background Canvas */}
      <ParticleCanvas theme={heroConfig.accentTheme} />

      {/* Navigation Header */}
      <Navbar
        config={heroConfig}
        onSelectPreset={handleSelectPreset}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Core 3D Landing Page Hero Section */}
      <main>
        <Hero3DCanvas
          config={heroConfig}
          onNodeClick={(node) => setSelectedNode(node)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Feature & Architecture Grid */}
        <FeatureGrid />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Architectural Node Modal */}
      <InteractiveNodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />

      {/* Live Hero Customizer Panel */}
      {isCustomizerOpen && (
        <HeroEditorPanel
          config={heroConfig}
          onChange={setHeroConfig}
          onReset={handleReset}
          onClose={() => setIsCustomizerOpen(false)}
        />
      )}

      {/* Code & JSON Export Modal */}
      {isExportOpen && (
        <CodeExportModal
          config={heroConfig}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}
