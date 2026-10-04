"use client";

import { useEffect, useRef, useState } from "react";

/** How far outside the viewport work may start. Generous, so it finishes before a click. */
const ROOT_MARGIN = "600px 0px";

/**
 * Reports whether an element has come within `ROOT_MARGIN` of the viewport, then stops
 * observing.
 *
 * Every trigger shares one IntersectionObserver. Screenshots are far enough down the page
 * that eagerly loading their full-size versions at first paint would compete with the
 * content above them for bandwidth; this starts that work only once the section is
 * genuinely close, which in practice is well before anyone can click.
 */
const callbacks = new Map<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  // Guard for SSR and for browsers without the API: the hook simply reports `false`.
  if (typeof IntersectionObserver === "undefined") return null;

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const done = callbacks.get(entry.target);
        callbacks.delete(entry.target);
        done?.();
      }
    },
    { rootMargin: ROOT_MARGIN },
  );

  return observer;
}

export function useNearViewport<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    // Nothing to observe, or the visitor asked to minimise data use. Either way the
    // preloading is skipped and the images load on demand as before.
    if (!element || isNear) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const instance = getObserver();
    if (!instance) return;

    const done = () => {
      instance.unobserve(element);
      setIsNear(true);
    };

    callbacks.set(element, done);
    instance.observe(element);

    return () => {
      callbacks.delete(element);
      instance.unobserve(element);
    };
  }, [isNear]);

  return [ref, isNear] as const;
}