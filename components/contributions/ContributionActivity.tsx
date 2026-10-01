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
    <section id="contributions" ref={sectionRef} data-scroll-reveal className="section-space scroll-mt-20">
      <div className="section-wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">06 · GitHub Activity</p>
            <h2 className="section-title mt-3">Contribution Activity</h2>
          </div>
          <p className="section-intro">Public activity on GitHub. Switch years, and hover any day for its date and count.</p>
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
