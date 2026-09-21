"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Terminal, Radio, Shield, Code2 } from "lucide-react";

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-navy-700/60 dark:border-navy-700/60 light:border-slate-200 bg-navy-950/60 dark:bg-navy-950/60 light:bg-slate-50 py-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: System Status Telemetry */}
          <div className="flex flex-col items-center md:items-start gap-1.5 font-mono text-xs text-slate-muted light:text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-lightest dark:text-slate-lightest light:text-navy-900">
                SYSTEM: OPERATIONAL
              </span>
              <span className="text-slate-dim light:text-slate-400"></span>
            </div>
            <p className="text-[11px] text-slate-dim light:text-slate-500">
              Built with Next.js 14, React 18, Tailwind CSS &amp; TypeScript
            </p>
          </div>

          {/* Middle: Live Clock */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-navy-900/80 dark:bg-navy-900/80 light:bg-white border border-navy-700/50 light:border-slate-200 font-mono text-[11px] text-cyan dark:text-cyan light:text-teal-700">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{time || "UTC CLOCK SYNCHRONIZING..."}</span>
          </div>

          {/* Right: Back to Top & Monogram */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-slate-dim light:text-slate-500">
              [NIEL ARTHUR // PORTFOLIO]
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-navy-700 dark:border-navy-700 light:border-slate-300 bg-navy-800/80 dark:bg-navy-800/80 light:bg-white text-slate-light dark:text-slate-light light:text-navy-900 hover:text-cyan hover:border-cyan/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer / Note */}
        <div className="mt-8 pt-6 border-t border-navy-700/30 dark:border-navy-700/30 light:border-slate-200/60 text-center font-mono text-[11px] text-slate-dim light:text-slate-500">
          <p>
            Built and designed by Niel Arthur B. Rocacurva.
          </p>
          <p>
            All rights reserved. © 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
