
import { ArrowUp, Github, Linkedin } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/marktrowa199", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/",
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-9">
      <div className="section-wrap">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Left side */}
          <div className="text-xs text-[var(--text-dim)]">
            <p>Built and designed by Niel Arthur B. Rocacurva.</p>
            <p className="mt-1">All rights reserved. © 2026.</p>
          </div>

          {/* Right side */}
          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[var(--text-muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--accent)] sm:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
