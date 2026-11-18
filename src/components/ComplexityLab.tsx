import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { COMPLEXITY_CURVES } from '../data/sigmaCurriculum';

export const ComplexityLab: React.FC = () => {
  const [inputN, setInputN] = useState<number>(64);

  const maxLogScale = Math.log10(1000 * 1000 + 1);
  const svgWidth = 560;
  const svgHeight = 250;
  const padLeft = 44;
  const padBottom = 28;
  const padTop = 18;
  const padRight = 20;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const samplePoints = [2, 8, 16, 32, 64, 128, 256, 512, 1000];

  const buildPolyline = (evaluate: (n: number) => number): string => {
    return samplePoints
      .map((n, index) => {
        const x = padLeft + (index / (samplePoints.length - 1)) * plotW;
        const ops = evaluate(n);
        const normalizedY = Math.min(1, Math.log10(ops + 1) / maxLogScale);
        const y = padTop + plotH - normalizedY * plotH;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <section
      id="complexity"
      aria-labelledby="complexity-heading"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
              Order Complexity Analysis · Java &amp; Full-Stack Optimization
            </div>
            <h2
              id="complexity-heading"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
              className="mt-2 font-bold tracking-tight text-[var(--text-primary)]"
            >
              Asymptotic Big-O Growth Simulator
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2.5">
            <Activity className="h-4 w-4 text-[var(--accent-cyan)]" />
            <label htmlFor="n-slider" className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
              Input Size <strong className="text-[var(--text-primary)]">n = {inputN.toLocaleString()}</strong>
            </label>
            <input
              id="n-slider"
              type="range"
              min={4}
              max={1024}
              step={4}
              value={inputN}
              onChange={(e) => setInputN(Number(e.target.value))}
              className="w-28 accent-[var(--accent-cyan)] sm:w-36"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive SVG Asymptotic Curve Plot */}
          <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5 lg:col-span-7">
            <div className="mb-3 flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
              <span>Log-Scaled Operations Growth Curve</span>
              <span>n ∈ [2 … 1000]</span>
            </div>

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              role="img"
              aria-label="Asymptotic time complexity curves comparing O(1), O(log n), O(n), O(n log n), and O(n squared)"
              className="h-auto w-full overflow-visible"
            >
              {/* Horizontal Grid Guidelines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padTop + plotH - ratio * plotH;
                return (
                  <line
                    key={ratio}
                    x1={padLeft}
                    y1={y}
                    x2={svgWidth - padRight}
                    y2={y}
                    stroke="var(--border-hairline)"
                    strokeDasharray="3 3"
                  />
                );
              })}

              {/* Axes */}
              <line
                x1={padLeft}
                y1={padTop}
                x2={padLeft}
                y2={padTop + plotH}
                stroke="var(--border-strong)"
                strokeWidth={1.5}
              />
              <line
                x1={padLeft}
                y1={padTop + plotH}
                x2={svgWidth - padRight}
                y2={padTop + plotH}
                stroke="var(--border-strong)"
                strokeWidth={1.5}
              />

              {/* Complexity Polylines */}
              {COMPLEXITY_CURVES.map((curve) => (
                <polyline
                  key={curve.id}
                  fill="none"
                  stroke={curve.colorToken}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={buildPolyline(curve.evaluate)}
                />
              ))}

              {/* X-Axis Labels */}
              {samplePoints.map((n, index) => {
                const x = padLeft + (index / (samplePoints.length - 1)) * plotW;
                return (
                  <text
                    key={n}
                    x={x}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fill="var(--text-muted)"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                  >
                    {n}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Live Operation Telemetry Cards */}
          <div className="space-y-3 lg:col-span-5">
            {COMPLEXITY_CURVES.map((curve) => {
              const ops = Math.round(curve.evaluate(inputN));
              return (
                <div
                  key={curve.id}
                  className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: curve.colorToken }}
                      />
                      <span className="font-mono text-sm font-bold text-[var(--text-primary)]">
                        {curve.notation}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">({curve.name})</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                      ~{ops.toLocaleString()} ops
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {curve.curriculumExamples.map((example) => (
                      <span
                        key={example}
                        className="rounded bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};