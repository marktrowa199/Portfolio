"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Atom,
  Braces,
  Database,
  Feather,
  FlaskConical,
  Github,
  GitBranch,
  Server,
  Sparkles,
  Table2,
  Triangle,
  Type,
  Wind,
  X,
  Zap,
} from "lucide-react";

/**
 * Icon choice, honestly labelled:
 *  - `Github` is the real Lucide GitHub mark.
 *  - `Atom` (React), `Wind` (Tailwind), `Triangle` (Vercel), and `Feather` (Lucide's
 *    own name) are well-established stand-ins for brands Lucide does not ship a mark
 *    for. They are geometric hints, not official logos.
 *  - Anything without a defensible icon uses a text monogram instead of a wrong glyph.
 */
type Technology = {
  name: string;
  note: string;
  icon?: LucideIcon;
  monogram?: string;
  /** Featured tools stay in the compact section preview; the full list lives in the dialog. */
  featured?: boolean;
};

const technologies: Technology[] = [
  // The stack this portfolio itself is built with.
  { name: "Next.js", note: "App Router, server rendering, API routes", monogram: "N", featured: true },
  { name: "React", note: "Component state and effects", icon: Atom, featured: true },
  { name: "TypeScript", note: "Typed components and API handlers", icon: Braces, featured: true },
  { name: "Tailwind CSS", note: "Utility-first styling and responsive layout", icon: Wind, featured: true },
  { name: "Lucide React", note: "Icon set used across the interface", icon: Feather },
  { name: "Google Fonts", note: "Poppins and JetBrains Mono", icon: Type },
  { name: "Git", note: "Branching and a readable project history", icon: GitBranch },
  { name: "GitHub", note: "Repositories and contribution activity", icon: Github },
  { name: "Vercel", note: "Deployment and preview builds", icon: Triangle },

  // Carried over from the project work.
  { name: "Python", note: "Backend services, scripting, and data work", monogram: "Py", featured: true },
  { name: "FastAPI", note: "Typed REST APIs for JobUp", icon: Zap, featured: true },
  { name: "Flask", note: "Lightweight Python web applications", icon: FlaskConical },
  { name: "OpenAI API", note: "Prompting and model calls in an app", icon: Sparkles },
  { name: "SQL", note: "Relational querying, joins, and reporting", icon: Table2 },
  { name: "PostgreSQL", note: "Relational hosting and query design", icon: Database },
  { name: "MySQL", note: "Database administration", icon: Server },
];

const featuredTechnologies = technologies.filter((technology) => technology.featured);

function TechCard({ technology }: { technology: Technology }) {
  const Icon = technology.icon;

  return (
    <li className="tech-card">
      <span className="tech-card__head">
        <span className="tech-card__icon" aria-hidden="true">
          {Icon ? <Icon className="h-[1.15rem] w-[1.15rem]" /> : <span className="tech-card__monogram">{technology.monogram}</span>}
        </span>
        <span className="tech-card__name">{technology.name}</span>
      </span>
      <span className="tech-card__note">{technology.note}</span>
    </li>
  );
}

export default function TechnologyCarousel() {
  // Manual pause, for touch users and keyboard users who cannot hover. Hover and
  // focus pause are handled in CSS so they cost no state.
  const [held, setHeld] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const catalogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = catalogRef.current;
    if (showAll && dialog && !dialog.open) dialog.showModal();
  }, [showAll]);

  const closeCatalog = () => catalogRef.current?.close();

  return (
    <section id="skills" data-scroll-reveal className="section-space scroll-mt-20">
      <div className="section-wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 className="section-title mt-3">A toolkit shaped by what I’ve built.</h2>
          </div>
          <p className="section-intro">
            The technologies behind this portfolio and my projects.
          </p>
        </div>

        <div className={`tech-marquee${held ? " tech-marquee--held" : ""}`}>
          <div className="tech-marquee__track">
            <ul className="tech-marquee__group">
              {featuredTechnologies.map((technology) => (
                <TechCard key={technology.name} technology={technology} />
              ))}
            </ul>
            {/* Duplicate group. aria-hidden stops screen readers announcing every
                technology twice; the -50% keyframe step lands exactly one group
                width across, so the loop has no visible seam. */}
            <ul className="tech-marquee__group" aria-hidden="true">
              {featuredTechnologies.map((technology) => (
                <TechCard key={technology.name} technology={technology} />
              ))}
            </ul>
          </div>
        </div>

        <div className="tech-marquee__controls">
          <button
            type="button"
            className="tech-marquee__toggle"
            onClick={() => setHeld((previous) => !previous)}
            aria-pressed={held}
          >
            {held ? "Resume motion" : "Pause motion"}
          </button>
          <p className="tech-marquee__hint">
            Showing {featuredTechnologies.length} core tools of {technologies.length}. Motion respects your reduced-motion setting.
          </p>
          <button type="button" className="view-all-button" onClick={() => setShowAll(true)}>
            View all technologies <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      {showAll && (
        <dialog
          className="catalog-dialog"
          ref={catalogRef}
          aria-labelledby="technology-catalog-title"
          onClose={() => setShowAll(false)}
          onClick={(event) => { if (event.target === event.currentTarget) closeCatalog(); }}
        >
          <div className="catalog-dialog__header">
            <div className="min-w-0">
              <p className="catalog-dialog__eyebrow">Skills</p>
              <h3 id="technology-catalog-title" className="catalog-dialog__title">All technologies</h3>
              <p className="catalog-dialog__meta">The complete toolkit behind this portfolio and my projects.</p>
            </div>
            <button className="catalog-dialog__close" type="button" onClick={closeCatalog} aria-label="Close all technologies">
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="catalog-dialog__body">
            <ul className="tech-catalog-grid">
              {technologies.map((technology) => (
                <TechCard key={technology.name} technology={technology} />
              ))}
            </ul>
          </div>
        </dialog>
      )}
    </section>
  );
}
