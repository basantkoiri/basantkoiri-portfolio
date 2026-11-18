import React, { useState } from 'react';
import { Check, Cpu, Database, Server } from 'lucide-react';
import { ARCHITECTURE_BLUEPRINTS } from '../data/sigmaCurriculum';

export const ArchitectureShowcase: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(ARCHITECTURE_BLUEPRINTS[0]?.id ?? 'mern-mega-architecture');

  const activeBlueprint =
    ARCHITECTURE_BLUEPRINTS.find((bp) => bp.id === activeId) ?? ARCHITECTURE_BLUEPRINTS[0];

  if (!activeBlueprint) return null;

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="border-b border-[var(--border-hairline)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div>
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
            Capstone &amp; Systems Engineering Blueprints
          </div>
          <h2
            id="architecture-heading"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
            className="mt-2 font-bold tracking-tight text-[var(--text-primary)]"
          >
            Production System Architectures
          </h2>
        </div>

        {/* Blueprint Selector Tabs */}
        <div role="tablist" aria-label="System blueprints" className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {ARCHITECTURE_BLUEPRINTS.map((bp, index) => {
            const selected = bp.id === activeBlueprint.id;
            const Icon = index === 0 ? Server : index === 1 ? Cpu : Database;
            return (
              <button
                key={bp.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(bp.id)}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] ${
                  selected
                    ? 'border-[var(--accent-cyan)] bg-[var(--bg-elevated)]'
                    : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/70 hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-[var(--accent-cyan)]">{bp.badge}</span>
                  <Icon className="h-4 w-4 text-[var(--text-muted)]" />
                </div>
                <div
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="mt-2 text-base font-bold text-[var(--text-primary)]"
                >
                  {bp.title}
                </div>
                <div className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">{bp.domain}</div>
              </button>
            );
          })}
        </div>

        {/* Active Architecture Inspection Panel */}
        <div className="mt-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="rounded-md bg-[var(--accent-cyan)]/15 px-2.5 py-1 font-mono text-xs font-semibold text-[var(--accent-cyan)]">
                {activeBlueprint.badge}
              </span>
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="mt-3 text-2xl font-bold text-[var(--text-primary)]"
              >
                {activeBlueprint.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {activeBlueprint.summary}
              </p>

              <div className="mt-5">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Technology Stack
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeBlueprint.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Algorithmic &amp; Systems Guarantees
                </div>
                <ul className="mt-2.5 space-y-2">
                  {activeBlueprint.algorithmicHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] sm:text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-emerald)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3 lg:col-span-6">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Architectural Layer Contracts
              </div>
              {activeBlueprint.layers.map((layer, idx) => (
                <div
                  key={layer.name}
                  className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                      0{idx + 1}. {layer.name}
                    </span>
                    <span className="rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent-cyan)]">
                      {layer.contract}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">{layer.responsibility}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};