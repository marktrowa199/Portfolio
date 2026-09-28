"use client";

import { useState } from "react";
import SignalCanvas from "./SignalCanvas";
import { ArrowRight, Check, Copy, Github, GraduationCap, Linkedin, MapPin, Server } from "lucide-react";

export default function Hero() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const email = "arthurnielzz@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 2400);
  };

  return (
    <section id="home" className="hero-build relative isolate flex flex-col justify-center py-28 sm:py-32">
      <div className="section-wrap grid w-full items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.6rem,4.9vw,4.5rem)] font-semibold leading-[1.04] tracking-[-.03em]">
            Niel Arthur <span className="text-[var(--accent)]">B. Rocacurva</span>
          </h1>
          <p className="mt-5 text-xl font-semibold leading-snug text-[var(--text-heading)] sm:text-2xl">
            Aspiring Associate Software Engineer / Junior Developer
          </p>
          <p className="mt-2 text-base font-medium text-[var(--text-muted)] sm:text-lg">
            Software · data · AI · IoT
          </p>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-[var(--text-muted)]">
            Motivated BSIT graduate from Our Lady of Fatima University seeking to apply my skills in Python, SQL, Git, and software development while contributing to engineering solutions and growing as a software engineer.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-ink)] shadow-[0_4px_10px_-6px_rgb(0_0_0_/_45%)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]">
              Explore projects <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-5 py-3 text-sm font-semibold text-[var(--text-heading)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
              Contact me
            </a>
            <button type="button" onClick={copyEmail} className="inline-flex min-h-12 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)]" aria-live="polite">
              {copyState === "copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              <span>{copyState === "copied" ? "Email copied" : copyState === "error" ? "Copy unavailable" : "Copy email"}</span>
            </button>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--border)] pt-5 text-sm text-[var(--text-muted)]">
            <a className="inline-flex min-h-11 items-center gap-2 hover:text-[var(--accent)]" href="https://github.com/marktrowa199" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">
              <Github aria-hidden="true" className="h-4 w-4" /> GitHub
            </a>
            <a className="inline-flex min-h-11 items-center gap-2 hover:text-[var(--accent)]" href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              <Linkedin aria-hidden="true" className="h-4 w-4" /> LinkedIn
            </a>
            <span className="text-[var(--text-dim)]">San Jose Del Monte Bulacan</span>
          </div>
        </div>
        <SignalCanvas />
      </div>
      <div className="section-wrap mt-14 border-t border-[var(--border)] pt-7">
        <h2 className="quick-scan-heading">At a glance</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <article className="quick-scan-block">
            <GraduationCap aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div><p className="quick-scan-block__label">Degree</p><p className="quick-scan-block__value">B.S. Information Technology</p><p className="quick-scan-block__detail">Our Lady of Fatima University · Quezon City · 2022–2026</p></div>
          </article>
          <article className="quick-scan-block">
            <Server aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div><p className="quick-scan-block__label">Core stack</p><p className="quick-scan-block__value">Python, SQL, Git</p><p className="quick-scan-block__detail">Raspberry Pi 5, ESP32, IT operations</p></div>
          </article>
          <article className="quick-scan-block">
            <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div><p className="quick-scan-block__label">Availability</p><p className="quick-scan-block__value">Remote · On-site · Hybrid</p><p className="quick-scan-block__detail">Associate Software Engineer / Junior Developer roles</p></div>
          </article>
        </div>
      </div>
    </section>
  );
}
