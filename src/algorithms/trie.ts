import type { ChapterId, CurriculumChapter } from '../types/curriculum';

class TrieNode {
  public readonly children = new Map<string, TrieNode>();
  public readonly chapterIds = new Set<ChapterId>();
}

export interface TrieSearchResult {
  readonly matchedIds: ReadonlySet<ChapterId>;
  readonly executionMicros: number;
}

/**
 * PrefixTrie engineered from Basant's Sigma DSA Trie curriculum:
 * - Insert: O(L) per token
 * - Prefix Search: O(m + k) where m = query token length, k = matched chapters
 */
export class CurriculumPrefixTrie {
  private readonly root = new TrieNode();
  private readonly allIds = new Set<ChapterId>();

  public constructor(chapters: readonly CurriculumChapter[]) {
    for (const chapter of chapters) {
      this.allIds.add(chapter.id);
      const rawTerms = [
        chapter.title,
        chapter.categoryTitle,
        chapter.trackLabel,
        chapter.complexityOrPattern,
        ...chapter.keywords
      ];

      for (const term of rawTerms) {
        const tokens = term
          .toLowerCase()
          .split(/[^a-z0-9+#]+/)
          .filter((token) => token.length > 0);

        for (const token of tokens) {
          this.insertToken(token, chapter.id);
        }
      }
    }
  }

  private insertToken(token: string, chapterId: ChapterId): void {
    let current = this.root;
    current.chapterIds.add(chapterId);

    for (const char of token) {
      let next = current.children.get(char);
      if (!next) {
        next = new TrieNode();
        current.children.set(char, next);
      }
      next.chapterIds.add(chapterId);
      current = next;
    }
  }

  private lookupSinglePrefix(prefix: string): ReadonlySet<ChapterId> {
    let current: TrieNode | undefined = this.root;
    for (const char of prefix) {
      current = current.children.get(char);
      if (!current) {
        return new Set<ChapterId>();
      }
    }
    return current.chapterIds;
  }

  public search(rawQuery: string): TrieSearchResult {
    const start = performance.now();
    const tokens = rawQuery
      .trim()
      .toLowerCase()
      .split(/[^a-z0-9+#]+/)
      .filter((token) => token.length > 0);

    if (tokens.length === 0) {
      const end = performance.now();
      return {
        matchedIds: this.allIds,
        executionMicros: Math.max(1, Math.round((end - start) * 1000))
      };
    }

    const firstToken = tokens[0];
    if (!firstToken) {
      return { matchedIds: this.allIds, executionMicros: 1 };
    }

    let intersection = new Set<ChapterId>(this.lookupSinglePrefix(firstToken));

    for (let i = 1; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (!token) continue;
      const matchesForToken = this.lookupSinglePrefix(token);
      for (const id of intersection) {
        if (!matchesForToken.has(id)) {
          intersection.delete(id);
        }
      }
      if (intersection.size === 0) break;
    }

    const end = performance.now();
    return {
      matchedIds: intersection,
      executionMicros: Math.max(1, Math.round((end - start) * 1000))
    };
  }
}