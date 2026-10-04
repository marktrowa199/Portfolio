"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MIN_WORLD_WIDTH,
  WORLD_HEIGHT,
  createState,
  jump,
  reset,
  resize,
  step,
  type GameState,
  type Status,
} from "./engine";
import {
  buildSpriteCache,
  drawFrame,
  readPalette,
  type Palette,
  type SpriteCache,
} from "./render";

/** Longest frame the simulation will accept, so a stalled tab cannot skip a jump. */
const MAX_FRAME_SECONDS = 1 / 30;

export type Score = { current: number; best: number };

/**
 * Owns the Dino Dash loop.
 *
 * The simulation state lives in a ref and React only hears about score changes,
 * status changes, and the lifecycle flags. That keeps a 60fps game off React's
 * render path entirely.
 */
export function useDinoGame(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const stateRef = useRef<GameState | null>(null);
  if (stateRef.current === null) stateRef.current = createState();

  const spritesRef = useRef<SpriteCache | null>(null);
  const paletteRef = useRef<Palette | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const highScoreRef = useRef(0);

  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  /** True while the section is on screen and the tab is focused. */
  const [isActive, setIsActive] = useState(true);

  const syncCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return false;

    const context = canvas.getContext("2d");
    if (!context) return false;

    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return false;

    if (!paletteRef.current) paletteRef.current = readPalette(canvas);

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    // Cap the backing store on wide viewports: beyond roughly 2x there is no visible
    // gain from more pixels, and it keeps the fill rate cheap on large screens.
    const backingRatio = rect.width > 900 ? Math.min(ratio, 1.5) : ratio;

    const pixelWidth = Math.round(rect.width * backingRatio);
    const pixelHeight = Math.round(rect.height * backingRatio);

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    // The world is a fixed height with a fluid width. Every draw call below works in
    // world units, so the transform maps one world unit onto `unit` CSS pixels and the
    // world always fills the stage exactly, whatever its aspect ratio.
    const unit = rect.height / WORLD_HEIGHT;
    resize(state, Math.max(MIN_WORLD_WIDTH, rect.width / unit), WORLD_HEIGHT);

    context.setTransform(backingRatio * unit, 0, 0, backingRatio * unit, 0, 0);
    context.imageSmoothingEnabled = false;

    return true;
  }, [canvasRef]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state || !syncCanvas()) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (!paletteRef.current) paletteRef.current = readPalette(canvas);
    if (!spritesRef.current) spritesRef.current = buildSpriteCache(paletteRef.current);

    drawFrame(context, state, spritesRef.current, paletteRef.current);
  }, [canvasRef, syncCanvas]);

  /** Repaints the resting scene once: on mount, on resize, and on theme change. */
  useEffect(() => {
    paint();
  }, [paint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => paint());
    observer.observe(canvas);

    // The theme toggle swaps CSS custom properties rather than remounting, so the
    // cached sprites and ink have to be rebuilt when the class on <html> changes.
    const themeObserver = new MutationObserver(() => {
      paletteRef.current = readPalette(canvas);
      spritesRef.current = buildSpriteCache(paletteRef.current);
      paint();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, [canvasRef, paint]);

  /** Only run the loop while the game is playing, on screen, in a visible tab. */
  useEffect(() => {
    if (status !== "running" || !isActive) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const state = stateRef.current;
    if (!state) return;

    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - lastTimeRef.current) / 1000, MAX_FRAME_SECONDS);
      lastTimeRef.current = now;

      // A returning tab can hand us a large delta. Clamped above, and guarded here
      // against a zero or negative step so the score never runs backwards.
      step(state, Math.max(0, delta));

      const current = Math.floor(state.score);
      setScore(current);

      paint();

      if (state.status === "running") {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      frameRef.current = null;
      const finalScore = Math.floor(state.score);
      setStatus("over");
      setScore(finalScore);

      if (finalScore > highScoreRef.current) {
        highScoreRef.current = finalScore;
        setHighScore(finalScore);
        setIsNewHighScore(true);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [status, isActive, paint]);

  /** Pause the run when the section scrolls away or the tab is hidden. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const update = () => {
      const rect = canvas.getBoundingClientRect();
      const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
      setIsActive(onScreen && !document.hidden);
    };

    update();

    const intersection = new IntersectionObserver(update, { threshold: 0 });
    intersection.observe(canvas);
    document.addEventListener("visibilitychange", update);

    return () => {
      intersection.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [canvasRef]);

  const start = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    reset(state, "running");
    setScore(0);
    setIsNewHighScore(false);
    setStatus("running");
    // Paint once immediately so the frame that shows the dino mid-stride exists
    // even if the first rAF is delayed.
    paint();
  }, [paint]);

  const restart = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    reset(state, "running");
    setScore(0);
    setIsNewHighScore(false);
    setStatus("running");
    paint();
  }, [paint]);

  const jumpNow = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    jump(state);
  }, []);

  /** The single "make it happen" input: starts a run or jumps an active one. */
  const press = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;
    if (state.status === "running") {
      jump(state);
      return;
    }
    start();
  }, [start]);

  return {
    status,
    score,
    highScore,
    isNewHighScore,
    isActive,
    start,
    restart,
    jump: jumpNow,
    press,
  };
}
