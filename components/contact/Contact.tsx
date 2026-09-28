"use client";

import { useState } from "react";
import { Check, Copy, FileText, Github, Linkedin, MapPin } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const email = "arthurnielzz@gmail.com";
  const phone = "(+63) 946-417-9851";

  const copy = async (kind: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
    } catch {
      setCopied(`${kind}-error`);
    }
    window.setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section id="contact" className="section-space scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="section-wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="section-title">Let’s talk about the work.</h2>
          <p className="section-intro mt-5">I’m looking for Associate Software Engineer and Junior Software Engineer opportunities. Open to remote, on-site, or hybrid roles.</p>
        </div>
        <div className="space-y-7">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[.08em] text-[var(--text-dim)]">Email</h3>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href={`mailto:${email}`} className="break-all text-lg font-medium text-[var(--text-heading)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--accent)] sm:text-xl">{email}</a>
              <button type="button" onClick={() => copy("email", email)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]" aria-label={copied === "email" ? "Email copied" : copied === "email-error" ? "Email copy unavailable" : "Copy email address"}>
                {copied === "email" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {copied === "email" ? "Copied" : copied === "email-error" ? "Copy unavailable" : "Copy"}
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[.08em] text-[var(--text-dim)]">Phone</h3>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a href="tel:+639464179851" className="text-lg font-medium text-[var(--text-heading)] hover:text-[var(--accent)] sm:text-xl">{phone}</a>
              <button type="button" onClick={() => copy("phone", phone)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]" aria-label={copied === "phone" ? "Phone number copied" : copied === "phone-error" ? "Phone copy unavailable" : "Copy phone number"}>
                {copied === "phone" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {copied === "phone" ? "Copied" : copied === "phone-error" ? "Copy unavailable" : "Copy"}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-4 border-t border-[var(--border)] pt-6">
            <a href="/resume.pdf" download className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">
              <FileText aria-hidden="true" className="h-4 w-4" /> Download resume
            </a>
            <a href="https://github.com/marktrowa199" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)]" aria-label="GitHub profile (opens in a new tab)">
              <Github aria-hidden="true" className="h-4 w-4" /> github.com/marktrowa199
            </a>
            <a href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)]" aria-label="LinkedIn profile (opens in a new tab)">
              <Linkedin aria-hidden="true" className="h-4 w-4" /> LinkedIn profile
            </a>
          </div>
          <p className="flex items-center gap-2 text-sm text-[var(--text-dim)]"><MapPin aria-hidden="true" className="h-4 w-4" /> Based in San Jose Del Monte Bulacan, Philippines</p>
        </div>
      </div>
    </section>
  );
}
