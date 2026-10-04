"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Keeps a failure inside the game.
 *
 * The game is the only stateful client island on an otherwise server-rendered
 * page, so an exception thrown inside it would otherwise unwind the whole
 * portfolio. This boundary degrades to a static note instead.
 */
export default class DinoGameBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Dino Dash failed to run:", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="dino-section__fallback">
        <p className="dino-section__fallback-title">Dino Dash is taking a breather</p>
        <p className="dino-section__fallback-note">
          The game could not start in this browser. Everything else on the page still works.
        </p>
      </div>
    );
  }
}
