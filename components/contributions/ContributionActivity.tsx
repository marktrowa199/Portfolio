"use client";

import { useEffect, useRef, useState } from "react";

type CalendarModule = typeof import("./ContributionCalendar");

function CalendarSkeleton() {
  return (
    <div className="contribution-panel" aria-label="Loading GitHub contribution activity">
      <div className="contribution-skeleton-summary" />
      <div className="contribution-scroll" aria-hidden="true">
        <div className="contribution-skeleton-grid">
          {Array.from({ length: 371 }, (_, index) => <span key={index} />)}
        </div>
      </div>
      <span className="sr-only" role="status">Loading public GitHub contributions…</span>
    </div>
  );
}

export default function ContributionActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [Calendar, setCalendar] = useState<CalendarModule["default"] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    const loadCalendar = () => {
      void import("./ContributionCalendar").then((module) => {
        if (!cancelled) setCalendar(() => module.default);
      }).catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    };

    if (!("IntersectionObserver" in window)) {
      loadCalendar();
    } else {
      const currentObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          currentObserver.disconnect();
          loadCalendar();
        }
      }, { rootMargin: "160px" });
      observer = currentObserver;
      currentObserver.observe(section);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  return (
    <section id="contributions" ref={sectionRef} className="section-space scroll-mt-20">
      <div className="section-wrap">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <h2 className="section-title">Contribution Activity</h2>
          <p className="section-intro mt-4">A snapshot of my public activity and contributions on GitHub.</p>
        </div>
        {Calendar ? <Calendar /> : loadFailed ? (
          <div className="contribution-panel contribution-error" role="status">
            <p>GitHub activity could not be loaded right now.</p>
            <a href="https://github.com/marktrowa199" target="_blank" rel="noreferrer">View my GitHub profile</a>
          </div>
        ) : <CalendarSkeleton />}
      </div>
    </section>
  );
}
