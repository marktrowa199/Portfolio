"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "./ThemeToggle";
import { ArrowLeft, ArrowUpRight, FileText, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const resumeTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen && !resumeModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileMenuOpen, resumeModalOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const menuTrigger = menuTriggerRef.current;
    document.getElementById("mobile-navigation-dialog")?.querySelector<HTMLElement>("a, button")?.focus();
    return () => menuTrigger?.focus();
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!resumeModalOpen) return;
    document.getElementById("resume-dialog")?.querySelector<HTMLElement>("button, a")?.focus();
    return () => resumeTriggerRef.current?.focus();
  }, [resumeModalOpen]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setResumeModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const keepFocusInDialog = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.offsetParent !== null);
    if (elements.length === 0) return;
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openResume = (trigger: HTMLButtonElement | null) => {
    resumeTriggerRef.current = trigger;
    setMobileMenuOpen(false);
    setResumeModalOpen(true);
  };

  return (
    <header className={`site-navbar fixed inset-x-0 top-0 z-50 h-20 border-b transition-colors duration-200 ${isScrolled ? "is-scrolled border-[var(--border)] bg-[var(--bg-main)]" : "border-transparent bg-transparent"}`}>
      <div className="section-wrap flex h-full items-center justify-between gap-5">
        <a href="#home" className="group flex min-h-11 items-center gap-3 rounded-md" aria-label="Niel Arthur home">
          <span className="brand-mark" aria-hidden="true">NA</span>
          <span>
            <span className="block text-sm font-semibold tracking-wide text-[var(--text-heading)] group-hover:text-[var(--accent)]">Niel Arthur</span>
            <span className="block text-xs text-[var(--text-muted)]">Software · Data · IoT</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="rounded-sm py-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">{item.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={(event) => openResume(event.currentTarget)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-heading)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <FileText aria-hidden="true" className="h-4 w-4" /> Resume
          </button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button ref={menuTriggerRef} type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation-dialog" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--bg-raised)] text-[var(--text-heading)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
            {mobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && typeof document !== "undefined" && createPortal(
        <div role="dialog" aria-modal="true" aria-label="Mobile navigation" onKeyDown={keepFocusInDialog} className="fixed inset-0 z-[55] bg-black/40 lg:hidden">
          <div id="mobile-navigation-dialog" className="absolute inset-x-0 bottom-0 top-20 overflow-y-auto border-t border-[var(--border)] bg-[var(--bg-main)] p-6 text-[var(--text-main)]">
            <div className="flex min-h-full flex-col justify-between gap-8">
              <div>
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--border)] px-4 text-sm text-[var(--text-muted)] hover:text-[var(--accent)]">
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Close menu
                </button>
                <nav aria-label="Mobile navigation">
                  <ul className="divide-y divide-[var(--border)]">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <a href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex min-h-14 items-center justify-between text-xl font-medium text-[var(--text-heading)] hover:text-[var(--accent)]">
                          {item.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--text-dim)]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <button type="button" onClick={() => openResume(menuTriggerRef.current)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">
                <FileText aria-hidden="true" className="h-4 w-4" /> View resume
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {resumeModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-3 sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setResumeModalOpen(false); }}>
          <section role="dialog" id="resume-dialog" aria-modal="true" aria-labelledby="resume-modal-title" onKeyDown={keepFocusInDialog} className="flex h-[min(88vh,760px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-4 py-3 sm:px-5">
              <div>
                <h2 id="resume-modal-title" className="text-lg font-semibold">Resume</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">PDF preview</p>
              </div>
              <button type="button" onClick={() => setResumeModalOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--accent)]" aria-label="Close resume preview">
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 bg-white">
              <iframe src="/resume.pdf" title="Resume PDF preview" className="h-full w-full" />
            </div>
            <div className="flex flex-wrap justify-end gap-3 border-t border-[var(--border)] px-4 py-3 sm:px-5">
              <a href="/resume.pdf" download className="inline-flex min-h-11 items-center rounded-md border border-[var(--border)] px-4 text-sm text-[var(--text-heading)] hover:border-[var(--accent)] hover:text-[var(--accent)]">Download PDF</a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">Open in new tab</a>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </header>
  );
}
