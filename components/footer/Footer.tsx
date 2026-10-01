import { ArrowUp, Github, Linkedin } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/marktrowa199", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-9">
      <div className="section-wrap flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <span className="brand-mark" aria-hidden="true">NA</span>
            <p className="font-medium text-[var(--text-heading)]">Niel Arthur B. Rocacurva</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
            Aspiring Software Developer / IT Professional working across software development, AI,
            data analytics, and IT operations.
          </p>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-12">
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold tracking-[.08em] text-[var(--text-dim)] uppercase">Elsewhere</h2>
            <ul className="mt-3 flex gap-5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" /> {label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#home" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[var(--text-muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--accent)] sm:self-auto">
            Back to top <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="section-wrap mt-8 border-t border-[var(--border)] pt-5 text-xs text-[var(--text-dim)]">
        <p>Built and designed by Niel Arthur B. Rocacurva.</p>
        <p className="mt-1">All rights reserved. © 2026.</p>
      </div>
    </footer>
  );
}
