import React from 'react';
import { Command, Moon, Sun, Terminal } from 'lucide-react';

interface NavbarProps {
  readonly theme: 'dark' | 'light';
  readonly onToggleTheme: () => void;
  readonly onOpenPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenPalette }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] font-mono text-xs font-bold text-[var(--accent-cyan)]">
            BK
          </span>
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-base font-bold">
              Basant Koiri
            </span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">basantkoiri.com.np</span>
          </span>
        </a>

        <nav aria-label="Primary sections" className="hidden items-center gap-6 text-sm md:flex">
          <a
            href="#curriculum"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Curriculum
          </a>
          <a
            href="#complexity"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Big-O Lab
          </a>
          <a
            href="#architecture"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Architectures
          </a>
          <a
            href="#contact"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open Trie Curriculum Search Palette"
            className="flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
          >
            <Terminal className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
            <span className="hidden sm:inline">Trie Search</span>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};