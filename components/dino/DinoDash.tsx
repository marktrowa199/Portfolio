import DinoGame from "./DinoGame";
import DinoGameBoundary from "./DinoGameBoundary";

/**
 * Home-page section for the game.
 *
 * This is a server component on purpose: the game itself is a client island, so
 * nothing about this section pulls the page's JavaScript bundle. The section sits
 * between the hero and the about block, where it reads as a short break rather
 * than a main destination.
 */
export default function DinoDash() {
  return (
    <section
      id="dino-dash"
      aria-labelledby="dino-dash-title"
      className="dino-section scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-raised)]"
    >
      <div className="section-wrap">
        <div className="dino-section__head">
          <div className="min-w-0">
            <p className="eyebrow">Interactive · Mini game</p>
            <h2 id="dino-dash-title" className="section-title mt-3">
              Dino Dash
            </h2>
            <p className="section-intro mt-2">
              Take a quick break and play. Jump the cacti for as long as you can.
            </p>
          </div>
          <p className="dino-section__aside">
            A small runner built with React and the Canvas API. Jump, keep the score,
            and try to beat your best.
          </p>
        </div>

        <DinoGameBoundary>
          <DinoGame />
        </DinoGameBoundary>
      </div>
    </section>
  );
}
