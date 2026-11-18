import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Layers, Search, X } from 'lucide-react';
import { CurriculumPrefixTrie } from '../algorithms/trie';
import { ALL_CHAPTERS, CHAPTER_BY_ID, SIGMA_TRACKS } from '../data/sigmaCurriculum';
import type { ChapterId, CurriculumChapter, SearchState, TrackFilter } from '../types/curriculum';

export const CurriculumExplorer: React.FC = () => {
  const trie = useMemo(() => new CurriculumPrefixTrie(ALL_CHAPTERS), []);

  const [searchState, setSearchState] = useState<SearchState>({
    status: 'browsing',
    activeTrack: 'all'
  });
  const [rawQuery, setRawQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<ChapterId | null>(null);

  const handleSearchChange = (nextQuery: string, track: TrackFilter = searchState.activeTrack): void => {
    setRawQuery(nextQuery);
    const trimmed = nextQuery.trim();
    if (trimmed.length === 0) {
      setSearchState({ status: 'browsing', activeTrack: track });
      return;
    }

    const result = trie.search(trimmed);
    const filteredMatches = new Set<ChapterId>();
    for (const id of result.matchedIds) {
      const chapter = CHAPTER_BY_ID.get(id);
      if (chapter && (track === 'all' || chapter.trackId === track)) {
        filteredMatches.add(id);
      }
    }

    if (filteredMatches.size === 0) {
      setSearchState({
        status: 'empty',
        activeTrack: track,
        query: trimmed,
        executionMicros: result.executionMicros
      });
    } else {
      setSearchState({
        status: 'searching',
        activeTrack: track,
        query: trimmed,
        matchedIds: filteredMatches,
        executionMicros: result.executionMicros
      });
    }
  };

  const handleTrackChange = (track: TrackFilter): void => {
    handleSearchChange(rawQuery, track);
  };

  const visibleTracks = useMemo(() => {
    return SIGMA_TRACKS.filter(
      (track) => searchState.activeTrack === 'all' || track.id === searchState.activeTrack
    )
      .map((track) => {
        const categories = track.categories
          .map((cat) => {
            const chapters = cat.chapters.filter((chap) => {
              if (searchState.status === 'browsing') return true;
              if (searchState.status === 'searching') return searchState.matchedIds.has(chap.id);
              return false;
            });
            return { ...cat, chapters };
          })
          .filter((cat) => cat.chapters.length > 0);
        return { ...track, categories };
      })
      .filter((track) => track.categories.length > 0);
  }, [searchState]);

  const visibleCount = useMemo(
    () =>
      visibleTracks.reduce(
        (acc, track) => acc + track.categories.reduce((cAcc, cat) => cAcc + cat.chapters.length, 0),
        0
      ),
    [visibleTracks]
  );

  const selectedChapter: CurriculumChapter | undefined = selectedChapterId
    ? CHAPTER_BY_ID.get(selectedChapterId)
    : undefined;

  return (
    <section id="curriculum" aria-labelledby="curriculum-heading" className="border-b border-[var(--border-hairline)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
              Complete Knowledge Inventory · Apna College Sigma Batch
            </div>
            <h2
              id="curriculum-heading"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
              className="mt-2 font-bold tracking-tight text-[var(--text-primary)]"
            >
              MERN Stack &amp; Java DSA Curriculum Matrix
            </h2>
          </div>

          <div className="font-mono text-xs text-[var(--text-secondary)]">
            Showing <strong className="text-[var(--text-primary)]">{visibleCount}</strong> of{' '}
            <strong>{ALL_CHAPTERS.length}</strong> chapters
            {searchState.status !== 'browsing' && (
              <span className="ml-2 rounded bg-[var(--accent-cyan)]/15 px-2 py-0.5 text-[var(--accent-cyan)]">
                Trie lookup: {searchState.executionMicros}μs
              </span>
            )}
          </div>
        </div>

        {/* Search & Track Controls */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Curriculum tracks" className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all', label: 'All Tracks (60+)' },
                { id: 'frontend', label: 'Frontend (HTML/CSS/Tailwind)' },
                { id: 'javascript', label: 'JavaScript & Git' },
                { id: 'fullstack', label: 'Node / Express / SQL / Mongo / React' },
                { id: 'dsa', label: 'Java & DSA' }
              ] as const
            ).map((tab) => {
              const active = searchState.activeTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTrackChange(tab.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] ${
                    active
                      ? 'bg-[var(--accent-cyan)] text-slate-950'
                      : 'border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="search"
              value={rawQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Trie search: Dijkstra, Closures, MVC, DP..."
              aria-label="Search curriculum topics using Prefix Trie"
              className="w-full rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] py-2 pr-9 pl-9 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:outline-none"
            />
            {rawQuery.length > 0 && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                aria-label="Clear search query"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {searchState.status === 'empty' && (
          <div className="mt-10 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-10 text-center">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              No curriculum chapters matched “{searchState.query}” in the active track.
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Try resetting the track filter to All Tracks or searching for terms like Segment Trees, Mongoose, Closures, or Flexbox.
            </p>
            <button
              type="button"
              onClick={() => {
                setRawQuery('');
                setSearchState({ status: 'browsing', activeTrack: 'all' });
              }}
              className="mt-4 rounded-lg bg-[var(--accent-cyan)] px-4 py-2 text-xs font-semibold text-slate-950"
            >
              Reset Filter &amp; Query
            </button>
          </div>
        )}

        {/* Categorized Curriculum Grid */}
        <div className="mt-10 space-y-12">
          {visibleTracks.map((track) => (
            <div key={track.id} className="space-y-6">
              <div className="flex flex-col justify-between gap-2 border-b border-[var(--border-hairline)] pb-3 sm:flex-row sm:items-center">
                <div>
                  <h3
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
                    className="font-bold text-[var(--text-primary)]"
                  >
                    {track.label}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">{track.summary}</p>
                </div>
                <span className="shrink-0 self-start rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--accent-cyan)] sm:self-center">
                  {track.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {track.categories.map((category) => (
                  <article
                    key={category.id}
                    className="gpu-card rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-[var(--accent-indigo)]" />
                        <h4 className="text-sm font-bold text-[var(--text-primary)]">{category.title}</h4>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        {category.chapters.length} {category.chapters.length === 1 ? 'chapter' : 'chapters'}
                      </span>
                    </div>

                    <ul className="mt-4 space-y-2.5">
                      {category.chapters.map((chapter) => (
                        <li key={chapter.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedChapterId(chapter.id)}
                            className="group flex w-full items-start justify-between gap-3 rounded-lg border border-transparent bg-[var(--bg-surface)]/75 px-3 py-2.5 text-left transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
                          >
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-emerald)]" />
                              <div>
                                <div className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] sm:text-sm">
                                  {chapter.title}
                                </div>
                                <p className="mt-0.5 line-clamp-2 text-xs text-[var(--text-secondary)]">
                                  {chapter.overview}
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                              {chapter.complexityOrPattern}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Inspection Modal */}
      {selectedChapter && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chapter-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
          onClick={() => setSelectedChapterId(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
                  {selectedChapter.trackLabel} · {selectedChapter.categoryTitle}
                </span>
                <h3
                  id="chapter-modal-title"
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="mt-1 text-xl font-bold text-[var(--text-primary)]"
                >
                  {selectedChapter.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChapterId(null)}
                aria-label="Close chapter details"
                className="rounded-lg border border-[var(--border-hairline)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent-emerald)]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Architectural &amp; Complexity Signature: {selectedChapter.complexityOrPattern}</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {selectedChapter.overview}
              </p>
            </div>

            <div className="mt-4">
              <div className="font-mono text-[11px] font-semibold text-[var(--text-muted)]">INDEXED KEYWORDS</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedChapter.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 font-mono text-xs text-[var(--text-primary)]"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};