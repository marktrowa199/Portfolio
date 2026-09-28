import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-7">
      <div className="section-wrap flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          <span className="brand-mark" aria-hidden="true">NA</span>
          <p className="font-medium text-[var(--text-heading)]">Niel Arthur B. Rocacurva</p>
        </div>
        
        <a href="#home" className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium text-[var(--text-muted)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--accent)] sm:self-auto">
          Back to top <ArrowUp aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
      <div className="section-wrap mt-6 border-t border-[var(--border)] pt-5 text-xs text-[var(--text-dim)]">
        <p>Built and designed by Niel Arthur B. Rocacurva.</p>
        <p className="mt-1">All rights reserved. © 2026.</p>
      </div>
    </footer>
  );
}
