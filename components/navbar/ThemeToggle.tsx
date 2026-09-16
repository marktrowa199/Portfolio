"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-navy-700 bg-navy-800/60" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-navy-700 dark:border-navy-600/70 bg-navy-800/80 dark:bg-navy-800/80 light:bg-white light:border-[#E2E6EC] text-slate-light dark:text-slate-lightest light:text-[#1E2530] hover:text-cyan dark:hover:text-cyan light:hover:text-[#0F766E] hover:border-cyan/50 dark:hover:border-cyan/50 light:hover:border-[#0F766E]/40 light:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan/40 light:focus:ring-[#0F766E]/30"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-cyan transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#0F766E] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
