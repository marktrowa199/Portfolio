import { GROUND_Y, SPRITE_RASTERS, SPRITE_SCALE, type GameState } from "./engine";
import type { CactusKind, Ink, RasterisedSprite } from "./sprites";

/**
 * Canvas renderer for Dino Dash.
 *
 * The stage is cleared and redrawn every frame. Nothing is layered from CSS
 * transitions, so the run is smooth and the frame rate never depends on the
 * theme, the device, or the section's scroll position.
 */

export type Palette = {
  background: string;
  ink: string;
  muted: string;
  dino: { main: string; light: string; shade: string };
  cactus: { main: string; shade: string };
  ground: string;
  dust: string;
};

const DEFAULT_PALETTE: Palette = {
  background: "#0f172a",
  ink: "#e2e8f0",
  muted: "#344256",
  dino: { main: "#5eead4", light: "#99f6e4", shade: "#0f766e" },
  cactus: { main: "#83c8a9", shade: "#286d55" },
  ground: "#344256",
  dust: "#94a3b8",
};

/** Reads the stage's custom properties so a theme switch repaints in the right colors. */
export function readPalette(element: HTMLElement): Palette {
  const styles = getComputedStyle(element);
  const read = (name: string, fallback: string) => {
    const value = styles.getPropertyValue(name).trim();
    return value || fallback;
  };

  const accent = read("--accent", DEFAULT_PALETTE.dino.main);
  const accentStrong = read("--accent-strong", DEFAULT_PALETTE.dino.shade);
  const cactusMain = read("--brick-green", DEFAULT_PALETTE.cactus.main);

  return {
    background: read("--dino-bg", DEFAULT_PALETTE.background),
    ink: read("--text-heading", DEFAULT_PALETTE.ink),
    muted: read("--border", DEFAULT_PALETTE.muted),
    dino: {
      main: accent,
      light: read("--accent-soft", accentStrong),
      shade: read("--dino-shade", accentStrong),
    },
    cactus: {
      main: cactusMain,
      shade: read("--brick-green-shade", accentStrong),
    },
    ground: read("--border", DEFAULT_PALETTE.ground),
    dust: read("--text-dim", DEFAULT_PALETTE.dust),
  };
}

export type SpriteCache = {
  dino: { runA: HTMLCanvasElement; runB: HTMLCanvasElement; jump: HTMLCanvasElement };
  cactus: Record<CactusKind, HTMLCanvasElement>;
};

/** Bakes one raster into an offscreen canvas so each frame costs a single drawImage. */
function bake(raster: RasterisedSprite, inks: Partial<Record<Ink, string>>): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = raster.width;
  canvas.height = raster.height;
  const context = canvas.getContext("2d");
  if (!context) return canvas;

  // Cacti use only main and shade ink, so an absent role falls back to main
  // rather than leaving the previous fillStyle in place.
  for (const pixel of raster.pixels) {
    context.fillStyle = inks[pixel.ink] ?? inks.main ?? "#000";
    context.fillRect(pixel.x, pixel.y, 1, 1);
  }
  return canvas;
}

export function buildSpriteCache(palette: Palette): SpriteCache {
  return {
    dino: {
      runA: bake(SPRITE_RASTERS.dino.runA, palette.dino),
      runB: bake(SPRITE_RASTERS.dino.runB, palette.dino),
      jump: bake(SPRITE_RASTERS.dino.jump, palette.dino),
    },
    cactus: {
      small: bake(SPRITE_RASTERS.cactus.small, palette.cactus),
      medium: bake(SPRITE_RASTERS.cactus.medium, palette.cactus),
      cluster: bake(SPRITE_RASTERS.cactus.cluster, palette.cactus),
    },
  };
}

function drawGround(ctx: CanvasRenderingContext2D, state: GameState, palette: Palette): void {
  const width = state.width;

  ctx.fillStyle = palette.ground;
  ctx.fillRect(0, GROUND_Y, width, 1);

  // Short ticks under the line, scrolling with the run so the ground reads as moving.
  const spacing = 13;
  const offset = state.distance % spacing;
  for (let x = -offset; x < width; x += spacing) {
    ctx.fillRect(Math.round(x), GROUND_Y + 1, 4, 1);
  }
}

/** Two flat, out-of-focus hills so the horizon has depth without becoming scenery. */
function drawHills(ctx: CanvasRenderingContext2D, state: GameState, palette: Palette): void {
  const layers = [
    { color: palette.muted, alpha: 0.32, speed: 0.22, period: 168, height: 13, step: 84 },
    { color: palette.muted, alpha: 0.5, speed: 0.45, period: 110, height: 7, step: 55 },
  ];

  for (const layer of layers) {
    ctx.save();
    ctx.globalAlpha = layer.alpha;
    ctx.fillStyle = layer.color;

    const offset = (state.distance * layer.speed) % layer.step;
    for (let x = -offset - layer.step; x < state.width + layer.step; x += layer.step) {
      const px = Math.round(x);
      ctx.fillRect(px, GROUND_Y - layer.height, layer.period, layer.height);
      // A flat notch keeps the skyline stepped instead of a repeating solid band.
      ctx.clearRect(px + layer.period * 0.32, GROUND_Y - layer.height, layer.period * 0.18, layer.height);
    }
    ctx.restore();
  }
}

function drawDust(ctx: CanvasRenderingContext2D, state: GameState, palette: Palette): void {
  if (state.dust <= 0) return;

  const progress = 1 - state.dust / 0.34;
  const x = state.dino.x + 7;
  const y = GROUND_Y - 1;

  ctx.save();
  ctx.globalAlpha = Math.max(0, 0.55 - progress * 0.55);
  ctx.fillStyle = palette.dust;
  const spread = 1 + progress * 5;
  ctx.fillRect(Math.round(x - spread), Math.round(y - progress * 4), 2, 2);
  ctx.fillRect(Math.round(x - spread * 0.4), Math.round(y - progress * 2), 1, 1);
  ctx.restore();
}

function drawObstacles(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  sprites: SpriteCache,
  scale: number,
): void {
  for (const obstacle of state.obstacles) {
    const sprite = sprites.cactus[obstacle.kind];
    const width = sprite.width * scale;
    const height = sprite.height * scale;
    ctx.drawImage(sprite, Math.round(obstacle.x), Math.round(obstacle.y), width, height);
  }
}

/**
 * World units of travel between run-cycle frames, so the stride rate follows the
 * speed of the run rather than the frame rate. At the start speed this is about
 * 3.6 steps per second and at the top speed about 7.9, which is roughly a jog
 * doubling into a sprint. Dividing by a fixed number of frames instead would tie
 * the cadence to the display's refresh rate.
 */
const STRIDE_UNITS = 52;

function drawDino(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  sprites: SpriteCache,
  scale: number,
): void {
  const pose = !state.dino.onGround
    ? "jump"
    : Math.floor(state.distance / STRIDE_UNITS) % 2 === 0
      ? "runA"
      : "runB";
  const sprite = sprites.dino[pose];
  ctx.drawImage(
    sprite,
    Math.round(state.dino.x),
    Math.round(state.dino.y),
    sprite.width * scale,
    sprite.height * scale,
  );
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  sprites: SpriteCache,
  palette: Palette,
): void {
  const width = state.width;
  const height = state.height;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, width, height);

  drawHills(ctx, state, palette);
  drawGround(ctx, state, palette);
  drawObstacles(ctx, state, sprites, SPRITE_SCALE);
  drawDino(ctx, state, sprites, SPRITE_SCALE);
  drawDust(ctx, state, palette);
}

/** Frames the resting scene: the road, the hills, and a dinosaur waiting to run. */
export function drawIdleFrame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  sprites: SpriteCache,
  palette: Palette,
): void {
  drawFrame(ctx, state, sprites, palette);
}

export const FALLBACK_PALETTE = DEFAULT_PALETTE;
