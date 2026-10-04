"use client";

import { useEffect, useRef } from "react";
import { useDinoGame } from "./useDinoGame";

/**
 * The playable surface.
 *
 * This element owns the canvas and every input listener. The simulation lives in
 * refs rather than React state, so a frame never triggers a re-render; the HUD
 * above the canvas is the only part that re-renders as the score climbs.
 */
export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { status, score, highScore, isNewHighScore, isActive, start, restart, press } =
    useDinoGame(canvasRef);

  const isRunning = status === "running";
  const isGameOver = status === "over";

  // Keyboard is bound to the section rather than the canvas so the game is
  // playable without first clicking it. Inputs, text fields, and any focused
  // interactive element are left alone so Space still activates buttons.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
          return;
        }
        // Let Space activate a focused button instead of firing a jump.
        if (target.closest("button, a, [role='button']")) return;
      }

      const isJumpKey = event.code === "Space" || event.code === "ArrowUp" || event.key === "ArrowUp";
      if (!isJumpKey) return;

      event.preventDefault();

      if (status === "ready") {
        start();
        return;
      }

      if (status === "over") {
        // Space restarts from the game-over state, which is the expected
        // arcade behaviour and keeps the keyboard path complete.
        restart();
        return;
      }

      // Holding a key must not machine-gun jumps; ignore auto-repeat.
      if (event.repeat) return;
      press();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [press, restart, start, status]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Ignore taps that landed on the overlay's own buttons.
    if ((event.target as HTMLElement).closest("button")) return;
    press();
  };

  return (
    <div className="dino-game">
      <div className="dino-game__hud" aria-hidden="true">
        <span className="dino-game__stat">
          <span className="dino-game__stat-label">Score</span>
          <span className="dino-game__stat-value">{score}</span>
        </span>
        <span className="dino-game__stat dino-game__stat--best">
          <span className="dino-game__stat-label">Best</span>
          <span className="dino-game__stat-value">{highScore}</span>
        </span>
      </div>

      <div
        className="dino-stage"
        onPointerDown={handlePointerDown}
      >
        <canvas
          ref={canvasRef}
          className="dino-stage__canvas"
          role="img"
          aria-label={
            isRunning
              ? `Dino Dash game in progress. Score ${score}. Press Space or the up arrow to jump.`
              : isGameOver
                ? `Dino Dash game over. Final score ${score}. Press Space or the restart button to play again.`
                : "Dino Dash game ready. Press Space, the up arrow, or tap to start."
          }
        />

        {!isRunning && (
          <div className="dino-stage__overlay">
            {isGameOver ? (
              <div className="dino-stage__card">
                <p className="dino-stage__title">Game over</p>
                <p className="dino-stage__score">
                  Score: <span>{score}</span>
                </p>
                {isNewHighScore && <p className="dino-stage__badge">New best</p>}
                <button type="button" className="dino-button" onClick={restart}>
                  Restart
                </button>
              </div>
            ) : (
              <div className="dino-stage__card">
                <p className="dino-stage__title">Press Space to start</p>
                <p className="dino-stage__hint">or tap the game to jump</p>
                <button type="button" className="dino-button" onClick={start}>
                  Play
                </button>
              </div>
            )}
          </div>
        )}

        {/* Announced to screen readers only; the canvas itself carries the state. */}
        <p className="sr-only" role="status" aria-live="polite">
          {isGameOver
            ? `Game over. Score ${score}.`
            : isRunning
              ? `Playing. Score ${score}.`
              : "Ready to play."}
        </p>
      </div>

      {!isActive && isRunning && (
        <p className="dino-game__paused">Paused — the run resumes when you scroll back.</p>
      )}

      <p className="dino-game__legend">
        <span className="dino-game__keys">
          <kbd>Space</kbd>
          <span>or</span>
          <kbd>&uarr;</kbd>
          <span>to jump</span>
        </span>
        <span className="dino-game__legend-note">
          The best score is kept for this visit only.
        </span>
      </p>
    </div>
  );
}
