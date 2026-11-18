import React from 'react';
import { ALL_CHAPTERS, SIGMA_TRACKS } from '../data/sigmaCurriculum';

export const MetricsRibbon: React.FC = () => {
  const totalCategories = SIGMA_TRACKS.reduce((sum, track) => sum + track.categories.length, 0);

  const metrics = [
    { label: 'Mastered Curriculum Chapters', value: `${ALL_CHAPTERS.length}+`, detail: '100% Sigma Syllabus' },
    { label: 'Engineering Domains', value: `${SIGMA_TRACKS.length} Tracks`, detail: `${totalCategories} Core Categories` },
    { label: 'DSA Solved & Practiced', value: '300+', detail: 'Java + Top Company Problems' },
    { label: 'Video & Live Mentorship', value: '500+ Hrs', detail: 'Cohort Start: 7 Jan 2025' }
  ];

  return (
    <section aria-label="Curriculum and engineering metrics" className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-[var(--border-hairline)] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-4 py-6 sm:px-6">
            <div
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl"
            >
              {metric.value}
            </div>
            <div className="mt-1 text-xs font-semibold text-[var(--text-secondary)]">{metric.label}</div>
            <div className="mt-0.5 font-mono text-[11px] text-[var(--text-muted)]">{metric.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};