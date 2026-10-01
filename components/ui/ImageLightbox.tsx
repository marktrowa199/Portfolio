"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from "lucide-react";

/** One image the viewer can display. `width`/`height` are the source's intrinsic pixels. */
export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional short label shown in the viewer header; falls back to `alt`. */
  caption?: string;
};

type LightboxContextValue = {
  /** Opens the viewer. Pass the whole set to enable paging plus arrow-key navigation. */
  openImage: (images: LightboxImage[], startIndex?: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/** Access the page's shared image viewer. Throws when used outside the provider. */
export function useImageLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error("useImageLightbox must be used inside <ImageLightboxProvider>");
  }
  return context;
}

/** Must match the fade duration in `.lightbox__panel` so close never cuts off early. */
const TRANSITION_MS = 260;
/** Minimum horizontal travel, in px, that counts as a swipe rather than a stray tap. */
const SWIPE_THRESHOLD = 48;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Renders one image viewer for the whole page and hands every descendant image the same
 * open/zoom/close behaviour, so no two images can drift apart in how they behave.
 */
export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<LightboxImage[] | null>(null);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const openImage = useCallback((images: LightboxImage[], startIndex = 0) => {
    if (images.length === 0) return;
    if (unmountTimer.current) {
      clearTimeout(unmountTimer.current);
      unmountTimer.current = null;
    }
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setGallery(images);
    setIndex(Math.min(Math.max(startIndex, 0), images.length - 1));
    setIsZoomed(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const step = useCallback((delta: number) => {
    setIsZoomed(false);
    setIndex((current) => {
      const total = gallery?.length ?? 0;
      if (total < 2) return current;
      return (current + delta + total) % total;
    });
  }, [gallery]);

  // The panel mounts in its closed state first; waiting two frames guarantees that state
  // has actually painted, so the browser has something to transition away from.
  useEffect(() => {
    if (!gallery) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setIsOpen(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [gallery]);

  // Closing is animated, so unmount one transition later and hand focus back to the image
  // the visitor opened from. With reduced motion there is nothing to wait for.
  useEffect(() => {
    if (!gallery || isOpen) return;
    unmountTimer.current = setTimeout(() => {
      unmountTimer.current = null;
      setGallery(null);
      setIndex(0);
      setIsZoomed(false);
      returnFocusRef.current?.focus();
    }, prefersReducedMotion() ? 0 : TRANSITION_MS);
    return () => {
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
      unmountTimer.current = null;
    };
  }, [gallery, isOpen]);

  // Freeze the page behind the viewer. The scrollbar is replaced with matching padding so
  // the layout underneath does not jump sideways as it disappears.
  useEffect(() => {
    if (!gallery) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [gallery]);

  useEffect(() => {
    if (!gallery) return;
    closeButtonRef.current?.focus();
  }, [gallery]);

  useEffect(() => {
    if (!gallery) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.defaultPrevented) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gallery, close, step]);

  const keepFocusInPanel = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => element.offsetParent !== null);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    // While zoomed the stage is a scroll surface, so a drag there is a pan, not a swipe.
    touchStartX.current = isZoomed ? null : (event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || !gallery || gallery.length < 2) return;

    const travel = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(travel) < SWIPE_THRESHOLD) return;
    step(travel < 0 ? 1 : -1);
  };

  const current = gallery?.[index];
  const isReady = Boolean(current) && loadedSrc === current?.src;

  // Memoised so the context value only changes identity when `openImage` does; paging
  // through a gallery then re-renders the viewer alone, not every trigger button.
  const value = useMemo(() => ({ openImage }), [openImage]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {current && typeof document !== "undefined" && createPortal(
        <div
          className="lightbox"
          data-state={isOpen ? "open" : "closed"}
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
        >
          <div
            className="lightbox__panel"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption ?? current.alt}
            onKeyDown={keepFocusInPanel}
          >
            <div className="lightbox__header">
              <p className="lightbox__title">{current.caption ?? current.alt}</p>
              {gallery && gallery.length > 1 && (
                <p className="lightbox__counter" aria-live="polite">{index + 1} / {gallery.length}</p>
              )}
              <button ref={closeButtonRef} type="button" className="lightbox__close" onClick={close} aria-label="Close image preview">
                <X aria-hidden="true" />
              </button>
            </div>

            <div
              className={`lightbox__stage${isZoomed ? " is-zoomed" : ""}`}
              tabIndex={isZoomed ? 0 : -1}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {isZoomed ? (
                /* Actual size: the unoptimised source at its own pixels, inside a stage
                   that scrolls. */
                <Image
                  key={`${current.src}-zoom`}
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  unoptimized
                  draggable={false}
                  className="lightbox__img is-ready"
                />
              ) : (
                /* Fitted: `fill` sizes the element to the canvas, and object-fit keeps
                   the photo whole instead of cropping it to the panel. */
                <div className="lightbox__canvas">
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    objectFit="contain"
                    sizes="100vw"
                    priority
                    draggable={false}
                    className={`lightbox__img${isReady ? " is-ready" : ""}`}
                    onLoad={() => setLoadedSrc(current.src)}
                  />
                  {!isReady && <span className="lightbox__spinner" aria-hidden="true" />}
                </div>
              )}
            </div>

            <div className="lightbox__footer">
              <button
                type="button"
                className="lightbox__action"
                onClick={() => setIsZoomed((zoomed) => !zoomed)}
                aria-pressed={isZoomed}
              >
                {isZoomed ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
                {isZoomed ? "Fit to screen" : "Actual size"}
              </button>

              {gallery && gallery.length > 1 && (
                <div className="lightbox__pager">
                  <button
                    type="button"
                    className="lightbox__action"
                    onClick={() => step(-1)}
                    aria-label="Show the previous image"
                  >
                    <ChevronLeft aria-hidden="true" /> Prev
                  </button>
                  <button
                    type="button"
                    className="lightbox__action"
                    onClick={() => step(1)}
                    aria-label="Show the next image"
                  >
                    Next <ChevronRight aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </LightboxContext.Provider>
  );
}

export default ImageLightboxProvider;