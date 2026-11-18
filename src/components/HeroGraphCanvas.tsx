import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Cpu, GitBranch, Play, Sparkles } from 'lucide-react';
import {
  solveShortestPath,
  SYSTEM_EDGES,
  SYSTEM_NODES
} from '../algorithms/graphEngine';
import {
  asGraphNodeId,
  type GraphAlgorithmMode,
  type GraphNodeId,
  type GraphSimState
} from '../types/curriculum';

export const HeroGraphCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<GraphAlgorithmMode>('DIJKSTRA');
  const [simState, setSimState] = useState<GraphSimState>(() => {
    const sourceId = asGraphNodeId('edge-cdn');
    const targetId = asGraphNodeId('mongo-odm');
    const solution = solveShortestPath('DIJKSTRA', sourceId, targetId);
    return {
      phase: 'traversing',
      mode: 'DIJKSTRA',
      sourceId,
      targetId,
      visitedOrder: solution.visitedOrder,
      shortestPath: solution.shortestPath,
      totalCost: solution.totalCost,
      stepIndex: 0
    };
  });

  const triggerTraversal = (nextMode: GraphAlgorithmMode, targetId: GraphNodeId): void => {
    const sourceId = asGraphNodeId('edge-cdn');
    const solution = solveShortestPath(nextMode, sourceId, targetId);
    setSimState({
      phase: 'traversing',
      mode: nextMode,
      sourceId,
      targetId,
      visitedOrder: solution.visitedOrder,
      shortestPath: solution.shortestPath,
      totalCost: solution.totalCost,
      stepIndex: 0
    });
  };

  // Step-by-step traversal progression
  useEffect(() => {
    if (simState.phase !== 'traversing') return;

    const timer = window.setInterval(() => {
      setSimState((prev) => {
        if (prev.phase !== 'traversing') return prev;
        if (prev.stepIndex + 1 >= prev.visitedOrder.length) {
          return {
            phase: 'converged',
            mode: prev.mode,
            sourceId: prev.sourceId,
            targetId: prev.targetId,
            visitedOrder: prev.visitedOrder,
            shortestPath: prev.shortestPath,
            totalCost: prev.totalCost
          };
        }
        return { ...prev, stepIndex: prev.stepIndex + 1 };
      });
    }, 340);

    return () => window.clearInterval(timer);
  }, [simState]);

  // 120fps DPR-capped HTML5 Canvas renderer with IntersectionObserver & reduced-motion support
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isVisible = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const render = (timeMs: number): void => {
      if (!isVisible || document.visibilityState !== 'visible') {
        if (!reducedMotion) {
          rafId = window.requestAnimationFrame(render);
        }
        return;
      }

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(300, Math.floor(rect.width * dpr));
      const targetH = Math.max(260, Math.floor(rect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');
      const edgeBase = isDark ? 'rgba(148, 163, 184, 0.22)' : 'rgba(71, 85, 105, 0.24)';
      const cyanColor = isDark ? '#38bdf8' : '#0284c7';
      const emeraldColor = isDark ? '#34d399' : '#059669';
      const nodeFill = isDark ? '#161b26' : '#ffffff';
      const textMain = isDark ? '#f8fafc' : '#0f172a';
      const textSub = isDark ? '#94a3b8' : '#475569';

      const activeVisited =
        simState.phase === 'idle'
          ? new Set<GraphNodeId>()
          : simState.phase === 'traversing'
            ? new Set(simState.visitedOrder.slice(0, simState.stepIndex + 1))
            : new Set(simState.visitedOrder);

      const activeShortest =
        simState.phase === 'converged' ? simState.shortestPath : ([] as readonly GraphNodeId[]);

      const isEdgeOnShortest = (a: GraphNodeId, b: GraphNodeId): boolean => {
        for (let i = 0; i < activeShortest.length - 1; i += 1) {
          const u = activeShortest[i];
          const v = activeShortest[i + 1];
          if ((u === a && v === b) || (u === b && v === a)) return true;
        }
        return false;
      };

      const nodeMap = new Map(SYSTEM_NODES.map((n) => [n.id, n]));

      // Draw weighted edges
      for (const edge of SYSTEM_EDGES) {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);
        if (!fromNode || !toNode) continue;

        const x1 = fromNode.nx * w;
        const y1 = fromNode.ny * h;
        const x2 = toNode.nx * w;
        const y2 = toNode.ny * h;

        const highlighted = isEdgeOnShortest(edge.from, edge.to);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = highlighted ? emeraldColor : edgeBase;
        ctx.lineWidth = highlighted ? 2.6 : 1.25;
        ctx.stroke();

        // Edge weight badge
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(248, 250, 252, 0.92)';
        ctx.beginPath();
        ctx.arc(mx, my, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = highlighted ? emeraldColor : textSub;
        ctx.font = '600 10px ui-monospace, SFMono-Regular, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(edge.weight), mx, my);
      }

      // Draw animated pulse packet along converged shortest path
      if (!reducedMotion && activeShortest.length > 1) {
        const segmentCount = activeShortest.length - 1;
        const progress = ((timeMs / 1600) % 1) * segmentCount;
        const segIdx = Math.min(segmentCount - 1, Math.floor(progress));
        const localT = progress - segIdx;
        const uId = activeShortest[segIdx];
        const vId = activeShortest[segIdx + 1];
        const uNode = uId ? nodeMap.get(uId) : undefined;
        const vNode = vId ? nodeMap.get(vId) : undefined;
        if (uNode && vNode) {
          const px = (uNode.nx + (vNode.nx - uNode.nx) * localT) * w;
          const py = (uNode.ny + (vNode.ny - uNode.ny) * localT) * h;
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = emeraldColor;
          ctx.fill();
        }
      }

      // Draw system architecture nodes
      for (const node of SYSTEM_NODES) {
        const cx = node.nx * w;
        const cy = node.ny * h;
        const isVisited = activeVisited.has(node.id);
        const isInShortest = activeShortest.includes(node.id);
        const isTarget = simState.targetId === node.id;

        if (isInShortest || isVisited) {
          ctx.beginPath();
          ctx.arc(cx, cy, isTarget ? 22 : 19, 0, Math.PI * 2);
          ctx.fillStyle = isInShortest ? 'rgba(52, 211, 153, 0.16)' : 'rgba(56, 189, 248, 0.14)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, 13, 0, Math.PI * 2);
        ctx.fillStyle = nodeFill;
        ctx.fill();
        ctx.lineWidth = isInShortest ? 2.4 : isVisited ? 2 : 1.4;
        ctx.strokeStyle = isInShortest ? emeraldColor : isVisited ? cyanColor : edgeBase;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = isInShortest ? emeraldColor : isVisited ? cyanColor : textSub;
        ctx.fill();

        // Labels
        ctx.fillStyle = textMain;
        ctx.font = '600 11px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, cx, cy + 25);

        ctx.fillStyle = textSub;
        ctx.font = '500 9.5px ui-monospace, SFMono-Regular, monospace';
        ctx.fillText(node.layer, cx, cy + 37);
      }

      ctx.restore();

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      render(0);
    } else {
      rafId = window.requestAnimationFrame(render);
    }

    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [simState]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    for (const node of SYSTEM_NODES) {
      const nx = node.nx * rect.width;
      const ny = node.ny * rect.height;
      const distance = Math.hypot(clickX - nx, clickY - ny);
      if (distance <= 28 && node.id !== asGraphNodeId('edge-cdn')) {
        triggerTraversal(mode, node.id);
        break;
      }
    }
  };

  const activeCost = simState.phase === 'idle' ? 0 : simState.totalCost;
  const activeStep =
    simState.phase === 'traversing'
      ? `${simState.stepIndex + 1}/${simState.visitedOrder.length} nodes`
      : simState.phase === 'converged'
        ? `Converged (${simState.shortestPath.length} hops)`
        : 'Ready';

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="architectural-grid relative overflow-hidden border-b border-[var(--border-hairline)] pt-12 pb-16 sm:pt-16 sm:pb-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
        {/* Left Editorial & Engineering Column */}
        <div className="lg:col-span-6">
          <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
            <span>Apna College Sigma Batch · MERN Stack &amp; Java DSA</span>
          </div>

          <h1
            id="hero-heading"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-hero)' }}
            className="font-bold tracking-tight text-[var(--text-primary)] leading-[1.06]"
          >
            Engineering Full-Stack Systems &amp;{' '}
            <span className="text-[var(--accent-cyan)]">Algorithmic</span> Precision.
          </h1>

          <p
            style={{ fontSize: 'var(--text-body)' }}
            className="mt-5 max-w-xl leading-relaxed text-[var(--text-secondary)]"
          >
            I’m <strong>Basant Koiri</strong>, a Full-Stack MERN Developer, Java Data Structures &amp; Algorithms
            practitioner, and BIT scholar at Bhairahawa Multiple Campus (Tribhuvan University IOST). I build
            resilient Express/SQL/MongoDB backends, 120fps React interfaces, and sub-linear algorithmic engines.
          </p>

          {/* Bhagavad Gita Epigraph from Sigma Batch Curriculum */}
          <blockquote className="mt-6 border-l-2 border-[var(--accent-cyan)] bg-[var(--bg-surface)]/80 px-4 py-3 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            <p className="italic">
              “Let not the fruit of action be your motive to action. Your concern is with action alone, not with the
              fruit of action.”
            </p>
            <footer className="mt-1 font-mono text-[11px] font-semibold text-[var(--text-muted)]">
              — The Bhagavad Gita · Sigma Batch Engineering Ethos
            </footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-cyan)] px-5 py-2.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2"
            >
              <span>Explore 60+ Curriculum Modules</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-cyan)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]"
            >
              <GitBranch className="h-4 w-4 text-[var(--accent-cyan)]" />
              <span>Hire / Collaborate</span>
            </a>
          </div>
        </div>

        {/* Right Interactive Graph Shortest-Path Visualizer */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[var(--accent-cyan)]" />
                <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                  Live Graph Router · Click Any Node
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {(['DIJKSTRA', 'BFS'] as const).map((algo) => (
                  <button
                    key={algo}
                    type="button"
                    onClick={() => {
                      setMode(algo);
                      triggerTraversal(
                        algo,
                        simState.phase === 'idle' ? asGraphNodeId('mongo-odm') : simState.targetId
                      );
                    }}
                    className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold transition-colors ${
                      mode === algo
                        ? 'bg-[var(--accent-cyan)] text-slate-950'
                        : 'border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {algo}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    triggerTraversal(
                      mode,
                      simState.phase === 'idle' ? asGraphNodeId('mongo-odm') : simState.targetId
                    )
                  }
                  aria-label="Replay graph traversal"
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <Play className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div ref={containerRef} className="relative h-[320px] w-full sm:h-[350px]">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                aria-label="Interactive weighted system architecture graph running Dijkstra and BFS shortest-path algorithms"
                className="block h-full w-full cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 font-mono text-[11px] text-[var(--text-secondary)]">
              <span>
                Source: <strong className="text-[var(--text-primary)]">Cloudflare Edge</strong> → Target:{' '}
                <strong className="text-[var(--accent-emerald)]">
                  {simState.phase === 'idle' ? 'mongo-odm' : simState.targetId}
                </strong>
              </span>
              <span>
                Status: <strong className="text-[var(--text-primary)]">{activeStep}</strong> · Cost:{' '}
                <strong className="text-[var(--accent-cyan)]">{activeCost}ms</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};