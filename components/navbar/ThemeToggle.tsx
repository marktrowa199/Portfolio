"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let savedTheme: string | null = null;
    try {
      savedTheme = localStorage.getItem("theme");
    } catch {
      // Keep the system's default theme when storage is unavailable.
    }

    const currentTheme: Theme = savedTheme === "light" ? "light" : "dark";

    setTheme(currentTheme);
    setMounted(true);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme =
      theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // The current page still changes theme even when persistence is blocked.
    }

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="h-11 w-11 rounded-full border border-[var(--border)]"
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
        w-11 h-11
        rounded-md
        border
        border-[var(--border)]
        bg-[var(--bg-raised)]
        text-[var(--accent)]
        transition-all duration-200
        hover:border-[var(--accent)]
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
