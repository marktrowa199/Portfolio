"use client";

import { useEffect } from "react";

/** One page-level observer reveals marked sections once, then leaves them settled. */
export default function ScrollReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document.documentElement.classList.add("has-scroll-reveal");
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-scroll-reveal");
    };
  }, []);

  return null;
}
