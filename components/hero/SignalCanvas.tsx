"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import SystemNode, { type SystemNodeIcon } from "./SystemNode";

interface Connection {
  id: string;
  label: string;
  icon: SystemNodeIcon;
  x: number;
  y: number;
  path: string;
  travelMs: number;
  pauseMs: number;
  phaseMs: number;
}

const HUB = { x: 220, y: 160 };

// Fixed circuit-board style layout: every satellite routes back to CORE through
// a right-angled trace. This is the structural backbone of the visualization —
// nothing here is randomly placed, unlike a generic particle field.
const CONNECTIONS: Connection[] = [
  { id: "api", label: "API", icon: "api", x: 86, y: 70, path: "M220,160 L86,160 L86,70", travelMs: 1100, pauseMs: 2600, phaseMs: 0 },
  { id: "database", label: "DATABASE", icon: "database", x: 354, y: 70, path: "M220,160 L354,160 L354,70", travelMs: 1200, pauseMs: 2200, phaseMs: 600 },
  { id: "code", label: "PYTHON", icon: "code", x: 86, y: 250, path: "M220,160 L86,160 L86,250", travelMs: 1300, pauseMs: 2400, phaseMs: 1200 },
  { id: "git", label: "GIT", icon: "git", x: 354, y: 250, path: "M220,160 L354,160 L354,250", travelMs: 1150, pauseMs: 2500, phaseMs: 1800 },
  { id: "deploy", label: "DEPLOY", icon: "deploy", x: 220, y: 268, path: "M220,160 L220,268", travelMs: 900, pauseMs: 3000, phaseMs: 2400 },
];

const STATUS_LINES = [
  "$ core --status ok",
  "$ sync: api <-> database",
  "$ build: python module linked",
  "$ git: working tree clean",
  "$ deploy: staging -> verified",
];

export default function SignalCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const packetRefs = useRef<Record<string, SVGCircleElement | null>>({});

  const [hovered, setHovered] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lineIndex, setLineIndex] = useState(0);
  const [lineVisible, setLineVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // Drives the small "data packets" along the fixed traces. Each connection has
  // its own travel/pause rhythm and phase offset so activity feels like an
  // engineered heartbeat rather than constant random motion.
  useEffect(() => {
    if (reducedMotion) return;
    let frameId: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;

      for (const conn of CONNECTIONS) {
        const path = pathRefs.current[conn.id];
        const packet = packetRefs.current[conn.id];
        if (!path || !packet) continue;

        const cycle = conn.travelMs + conn.pauseMs;
        const t = (elapsed + conn.phaseMs) % cycle;

        if (t < conn.travelMs) {
          const length = path.getTotalLength();
          const point = path.getPointAtLength((t / conn.travelMs) * length);
          packet.setAttribute("cx", String(point.x));
          packet.setAttribute("cy", String(point.y));
          packet.setAttribute("opacity", "1");
        } else {
          packet.setAttribute("opacity", "0");
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  // Rotating terminal-style status line at the base of the panel.
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setLineVisible(false);
      const fadeTimeout = setTimeout(() => {
        setLineIndex((i) => (i + 1) % STATUS_LINES.length);
        setLineVisible(true);
      }, 220);
      return () => clearTimeout(fadeTimeout);
    }, 3400);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Subtle, restrained tilt toward the cursor — the only "reacts to the mouse"
  // behavior, replacing the old node-repel particle interaction.
  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -3.5, y: px * 4.5 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      className="relative w-full h-full min-h-[360px] lg:min-h-[440px] flex items-center justify-center rounded-2xl overflow-hidden border border-navy-700/60 dark:border-navy-700/60 light:border-[#E2E6EC] bg-navy-800/40 dark:bg-navy-800/40 light:bg-white light:shadow-sm backdrop-blur-sm transition-colors"
    >
      {/* Header tag */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none text-[11px] font-mono text-slate-muted light:text-[#7B879C]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] border border-navy-700/50 light:border-[#E2E6EC]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan light:bg-[#0F766E] animate-pulse" />
          <span className="light:text-[#1E2530]">SYSTEM_ARCHITECTURE // LIVE</span>
        </div>
        <div className="hidden sm:block text-[10px] opacity-75">MODULES: 5 ONLINE</div>
      </div>

      <div
        className="w-full h-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <svg viewBox="0 0 440 320" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Traces */}
          {CONNECTIONS.map((conn) => (
            <path
              key={conn.id}
              ref={(el) => {
                pathRefs.current[conn.id] = el;
              }}
              d={conn.path}
              fill="none"
              strokeDasharray="3 4"
              strokeWidth={hovered === conn.id ? 1.6 : 1}
              className={`transition-all duration-200 ${
                hovered === conn.id ? "stroke-[var(--accent-cyan)]" : "stroke-[var(--border-card)]"
              }`}
            />
          ))}

          {/* Data packets traveling along traces */}
          {CONNECTIONS.map((conn) => (
            <circle
              key={`packet-${conn.id}`}
              ref={(el) => {
                packetRefs.current[conn.id] = el;
              }}
              r={2.6}
              className="fill-[var(--accent-blue)]"
              opacity={reducedMotion ? 0 : 1}
            />
          ))}

          {/* Hub breathing ring */}
          <circle
            cx={HUB.x}
            cy={HUB.y}
            r={44}
            strokeWidth={1}
            strokeOpacity={0.18}
            className="fill-none stroke-[var(--accent-cyan)]"
          >
            {!reducedMotion && (
              <animate attributeName="r" values="40;48;40" dur="4.5s" repeatCount="indefinite" />
            )}
          </circle>

          <SystemNode x={HUB.x} y={HUB.y} label="CORE" icon="core" hub reducedMotion={reducedMotion} />

          {CONNECTIONS.map((conn) => (
            <SystemNode
              key={`node-${conn.id}`}
              x={conn.x}
              y={conn.y}
              label={conn.label}
              icon={conn.icon}
              active={hovered === conn.id}
              reducedMotion={reducedMotion}
              compactLabel
              onEnter={() => setHovered(conn.id)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </svg>
      </div>

      {/* Rotating status line */}
      <div className="absolute bottom-3 left-3 right-24 pointer-events-none font-mono text-[10px] text-slate-dim light:text-[#7B879C] overflow-hidden whitespace-nowrap">
        <span className={`transition-opacity duration-200 ${lineVisible ? "opacity-100" : "opacity-0"}`}>
          {STATUS_LINES[lineIndex]}
        </span>
        <span className="text-cyan light:text-[#0F766E] animate-terminal-blink ml-0.5">_</span>
      </div>

      <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[10px] text-cyan dark:text-cyan light:text-[#0F766E] font-medium">
        {hovered ? hovered.toUpperCase() : "IDLE"}
      </div>
    </div>
  );
}
