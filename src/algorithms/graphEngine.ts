import { asGraphNodeId, type GraphAlgorithmMode, type GraphNodeId } from '../types/curriculum';

export interface SystemGraphNode {
  readonly id: GraphNodeId;
  readonly label: string;
  readonly layer: string;
  readonly nx: number; // Normalized [0..1] X coordinate
  readonly ny: number; // Normalized [0..1] Y coordinate
}

export interface SystemGraphEdge {
  readonly from: GraphNodeId;
  readonly to: GraphNodeId;
  readonly weight: number;
}

export interface PathfindingSolution {
  readonly visitedOrder: readonly GraphNodeId[];
  readonly shortestPath: readonly GraphNodeId[];
  readonly totalCost: number;
}

export const SYSTEM_NODES: readonly SystemGraphNode[] = [
  { id: asGraphNodeId('edge-cdn'), label: 'Cloudflare Edge', layer: 'CDN / DNS', nx: 0.12, ny: 0.5 },
  { id: asGraphNodeId('react-ui'), label: 'React 19 UI', layer: 'Frontend', nx: 0.32, ny: 0.22 },
  { id: asGraphNodeId('trie-idx'), label: 'Prefix Trie', layer: 'O(m+k) Search', nx: 0.34, ny: 0.78 },
  { id: asGraphNodeId('express-mvc'), label: 'Express MVC', layer: 'Middleware', nx: 0.58, ny: 0.34 },
  { id: asGraphNodeId('java-dsa'), label: 'Java DSA Core', layer: 'DP & Graphs', nx: 0.6, ny: 0.74 },
  { id: asGraphNodeId('sql-db'), label: 'SQL Engine', layer: 'ACID Store', nx: 0.86, ny: 0.24 },
  { id: asGraphNodeId('mongo-odm'), label: 'MongoDB ODM', layer: 'Mongoose', nx: 0.86, ny: 0.68 }
];

export const SYSTEM_EDGES: readonly SystemGraphEdge[] = [
  { from: asGraphNodeId('edge-cdn'), to: asGraphNodeId('react-ui'), weight: 2 },
  { from: asGraphNodeId('edge-cdn'), to: asGraphNodeId('trie-idx'), weight: 3 },
  { from: asGraphNodeId('react-ui'), to: asGraphNodeId('trie-idx'), weight: 2 },
  { from: asGraphNodeId('react-ui'), to: asGraphNodeId('express-mvc'), weight: 4 },
  { from: asGraphNodeId('trie-idx'), to: asGraphNodeId('java-dsa'), weight: 3 },
  { from: asGraphNodeId('express-mvc'), to: asGraphNodeId('java-dsa'), weight: 2 },
  { from: asGraphNodeId('express-mvc'), to: asGraphNodeId('sql-db'), weight: 5 },
  { from: asGraphNodeId('express-mvc'), to: asGraphNodeId('mongo-odm'), weight: 4 },
  { from: asGraphNodeId('java-dsa'), to: asGraphNodeId('mongo-odm'), weight: 3 },
  { from: asGraphNodeId('sql-db'), to: asGraphNodeId('mongo-odm'), weight: 4 }
];

const buildAdjacency = (): ReadonlyMap<GraphNodeId, readonly { to: GraphNodeId; weight: number }[]> => {
  const adj = new Map<GraphNodeId, { to: GraphNodeId; weight: number }[]>();
  for (const node of SYSTEM_NODES) {
    adj.set(node.id, []);
  }
  for (const edge of SYSTEM_EDGES) {
    adj.get(edge.from)?.push({ to: edge.to, weight: edge.weight });
    adj.get(edge.to)?.push({ to: edge.from, weight: edge.weight });
  }
  return adj;
};

const ADJACENCY = buildAdjacency();

export const solveShortestPath = (
  mode: GraphAlgorithmMode,
  sourceId: GraphNodeId,
  targetId: GraphNodeId
): PathfindingSolution => {
  const distances = new Map<GraphNodeId, number>();
  const previous = new Map<GraphNodeId, GraphNodeId | null>();
  const visited = new Set<GraphNodeId>();
  const visitedOrder: GraphNodeId[] = [];

  for (const node of SYSTEM_NODES) {
    distances.set(node.id, Number.POSITIVE_INFINITY);
    previous.set(node.id, null);
  }
  distances.set(sourceId, 0);

  if (mode === 'BFS') {
    const queue: GraphNodeId[] = [sourceId];
    visited.add(sourceId);

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) break;
      visitedOrder.push(current);
      if (current === targetId) break;

      const neighbors = ADJACENCY.get(current) ?? [];
      const currentDist = distances.get(current) ?? 0;

      for (const edge of neighbors) {
        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          distances.set(edge.to, currentDist + edge.weight);
          previous.set(edge.to, current);
          queue.push(edge.to);
        }
      }
    }
  } else {
    // Dijkstra's Shortest-Path Algorithm
    while (visited.size < SYSTEM_NODES.length) {
      let closestNode: GraphNodeId | null = null;
      let smallestDist = Number.POSITIVE_INFINITY;

      for (const [nodeId, dist] of distances.entries()) {
        if (!visited.has(nodeId) && dist < smallestDist) {
          smallestDist = dist;
          closestNode = nodeId;
        }
      }

      if (!closestNode || smallestDist === Number.POSITIVE_INFINITY) break;

      visited.add(closestNode);
      visitedOrder.push(closestNode);
      if (closestNode === targetId) break;

      const neighbors = ADJACENCY.get(closestNode) ?? [];
      for (const edge of neighbors) {
        if (visited.has(edge.to)) continue;
        const candidate = smallestDist + edge.weight;
        const existing = distances.get(edge.to) ?? Number.POSITIVE_INFINITY;
        if (candidate < existing) {
          distances.set(edge.to, candidate);
          previous.set(edge.to, closestNode);
        }
      }
    }
  }

  const shortestPath: GraphNodeId[] = [];
  let cursor: GraphNodeId | null = targetId;
  while (cursor) {
    shortestPath.unshift(cursor);
    cursor = previous.get(cursor) ?? null;
  }

  const resolvedCost = distances.get(targetId);
  return {
    visitedOrder,
    shortestPath: shortestPath[0] === sourceId ? shortestPath : [sourceId],
    totalCost: resolvedCost !== undefined && Number.isFinite(resolvedCost) ? resolvedCost : 0
  };
};