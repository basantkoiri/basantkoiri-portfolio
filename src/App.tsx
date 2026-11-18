import React, { useEffect, useState } from 'react';
import { ArchitectureShowcase } from './components/ArchitectureShowcase';
import { CommandPalette } from './components/CommandPalette';
import { ComplexityLab } from './components/ComplexityLab';
import { ContactFooter } from './components/ContactFooter';
import { CurriculumExplorer } from './components/CurriculumExplorer';
import { HeroGraphCanvas } from './components/HeroGraphCanvas';
import { MetricsRibbon } from './components/MetricsRibbon';
import { Navbar } from './components/Navbar';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  const [paletteOpen, setPaletteOpen] = useState(false);

  const toggleTheme = (): void => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('bk-theme', next);
    } catch {
      // Ignore storage quota restrictions
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[var(--accent-cyan)] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-slate-950"
      >
        Skip to main content
      </a>

      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main-content">
        <HeroGraphCanvas />
        <MetricsRibbon />
        <CurriculumExplorer />
        <ComplexityLab />
        <ArchitectureShowcase />
      </main>

      <ContactFooter />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
};

export default App;