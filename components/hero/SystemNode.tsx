"use client";

import type { ReactElement } from "react";

export type SystemNodeIcon = "core" | "api" | "database" | "code" | "git" | "deploy";

interface SystemNodeProps {
  x: number;
  y: number;
  label: string;
  icon: SystemNodeIcon;
  hub?: boolean;
  active?: boolean;
  reducedMotion?: boolean;
  /** Hide the text label below the `sm` breakpoint so small screens stay uncluttered. */
  compactLabel?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

// Small hand-drawn glyphs (16x16 local space) — deliberately schematic/blueprint
// style rather than literal brand logos, to keep the visual language original.
const ICONS: Record<SystemNodeIcon, ReactElement> = {
  core: (
    <g strokeWidth={1.4} fill="none">
      <rect x={2} y={2} width={12} height={12} rx={2.5} />
      <circle cx={5.5} cy={5.5} r={0.9} fill="currentColor" stroke="none" />
      <circle cx={10.5} cy={5.5} r={0.9} fill="currentColor" stroke="none" />
      <circle cx={5.5} cy={10.5} r={0.9} fill="currentColor" stroke="none" />
      <circle cx={10.5} cy={10.5} r={0.9} fill="currentColor" stroke="none" />
    </g>
  ),
  api: (
    <g strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5 H11 M11 5 L8.3 2.4 M11 5 L8.3 7.6" />
      <path d="M14 11 H5 M5 11 L7.7 8.4 M5 11 L7.7 13.6" />
    </g>
  ),
  database: (
    <g strokeWidth={1.4} fill="none" strokeLinecap="round">
      <ellipse cx={8} cy={3.6} rx={5.4} ry={1.8} />
      <path d="M2.6 3.6 V12.4 C2.6 13.4 5 14.2 8 14.2 C11 14.2 13.4 13.4 13.4 12.4 V3.6" />
      <path d="M2.6 8 C2.6 9 5 9.8 8 9.8 C11 9.8 13.4 9 13.4 8" />
    </g>
  ),
  code: (
    <g strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.4 3.4 L1.6 8 L5.4 12.6" />
      <path d="M10.6 3.4 L14.4 8 L10.6 12.6" />
      <path d="M9.2 2.4 L6.8 13.6" />
    </g>
  ),
  git: (
    <g strokeWidth={1.4} fill="none" strokeLinecap="round">
      <circle cx={4} cy={3.6} r={1.6} />
      <circle cx={4} cy={12.4} r={1.6} />
      <circle cx={12} cy={8} r={1.6} />
      <path d="M4 5.2 V10.8" />
      <path d="M4 8 H10.4" />
    </g>
  ),
  deploy: (
    <g strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14 V4" />
      <path d="M4.4 7.6 L8 4 L11.6 7.6" />
      <path d="M3 14 H13" />
    </g>
  ),
};

export default function SystemNode({
  x,
  y,
  label,
  icon,
  hub = false,
  active = false,
  reducedMotion = false,
  compactLabel = false,
  onEnter,
  onLeave,
}: SystemNodeProps) {
  const w = hub ? 108 : 82;
  const h = hub ? 50 : 38;
  const highlighted = active || hub;

  return (
    <g
      transform={`translate(${x - w / 2}, ${y - h / 2})`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="cursor-default"
    >
      <rect
        width={w}
        height={h}
        rx={hub ? 14 : 10}
        strokeWidth={hub ? 1.6 : 1.2}
        className={`fill-[var(--bg-card)] transition-colors duration-200 ${
          highlighted ? "stroke-[var(--accent-cyan)]" : "stroke-[var(--border-card)]"
        }`}
      />

      <g
        transform={`translate(${hub ? 14 : 10}, ${h / 2 - 8})`}
        stroke="currentColor"
        className={`transition-colors duration-200 ${
          highlighted ? "text-[var(--accent-cyan)]" : "text-[var(--text-dim)]"
        }`}
      >
        {ICONS[icon]}
      </g>

      <text
        x={hub ? 38 : 32}
        y={h / 2 + 4}
        className={`font-mono select-none transition-colors duration-200 ${
          hub ? "text-[11px] font-semibold" : "text-[9.5px]"
        } ${!hub && compactLabel ? "hidden sm:inline" : ""} ${
          highlighted ? "fill-[var(--text-heading)]" : "fill-[var(--text-muted)]"
        }`}
      >
        {label}
      </text>

      <circle
        cx={w - 8}
        cy={8}
        r={2}
        className={hub ? "fill-[var(--accent-cyan)]" : "fill-emerald-500"}
      >
        {!reducedMotion && (
          <animate
            attributeName="opacity"
            values="1;0.25;1"
            dur={`${2.4 + (Math.round(x) % 3)}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>
    </g>
  );
}
