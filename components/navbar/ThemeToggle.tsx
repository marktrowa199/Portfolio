"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove(next === "dark" ? "light" : "dark");
    document.documentElement.classList.add(next);
  };

  // Server-rendered / pre-hydration placeholder keeps the exact same footprint
  // so the navbar doesn't shift when the real toggle mounts.
  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full border border-navy-700 bg-navy-800/60"
        aria-hidden="true"
      />
    );
  }

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <div className="relative group/toggle">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        className="relative flex items-center justify-center w-9 h-9 rounded-full border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-800/80 dark:bg-navy-800/80 light:bg-white text-slate-light dark:text-slate-light light:text-[#1E2530] hover:border-cyan/60 dark:hover:border-cyan/60 light:hover:border-[#0F766E]/50 light:shadow-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/40 light:focus-visible:ring-[#0F766E]/30 overflow-hidden"
      >
        {/* Sun — visible in dark mode (click target to go light) */}
        <Sun
          aria-hidden="true"
          className={`absolute w-4 h-4 text-cyan transition-all duration-300 ease-out ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-50"
          }`}
        />
        {/* Moon — visible in light mode (click target to go dark) */}
        <Moon
          aria-hidden="true"
          className={`absolute w-4 h-4 text-[#57CBFF] light:text-[#0F766E] transition-all duration-300 ease-out ${
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          }`}
        />
      </button>

      {/* Tooltip */}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 translate-y-[-4px] whitespace-nowrap rounded-md border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-900 dark:bg-navy-900 light:bg-white px-2 py-1 font-mono text-[10px] text-slate-light dark:text-slate-light light:text-[#525E72] opacity-0 shadow-lg light:shadow-md transition-all duration-150 group-hover/toggle:opacity-100 group-hover/toggle:translate-y-0 group-focus-within/toggle:opacity-100 group-focus-within/toggle:translate-y-0"
      >
        {label}
      </span>
    </div>
  );
}
