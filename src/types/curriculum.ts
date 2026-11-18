export type TrackId = 'frontend' | 'javascript' | 'fullstack' | 'dsa';
export type TrackFilter = 'all' | TrackId;
export type CategoryId = string & { readonly __brand: 'CategoryId' };
export type ChapterId = string & { readonly __brand: 'ChapterId' };
export type GraphNodeId = string & { readonly __brand: 'GraphNodeId' };

export const asCategoryId = (value: string): CategoryId => value as CategoryId;
export const asChapterId = (value: string): ChapterId => value as ChapterId;
export const asGraphNodeId = (value: string): GraphNodeId => value as GraphNodeId;

export interface CurriculumChapter {
  readonly id: ChapterId;
  readonly trackId: TrackId;
  readonly trackLabel: string;
  readonly categoryId: CategoryId;
  readonly categoryTitle: string;
  readonly title: string;
  readonly overview: string;
  readonly complexityOrPattern: string;
  readonly keywords: readonly string[];
}

export interface CurriculumCategory {
  readonly id: CategoryId;
  readonly trackId: TrackId;
  readonly title: string;
  readonly chapters: readonly CurriculumChapter[];
}

export interface CurriculumTrack {
  readonly id: TrackId;
  readonly label: string;
  readonly shortLabel: string;
  readonly badge: string;
  readonly summary: string;
  readonly categories: readonly CurriculumCategory[];
}

export interface ArchitectureBlueprint {
  readonly id: string;
  readonly title: string;
  readonly badge: string;
  readonly domain: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly algorithmicHighlights: readonly string[];
  readonly layers: readonly {
    readonly name: string;
    readonly responsibility: string;
    readonly contract: string;
  }[];
}

export interface ComplexityCurve {
  readonly id: string;
  readonly notation: string;
  readonly name: string;
  readonly colorToken: string;
  readonly curriculumExamples: readonly string[];
  readonly evaluate: (n: number) => number;
}

/* Exhaustive Discriminated Union FSMs */
export type SearchState =
  | { readonly status: 'browsing'; readonly activeTrack: TrackFilter }
  | {
      readonly status: 'searching';
      readonly activeTrack: TrackFilter;
      readonly query: string;
      readonly matchedIds: ReadonlySet<ChapterId>;
      readonly executionMicros: number;
    }
  | {
      readonly status: 'empty';
      readonly activeTrack: TrackFilter;
      readonly query: string;
      readonly executionMicros: number;
    };

export type GraphAlgorithmMode = 'DIJKSTRA' | 'BFS';

export type GraphSimState =
  | { readonly phase: 'idle'; readonly sourceId: GraphNodeId; readonly targetId: GraphNodeId }
  | {
      readonly phase: 'traversing';
      readonly mode: GraphAlgorithmMode;
      readonly sourceId: GraphNodeId;
      readonly targetId: GraphNodeId;
      readonly visitedOrder: readonly GraphNodeId[];
      readonly shortestPath: readonly GraphNodeId[];
      readonly totalCost: number;
      readonly stepIndex: number;
    }
  | {
      readonly phase: 'converged';
      readonly mode: GraphAlgorithmMode;
      readonly sourceId: GraphNodeId;
      readonly targetId: GraphNodeId;
      readonly visitedOrder: readonly GraphNodeId[];
      readonly shortestPath: readonly GraphNodeId[];
      readonly totalCost: number;
    };

export type ContactDispatchState =
  | { readonly status: 'editing' }
  | { readonly status: 'validation_error'; readonly errors: Readonly<Record<string, string>> }
  | { readonly status: 'dispatched'; readonly formattedBrief: string; readonly copied: boolean };