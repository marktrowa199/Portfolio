"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "./ThemeToggle";
import { ArrowLeft, Terminal, FileText, Menu, X, Radio } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about", number: "01" },
  { label: "Skills", href: "#skills", number: "02" },
  { label: "Process", href: "#work-process", number: "03" },
  { label: "Projects", href: "#projects", number: "04" },
  { label: "Journey", href: "#journey", number: "05" },
  { label: "Contact", href: "#contact", number: "06" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || resumeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen, resumeModalOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setResumeModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      className={`site-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "is-scrolled bg-[#0A192F]/90 dark:bg-[#0A192F]/90 light:bg-[#FBF8F2]/92 backdrop-blur-md border-b border-navy-700/60 dark:border-navy-700/60 light:border-[#DED5C8] shadow-lg shadow-black/10 light:shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Home"
          >
            <div className="w-8 h-8 rounded-lg border border-cyan/40 bg-navy-800/80 dark:bg-navy-800/80 light:bg-white light:border-[#E2E6EC] flex items-center justify-center text-cyan dark:text-cyan light:text-[#0F766E] group-hover:border-cyan transition-colors light:shadow-sm">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center font-mono text-sm font-semibold tracking-wider text-slate-lightest dark:text-slate-lightest light:text-[#111620] group-hover:text-cyan light:group-hover:text-[#0F766E] transition-colors">
                <span>ARTHUR.SYS</span>
                <span className="text-cyan light:text-[#0F766E] animate-terminal-blink ml-0.5">_</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-muted light:text-[#7B879C]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE // OPEN TO WORK</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            <ul className="flex items-center gap-6 text-xs font-mono">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group py-1 text-slate-light dark:text-slate-light light:text-[#525E72] hover:text-cyan dark:hover:text-cyan light:hover:text-[#0F766E] transition-colors font-medium"
                  >
                    <span className="text-cyan dark:text-cyan light:text-[#0F766E] mr-1 text-[10px] font-mono">
                      {item.number}.
                    </span>
                    <span className="font-sans text-sm tracking-wide">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block h-4 w-px bg-navy-700 dark:bg-navy-700 light:bg-[#E2E6EC]" />

          <div className="hidden md:flex items-center gap-3">
            {/* Resume Button */}
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border border-cyan/60 text-cyan dark:text-cyan light:text-[#0F766E] light:border-[#0F766E]/40 light:bg-[#E6F4F2]/60 hover:bg-cyan/10 dark:hover:bg-cyan/10 light:hover:bg-[#E6F4F2] transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume [PDF]</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              className={`p-2 rounded-xl border text-slate-lightest light:text-[#111620] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 ${
                mobileMenuOpen
                  ? "border-cyan bg-cyan/10 text-cyan light:border-[#0F766E] light:bg-[#E6F4F2] light:text-[#0F766E]"
                  : "border-navy-700 bg-navy-800/90 dark:border-navy-700 dark:bg-navy-800/90 light:border-[#E2E6EC] light:bg-white hover:text-cyan"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan light:text-[#0F766E]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-[55] md:hidden bg-[#020817]/40 backdrop-blur-sm">
          <div className="mobile-nav-panel absolute inset-x-0 top-[68px] bottom-0 overflow-y-auto bg-[var(--bg-main)] text-[var(--text-main)] backdrop-blur-xl border-t border-navy-700/60 light:border-[#DED5C8] p-6">
            <div className="flex min-h-full flex-col justify-between gap-8">
              <div className="space-y-6">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg border border-navy-700 px-3 py-2 font-mono text-xs text-slate-light hover:border-cyan hover:text-cyan light:border-[#DED5C8] light:bg-white light:text-[#3D3A35] light:hover:border-[#0F766E] light:hover:text-[#0F766E] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] font-mono text-xs text-[var(--text-muted)]">
                  <Radio className="w-3.5 h-3.5 text-cyan light:text-[#0F766E] animate-pulse" />
                  <span>NIEL ARTHUR // REMOTE | ON-SITE | HYBRID</span>
                </div>

                <ul className="space-y-4">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg-card-hover)] transition-colors"
                      >
                        <span className="font-heading text-lg font-semibold text-[var(--text-heading)]">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-cyan dark:text-cyan light:text-[#0F766E]">
                          // {item.number}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-navy-700/60 dark:border-navy-700/60 light:border-[#E2E6EC]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 font-mono text-xs font-semibold rounded-xl border border-cyan light:border-[#0F766E] bg-cyan/10 light:bg-[#E6F4F2] text-cyan dark:text-cyan light:text-[#0F766E] hover:bg-cyan/20 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume [PDF]</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}

      {resumeModalOpen && typeof document !== "undefined" && createPortal(
        <div
          className="resume-modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-[#020817]/80 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setResumeModalOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="resume-modal flex h-[min(88vh,760px)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-navy-700 bg-[#0A192F] shadow-2xl light:border-[#DED5C8] light:bg-[#FBF8F2]"
          >
            <div className="flex items-center justify-between border-b border-navy-700 px-4 py-3 sm:px-5 light:border-[#DED5C8]">
              <div>
                <h2 id="resume-modal-title" className="font-heading text-base font-semibold text-slate-lightest light:text-[#292722]">
                  Resume [PDF]
                </h2>
                <p className="font-mono text-[10px] text-slate-muted light:text-[#625C53]">DOCUMENT PREVIEW // ARTHUR.SYS</p>
              </div>
              <button
                type="button"
                onClick={() => setResumeModalOpen(false)}
                className="rounded-lg p-2 text-slate-light hover:bg-navy-800 hover:text-cyan light:text-[#3D3A35] light:hover:bg-white light:hover:text-[#0F766E] transition-colors"
                aria-label="Close resume preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-slate-100">
              <iframe
                src="/resume.pdf"
                title="Resume PDF preview"
                className="h-full w-full"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-navy-700 px-4 py-3 sm:px-5 light:border-[#DED5C8]">
              <a
                href="/resume.pdf"
                download
                className="rounded-lg border border-navy-600 px-3 py-2 font-mono text-xs text-slate-light hover:border-cyan hover:text-cyan light:border-[#B9AD9D] light:text-[#3D3A35] light:hover:border-[#0F766E] light:hover:text-[#0F766E] transition-colors"
              >
                Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-cyan px-3 py-2 font-mono text-xs font-semibold text-[#04111f] hover:bg-cyan/80 transition-colors"
              >
                Open in new tab
              </a>
            </div>
          </section>
        </div>,
        document.body,
      )}
    </header>
  );
}
