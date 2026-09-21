"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const currentTheme: Theme =
      savedTheme === "light" ? "light" : "dark";

    setTheme(currentTheme);
    setMounted(true);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="w-9 h-9 rounded-full border border-slate-700"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      className="
        flex items-center justify-center
        w-9 h-9
        rounded-full
        border
        border-slate-700
        bg-slate-900
        text-cyan-400
        transition-all duration-200
        hover:scale-105
        hover:border-cyan-400
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-400/40

        light:bg-white
        light:border-slate-200
        light:text-teal-700
        light:hover:border-teal-600
      "
    >
      {isDark ? (
        <Sun
          aria-hidden="true"
          className="w-4 h-4"
        />
      ) : (
        <Moon
          aria-hidden="true"
          className="w-4 h-4"
        />
      )}
    </button>
  );
}