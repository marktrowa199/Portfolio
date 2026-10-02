"use client";

import { useState } from "react";
import { Check, Copy, FileText, Github, Linkedin, MapPin } from "lucide-react";

const email = "arthurnielzz@gmail.com";
const phones = [
  { label: "(+63) 946-417-9851", href: "tel:+639464179851" },
  { label: "(+63) 993-706-1214", href: "tel:+639937061214" },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (kind: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
    } catch {
      setCopied(`${kind}-error`);
    }
    window.setTimeout(() => setCopied(null), 2500);
  };

  return (
    <section id="contact" data-scroll-reveal className="section-space scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="section-wrap">
        <p className="eyebrow">07 · Contact</p>
        <h2 className="section-title mt-4">Let’s talk about the work.</h2>
        <p className="section-intro mt-5">Interested in working together, discussing an opportunity, or simply want to connect? You can reach me through the contact details below.</p>

        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <h3 className="contact-detail-label">Email</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <a href={`mailto:${email}`} className="break-all text-lg font-medium text-[var(--text-heading)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--accent)] sm:text-xl">{email}</a>
              <button type="button" onClick={() => copy("email", email)} className="contact-copy-button" aria-label={copied === "email" ? "Email copied" : copied === "email-error" ? "Email copy unavailable" : "Copy email address"}>
                {copied === "email" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                {copied === "email" ? "Copied" : copied === "email-error" ? "Copy unavailable" : "Copy"}
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="contact-detail-label">Phone</h3>
            <ul className="mt-2 flex flex-col items-start gap-3">
              {phones.map((phone, index) => {
                const kind = `phone-${index}`;
                return (
                  <li key={phone.href} className="flex flex-wrap items-center gap-3">
                    <a href={phone.href} className="text-lg font-medium text-[var(--text-heading)] hover:text-[var(--accent)] sm:text-xl">{phone.label}</a>
                    <button type="button" onClick={() => copy(kind, phone.label)} className="contact-copy-button" aria-label={copied === kind ? "Phone number copied" : copied === `${kind}-error` ? "Phone copy unavailable" : "Copy phone number"}>
                      {copied === kind ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                      {copied === kind ? "Copied" : copied === `${kind}-error` ? "Copy unavailable" : "Copy"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--border)] pt-6">
          <a href="/resume.pdf" download className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">
            <FileText aria-hidden="true" className="h-4 w-4" /> Download resume
          </a>
          <a href="https://github.com/marktrowa199" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub profile (opens in a new tab)">
            <Github aria-hidden="true" className="h-5 w-5" /> <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn profile (opens in a new tab)">
            <Linkedin aria-hidden="true" className="h-5 w-5" /> <span>LinkedIn</span>
          </a>
        </div>
        <p className="mt-5 flex items-center gap-2 text-sm text-[var(--text-dim)]"><MapPin aria-hidden="true" className="h-4 w-4" /> Based in San Jose Del Monte Bulacan, Philippines</p>
      </div>
    </section>
  );
}