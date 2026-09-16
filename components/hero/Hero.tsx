"use client";

import { useState } from "react";
import SignalCanvas from "./SignalCanvas";
import { ArrowRight, Copy, Check, Github, Linkedin, Sparkles, GraduationCap, Server, MapPin } from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = "arthurnielzz@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-grid-pattern">
      {/* Background glow circle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-cyan/5 dark:bg-cyan/5 light:bg-[#0F766E]/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Telemetry Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan/30 bg-cyan/10 text-cyan dark:text-cyan light:text-[#0F766E] light:bg-[#E6F4F2] light:border-[#B2DFDB] font-mono text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan light:bg-[#0F766E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan light:bg-[#0F766E]"></span>
              </span>
              <span className="tracking-wide uppercase text-[11px]">
                Open to Remote • On-site • Hybrid
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="font-mono text-xs sm:text-sm text-cyan dark:text-cyan light:text-[#0F766E] tracking-wider font-medium">
                &gt; HELLO, WORLD! I AM
              </p>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-lightest dark:text-slate-lightest light:text-[#111620] leading-[1.12]">
                Niel Arthur <span className="text-cyan dark:text-cyan light:text-[#0F766E]">Rocacurva</span>
              </h1>
              <p className="font-heading text-xl sm:text-2xl text-slate-light dark:text-slate-light light:text-[#525E72] font-semibold">
                Associate Software Engineer / Junior Developer
              </p>
            </div>

            {/* Honest, Clear Value Narrative from Resume */}
            <p className="text-base sm:text-lg text-slate-muted dark:text-slate-muted light:text-[#525E72] max-w-2xl leading-relaxed font-normal">
              Motivated <strong className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold">BSIT graduate</strong> from Our Lady of Fatima University seeking to apply my skills in <span className="text-cyan dark:text-cyan light:text-[#0F766E] font-medium">Python</span>, <span className="text-cyan dark:text-cyan light:text-[#0F766E] font-medium">SQL</span>, <span className="text-cyan dark:text-cyan light:text-[#0F766E] font-medium">Git</span>, and software development while contributing to innovative engineering solutions and growing as a software engineer.
            </p>

            {/* CTAs & Quick Micro-interactions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold bg-cyan dark:bg-cyan light:bg-[#0F766E] text-navy-950 dark:text-navy-950 light:text-white hover:bg-cyan/90 dark:hover:bg-cyan/90 light:hover:bg-[#0D6B64] shadow-lg shadow-cyan/10 light:shadow-sm transition-all duration-200 group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs sm:text-sm font-medium border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-800/80 dark:bg-navy-800/80 light:bg-white text-slate-light dark:text-slate-light light:text-[#1E2530] hover:border-cyan/50 hover:text-cyan dark:hover:text-cyan light:hover:border-[#0F766E]/40 light:hover:text-[#0F766E] light:shadow-sm transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 light:text-emerald-600" />
                    <span className="text-emerald-400 light:text-emerald-600 font-medium">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy {email}</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com/marktrowa199"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-800/80 dark:bg-navy-800/80 light:bg-white text-slate-light dark:text-slate-light light:text-[#525E72] hover:text-cyan dark:hover:text-cyan light:hover:text-[#0F766E] hover:border-cyan/40 light:hover:border-[#0F766E]/40 light:shadow-sm transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-800/80 dark:bg-navy-800/80 light:bg-white text-slate-light dark:text-slate-light light:text-[#525E72] hover:text-cyan dark:hover:text-cyan light:hover:text-[#0284C7] hover:border-cyan/40 light:hover:border-[#0284C7]/40 light:shadow-sm transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-signal-blue light:text-[#0284C7]" />
              </a>
            </div>
          </div>

          {/* Right Column: Signature Visual Motif (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <SignalCanvas />
          </div>
        </div>

        {/* Recruiter 10-Second Fast-Scan Strip */}
        <div className="mt-14 pt-8 border-t border-navy-700/60 dark:border-navy-700/60 light:border-[#E2E6EC]">
          <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider text-slate-dim light:text-[#7B879C]">
            <Sparkles className="w-3.5 h-3.5 text-cyan light:text-[#0F766E]" />
            <span>Recruiter Quick-Scan // Verified Profile</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-4 rounded-xl border border-navy-700/70 dark:border-navy-700/70 light:border-[#E2E6EC] bg-navy-800/40 dark:bg-navy-800/40 light:bg-white card-glow-hover">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] text-cyan dark:text-cyan light:text-[#0F766E] border border-navy-700/50 light:border-[#E2E6EC]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-muted light:text-[#7B879C] uppercase">Degree</p>
                  <p className="text-sm font-heading font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                    B.S. Information Technology
                  </p>
                  <p className="text-xs text-slate-muted light:text-[#525E72]">Our Lady of Fatima University (2022 - 2026)</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-xl border border-navy-700/70 dark:border-navy-700/70 light:border-[#E2E6EC] bg-navy-800/40 dark:bg-navy-800/40 light:bg-white card-glow-hover">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] text-signal-blue light:text-[#0284C7] border border-navy-700/50 light:border-[#E2E6EC]">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-muted light:text-[#7B879C] uppercase">Core Stack</p>
                  <p className="text-sm font-heading font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                    Python, SQL, Git
                  </p>
                  <p className="text-xs text-slate-muted light:text-[#525E72]">Raspberry Pi 5, ESP32, IT Operations</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-xl border border-navy-700/70 dark:border-navy-700/70 light:border-[#E2E6EC] bg-navy-800/40 dark:bg-navy-800/40 light:bg-white card-glow-hover">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] text-emerald-400 light:text-emerald-600 border border-navy-700/50 light:border-[#E2E6EC]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-muted light:text-[#7B879C] uppercase">Availability</p>
                  <p className="text-sm font-heading font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                    Remote | On-site | Hybrid
                  </p>
                  <p className="text-xs text-slate-muted light:text-[#525E72]">Ready for Associate / Junior Roles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
