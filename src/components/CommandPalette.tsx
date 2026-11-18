import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { CurriculumPrefixTrie } from '../algorithms/trie';
import { ALL_CHAPTERS, CHAPTER_BY_ID } from '../data/sigmaCurriculum';
import type { CurriculumChapter } from '../types/curriculum';

interface CommandPaletteProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const trie = useMemo(() => new CurriculumPrefixTrie(ALL_CHAPTERS), []);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const { results, executionMicros } = useMemo(() => {
    const searchOut = trie.search(query);
    const list: CurriculumChapter[] = [];
    for (const id of searchOut.matchedIds) {
      const chap = CHAPTER_BY_ID.get(id);
      if (chap) list.push(chap);
      if (list.length >= 12) break;
    }
    return { results: list, executionMicros: searchOut.executionMicros };
  }, [query, trie]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setActiveIndex(0);
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (results.length === 0 ? 0 : (prev + 1) % results.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (results.length === 0 ? 0 : (prev - 1 + results.length) % results.length));
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault();
      onClose();
      document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Prefix Trie Curriculum Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 px-4 pt-20 backdrop-blur-xs"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-[var(--border-hairline)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--accent-cyan)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Prefix Trie search across 60+ MERN & Java DSA chapters…"
            className="w-full bg-transparent px-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <span className="mr-2 shrink-0 rounded bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent-cyan)]">
            {executionMicros}μs
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="rounded p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-4 py-8 text-center text-xs text-[var(--text-secondary)]">
              No prefix matches found for “{query}”.
            </li>
          ) : (
            results.map((chapter, idx) => {
              const active = idx === activeIndex;
              return (
                <li key={chapter.id} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      onClose();
                      document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                      active ? 'bg-[var(--accent-cyan)]/15 text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-primary)]">{chapter.title}</div>
                      <div className="font-mono text-[11px] text-[var(--text-muted)]">
                        {chapter.trackLabel} · {chapter.complexityOrPattern}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent-cyan)]" />
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};