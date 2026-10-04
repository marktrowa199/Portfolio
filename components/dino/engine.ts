import {
  CACTUS_SPRITES,
  DINO_SPRITES,
  inkBounds,
  rasterise,
  type CactusKind,
} from "./sprites";

/**
 * Dino Dash game engine.
 *
 * Everything here works in "world units", never CSS pixels. The world is a fixed
 * height and a fluid width, so the dinosaur is the same size and the jump arc is
 * the same height on a phone and on a wide desktop. Difficulty comes from speed,
 * so a wider stage simply shows more of the road ahead.
 */

/**
 * The world is only 110 units tall so the dinosaur reads as one small character in
 * a wide scene rather than as the subject of the section. The ground line sits at
 * 92, which leaves just enough room for the tallest cactus and the jump arc to use
 * the sky without a large band of empty space above the action.
 *
 * Because the stage's aspect ratio is fixed in CSS, the visible world *width* is
 * fixed too: roughly `aspect x WORLD_HEIGHT` units regardless of how many CSS pixels
 * the stage occupies. That is what lets the section be resized for layout without
 * touching any of the tuning below.
 */
export const WORLD_HEIGHT = 110;
export const SPRITE_SCALE = 2;
export const GROUND_Y = 92;

const DINO_SPRITE = DINO_SPRITES.runA;
const DINO_WIDTH = DINO_SPRITE.width * SPRITE_SCALE;
const DINO_HEIGHT = DINO_SPRITE.height * SPRITE_SCALE;
const DINO_X = 20;

/**
 * Trims a slice off each hitbox edge so near misses read as skill, not bad luck.
 * The dino's own height is only trimmed at the top -- its underside stays flush with
 * its feet, so landing beside a cactus reads as the clear it looks like.
 */
export const HITBOX_INSET = 2;

const GRAVITY = 960;
const JUMP_VELOCITY = -270;
/**
 * The jump is a single fixed arc, not a variable-height one.
 *
 * A variable jump was tried and removed: the stage is short, so the band between the
 * top of the jump and the top of the tallest cactus is narrow. Aiming inside a band
 * that tight has no control surface, and it made the arc depend on when the player
 * let go -- so a quick tap of Space, or any tap on a touch screen, could produce a
 * hop that cleared nothing and read as the game ignoring the input. Every input now
 * produces the same reliable jump.
 *
 * These two numbers are not free parameters. The dino has to spend long enough above
 * the cactus height to cross its own hitbox at the slowest speed, and that window --
 * "if I jump now, will it clear?" -- is the entire control surface of the game. At
 * apex ~36 over a ~0.55s airtime the dino stays above the cactus for ~0.30s, which
 * leaves roughly 11 frames of valid takeoff at the start speed and 14 at the top.
 * The takeoff-window check in the engine suite measures this directly against the
 * real simulation; do not retune these two numbers without rerunning it.
 */

const START_SPEED = 250;
const MAX_SPEED = 410;
const SPEED_ACCEL = 4;

/**
 * Seconds of warning between obstacle groups. The floor leaves the dino roughly a
 * third of a second to land, notice, and jump again -- the same recovery the game
 * had before it was rescaled. Below that the game stops reading as difficult and
 * starts reading as broken.
 */
const EASY_GAP_SECONDS = 1.25;
const HARD_GAP_SECONDS = 0.86;

const SCORE_PER_UNIT = 1 / 11;
const DUST_SECONDS = 0.34;

/**
 * Space between the two cacti of a pair, and the longest a pair may take to cross.
 *
 * The widest pair the sprite set can produce is 38 units, which at the slowest speed
 * takes ~0.15s to cross -- inside the jump's ~0.32s reach, so every combination is
 * clearable at every speed. This gate is therefore a backstop rather than a live
 * limit: it exists so that enlarging the cactus sprites cannot quietly produce pairs
 * with no valid takeoff. The engine suite audits real spawns against the reach.
 */
const PAIR_GAP = 2;
const PAIR_SPAN_SECONDS = 0.16;

export type Status = "ready" | "running" | "over";

export type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
  kind: CactusKind;
};

export type Rect = { x: number; y: number; width: number; height: number };

export type GameState = {
  status: Status;
  /** World units. Derived from the stage's aspect ratio on every resize. */
  width: number;
  height: number;
  score: number;
  speed: number;
  /** Total units travelled; drives the run animation and both parallax layers. */
  distance: number;
  elapsed: number;
  obstacles: Obstacle[];
  dino: { x: number; y: number; vy: number; onGround: boolean };
  /** Counts down after a landing, purely for the dust puff. */
  dust: number;
};

const DINO_HITBOX: Rect = (() => {
  const bounds = inkBounds(DINO_SPRITE);
  return {
    x: bounds.x * SPRITE_SCALE,
    y: bounds.y * SPRITE_SCALE,
    width: bounds.width * SPRITE_SCALE,
    height: bounds.height * SPRITE_SCALE,
  };
})();

const CACTUS_HITBOXES: Record<CactusKind, Rect> = Object.fromEntries(
  (Object.keys(CACTUS_SPRITES) as CactusKind[]).map((kind) => {
    const bounds = inkBounds(CACTUS_SPRITES[kind]);
    return [
      kind,
      {
        x: bounds.x * SPRITE_SCALE,
        y: bounds.y * SPRITE_SCALE,
        width: bounds.width * SPRITE_SCALE,
        height: bounds.height * SPRITE_SCALE,
      },
    ];
  }),
) as Record<CactusKind, Rect>;

/** Widest the world can get before the extra runway stops being worth drawing. */
const MAX_WORLD_WIDTH = 420;
/**
 * Narrowest world allowed. Below this an extreme aspect ratio would compress the
 * runway until obstacles arrive with no reaction time left. The narrowest aspect in
 * use (the phone stage) works out to 275 units, so this only catches a browser that
 * reports a squarer box than the CSS asked for.
 */
export const MIN_WORLD_WIDTH = 260;

export function createState(): GameState {
  return {
    status: "ready",
    width: 352,
    height: WORLD_HEIGHT,
    score: 0,
    speed: START_SPEED,
    distance: 0,
    elapsed: 0,
    obstacles: [],
    dino: { x: DINO_X, y: GROUND_Y - DINO_HEIGHT, vy: 0, onGround: true },
    dust: 0,
  };
}

/** Puts the dinosaur back on the line and clears the road, keeping the stage size. */
export function reset(state: GameState, status: Status): void {
  state.status = status;
  state.score = 0;
  state.speed = START_SPEED;
  state.distance = 0;
  state.elapsed = 0;
  state.obstacles = [];
  state.dino.y = GROUND_Y - DINO_HEIGHT;
  state.dino.vy = 0;
  state.dino.onGround = true;
  state.dust = 0;
}

export function resize(state: GameState, width: number, height: number): void {
  state.width = Math.min(MAX_WORLD_WIDTH, Math.max(MIN_WORLD_WIDTH, width));
  state.height = height;
}

export function jump(state: GameState): void {
  if (state.status !== "running") return;
  if (!state.dino.onGround) return;
  state.dino.vy = JUMP_VELOCITY;
  state.dino.onGround = false;
}

function pickKind(): CactusKind {
  const roll = Math.random();
  if (roll < 0.32) return "small";
  if (roll < 0.74) return "medium";
  return "cluster";
}

function addObstacle(state: GameState, x: number, kind: CactusKind): Obstacle {
  const sprite = CACTUS_SPRITES[kind];
  const obstacle: Obstacle = {
    x,
    y: GROUND_Y - sprite.height * SPRITE_SCALE,
    width: sprite.width * SPRITE_SCALE,
    height: sprite.height * SPRITE_SCALE,
    kind,
  };
  state.obstacles.push(obstacle);
  return obstacle;
}

function spawn(state: GameState, progress: number): void {
  const first = addObstacle(state, state.width + 6, pickKind());

  // Pairs only appear once the run has warmed up. They also have to stay quick to
  // clear: two obstacles side by side stretch the window the dinosaur must stay
  // airborne, and a wide pair can eat almost all of it. Past that point the pair is
  // dropped and a single obstacle spawns instead, because an unclearable sequence
  // reads as a bug rather than as difficulty.
  if (progress <= 0.3 || Math.random() >= 0.4) return;

  const second = pickKind();
  const span = first.width + PAIR_GAP + CACTUS_SPRITES[second].width * SPRITE_SCALE;
  if (span / state.speed > PAIR_SPAN_SECONDS) return;

  addObstacle(state, first.x + first.width + PAIR_GAP, second);
}

function overlaps(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function dinoHitbox(state: GameState): Rect {
  return {
    x: state.dino.x + DINO_HITBOX.x + HITBOX_INSET,
    y: state.dino.y + DINO_HITBOX.y + HITBOX_INSET,
    width: DINO_HITBOX.width - HITBOX_INSET * 2,
    height: DINO_HITBOX.height - HITBOX_INSET,
  };
}

/**
 * Advances one frame. `dt` is expected to be clamped by the caller so a dropped
 * frame or a returning tab can never teleport the dinosaur through an obstacle.
 */
export function step(state: GameState, dt: number): void {
  if (state.status !== "running") return;

  state.speed = Math.min(MAX_SPEED, START_SPEED + state.elapsed * SPEED_ACCEL);
  state.elapsed += dt;

  const travelled = state.speed * dt;
  state.distance += travelled;
  state.score += travelled * SCORE_PER_UNIT;

  const dino = state.dino;
  const wasAirborne = !dino.onGround;

  if (wasAirborne || dino.vy !== 0) {
    dino.vy += GRAVITY * dt;
    dino.y += dino.vy * dt;
  }

  const floor = GROUND_Y - DINO_HEIGHT;
  if (dino.y >= floor) {
    dino.y = floor;
    if (wasAirborne) state.dust = DUST_SECONDS;
    dino.vy = 0;
    dino.onGround = true;
  } else {
    dino.onGround = false;
  }

  if (state.dust > 0) state.dust = Math.max(0, state.dust - dt);

  for (const obstacle of state.obstacles) obstacle.x -= travelled;

  const progress = (state.speed - START_SPEED) / (MAX_SPEED - START_SPEED);
  const window = EASY_GAP_SECONDS + (HARD_GAP_SECONDS - EASY_GAP_SECONDS) * progress;
  const gap = state.speed * window * (0.88 + Math.random() * 0.26);

  const rightmost = state.obstacles.reduce((max, o) => Math.max(max, o.x + o.width), -Infinity);
  if (rightmost <= state.width - gap) spawn(state, progress);

  state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -30);

  const box = dinoHitbox(state);
  for (const obstacle of state.obstacles) {
    const hitbox = CACTUS_HITBOXES[obstacle.kind];
    const obstacleBox = {
      x: obstacle.x + hitbox.x + HITBOX_INSET,
      y: obstacle.y + hitbox.y + HITBOX_INSET,
      width: hitbox.width - HITBOX_INSET * 2,
      height: hitbox.height - HITBOX_INSET * 2,
    };
    if (overlaps(box, obstacleBox)) {
      state.status = "over";
      return;
    }
  }
}

export const SPRITE_RASTERS = {
  dino: {
    runA: rasterise(DINO_SPRITES.runA),
    runB: rasterise(DINO_SPRITES.runB),
    jump: rasterise(DINO_SPRITES.jump),
  },
  cactus: {
    small: rasterise(CACTUS_SPRITES.small),
    medium: rasterise(CACTUS_SPRITES.medium),
    cluster: rasterise(CACTUS_SPRITES.cluster),
  },
};
