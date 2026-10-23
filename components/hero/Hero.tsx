"use client";

import { useState } from "react";
import Image from "next/image";
import { Mascot } from "page-mascot";
import portrait from "@/components/image/siarthur.jpg";
import { ArrowRight, Check, Copy, Github, GraduationCap, Linkedin, MapPin } from "lucide-react";

/**
 * Personal portrait, bundled from `components/image/siarthur.jpg` (715 x 953)
 * and framed at the same 3:4 ratio so the face is never cropped. It is the
 * large hero visual in the right column; replace that file with a new photo
 * and the hero picks it up.
 */
function HeroPhoto() {
  return (
    <div className="hero-photo">
      <Image
        src={portrait}
        alt="Portrait of Niel Arthur B. Rocacurva"
        fill
        sizes="(min-width: 1024px) 304px, (min-width: 640px) 272px, 240px"
        className="hero-photo__img"
      />
    </div>
  );
}

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
    <section id="home" className="hero-build relative isolate flex flex-col justify-center pt-[5.5rem] pb-12 sm:pt-28 sm:pb-16">
      <div className="section-wrap grid w-full grid-cols-[minmax(0,1fr)] items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
        <div className="w-full min-w-0">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="shrink-0">
              <Mascot
                directions="/mascots/niel-directions.webp"
                reactions="/mascots/niel-reactions.webp"
                size={160}
                label="Niel"
              />
            </div>
            <h1 className="min-w-0 text-[clamp(2.25rem,8vw,4.5rem)] font-semibold leading-[1.04] tracking-[-.03em]">
              Niel Arthur <span className="text-[var(--accent)]">B. Rocacurva</span>
            </h1>
          </div>

          <p className="mt-4 text-lg font-semibold leading-snug text-[var(--text-heading)] sm:text-2xl">
            Software Engineer / Full Stack Developer
          </p>

          <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-[var(--text-muted)]">
            BSIT graduate with hands-on experience in Python, SQL, web development, AI, data analytics,
            and IT operations. Open to entry-level roles where I can contribute and grow.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <a href="#projects" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-ink)] shadow-[0_4px_10px_-6px_rgb(0_0_0_/_45%)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] sm:min-h-12 sm:px-5 sm:py-3">
              View My Projects <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex min-h-11 items-center rounded-md border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2.5 text-sm font-semibold text-[var(--text-heading)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:min-h-12 sm:px-5 sm:py-3">
              Contact Me
            </a>

            <button type="button" onClick={copyEmail} className="inline-flex min-h-11 items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)] sm:min-h-12 sm:px-3">
              {copyState === "copied" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
              <span>{copyState === "copied" ? "Email copied" : copyState === "error" ? "Copy unavailable" : "Copy email"}</span>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--border)] pt-4 text-sm text-[var(--text-muted)] sm:gap-x-6 sm:gap-y-3">
            <a className="inline-flex min-h-11 items-center gap-2 hover:text-[var(--accent)]" href="https://github.com/marktrowa199" target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">
              <Github aria-hidden="true" className="h-4 w-4" /> GitHub
            </a>
            <a className="inline-flex min-h-11 items-center gap-2 hover:text-[var(--accent)]" href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              <Linkedin aria-hidden="true" className="h-4 w-4" /> LinkedIn
            </a>
            <span className="text-[var(--text-dim)]">San Jose Del Monte Bulacan</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <HeroPhoto />
        </div>
      </div>

      <div className="section-wrap mt-6 border-t border-[var(--border)] pt-4 sm:mt-8 sm:pt-5">
        <h2 className="quick-scan-heading">At a glance</h2>
        <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
          <article className="quick-scan-block">
            <GraduationCap aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div><p className="quick-scan-block__label">Degree</p><p className="quick-scan-block__value">B.S. Information Technology</p><p className="quick-scan-block__detail">Our Lady of Fatima University · Quezon City · 2022–2026</p></div>
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
