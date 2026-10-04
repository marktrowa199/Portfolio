/**
 * Pixel sprites for Dino Dash.
 *
 * Every sprite is authored as a grid of characters so the artwork stays editable
 * as plain text. Three ink roles are supported and mapped to CSS custom
 * properties at draw time, which is what keeps the game on-theme in both themes:
 *
 *   `#` main ink      `.` transparent      `o` light ink      `+` shade ink
 *
 * The dinosaur faces right and is drawn small on purpose: at 17 x 14 it stays a
 * readable silhouette next to the cacti instead of dominating the stage. The run
 * cycle is three frames -- stride open, gathered, and a tucked jump -- and only
 * the head and the eye carry the light and shade inks, so the shape does the
 * work rather than the colouring.
 */

export type Sprite = {
  readonly width: number;
  readonly height: number;
  readonly rows: readonly string[];
};

export type Ink = "main" | "light" | "shade";

/**
 * Stride open: the far leg is extended behind and the near leg reaches forward.
 * The far leg is the shaded one, which is what separates the two legs at a size
 * where a single pixel of gap would otherwise be easy to miss.
 */
const DINO_RUN_A: Sprite = {
  width: 17,
  height: 14,
  rows: [
    ".............###.",
    "...........####o#",
    "...........###+##",
    "..........#######",
    ".........#####...",
    ".....#########...",
    "...##########....",
    ".###########.....",
    "##########.......",
    "..#######........",
    "..###..###.......",
    ".###+...##.......",
    ".##+....###......",
    "###+.....###.....",
  ],
};

/** Gathered: the near leg is planted under the body while the far leg swings through. */
const DINO_RUN_B: Sprite = {
  width: 17,
  height: 14,
  rows: [
    ".............###.",
    "...........####o#",
    "...........###+##",
    "..........#######",
    ".........#####...",
    ".....#########...",
    "...##########....",
    ".###########.....",
    "##########.......",
    "..#######........",
    "...######........",
    "...#+..##........",
    "..##+..###.......",
    ".....####........",
  ],
};

/** Airborne: both legs tucked forward, clear of the ground line. */
const DINO_JUMP: Sprite = {
  width: 17,
  height: 14,
  rows: [
    ".............###.",
    "...........####o#",
    "...........###+##",
    "..........#######",
    ".........#####...",
    ".....#########...",
    "...##########....",
    ".###########.....",
    "##########.......",
    "..#######........",
    ".....#####.......",
    "....##+.##.......",
    "...##+..###......",
    "......####.......",
  ],
};

/** Small cactus: 5 x 8, a short stem with one arm. */
const CACTUS_SMALL: Sprite = {
  width: 5,
  height: 8,
  rows: [
    "..#..",
    "..#..",
    "#.#..",
    "###..",
    "..#..",
    "..#+.",
    "..#+.",
    ".##+.",
  ],
};

/** Medium cactus: 7 x 13, the default obstacle. One arm off a tall stem. */
const CACTUS_MEDIUM: Sprite = {
  width: 7,
  height: 13,
  rows: [
    "...#...",
    "...#...",
    "...#...",
    "...#...",
    "...#...",
    ".#.#...",
    ".#.#+..",
    ".#.#+..",
    ".#.#+..",
    ".###+..",
    "...#+..",
    "...#+..",
    "..###+.",
  ],
};

/** Cluster cactus: 9 x 11, three stems joined by a bar. Wider than it is tall. */
const CACTUS_CLUSTER: Sprite = {
  width: 9,
  height: 11,
  rows: [
    "....#....",
    "....#....",
    "#...#...#",
    "#...#...#",
    "#...#...#",
    "#########",
    "#...#...#",
    "#...#...#",
    "#...#...#",
    "#...#...#",
    "###.###.#",
  ],
};

export const DINO_SPRITES = {
  runA: DINO_RUN_A,
  runB: DINO_RUN_B,
  jump: DINO_JUMP,
} as const;

export const CACTUS_SPRITES = {
  small: CACTUS_SMALL,
  medium: CACTUS_MEDIUM,
  cluster: CACTUS_CLUSTER,
} as const;

export type DinoPose = keyof typeof DINO_SPRITES;
export type CactusKind = keyof typeof CACTUS_SPRITES;

const INK_BY_CHAR: Record<string, Ink | null> = {
  "#": "main",
  o: "light",
  "+": "shade",
  ".": null,
};

/** Turns a sprite into a flat per-pixel list once, so drawing never re-parses text. */
export type RasterisedSprite = {
  readonly width: number;
  readonly height: number;
  /** One entry per opaque pixel: x, y, and ink role. */
  readonly pixels: ReadonlyArray<{ x: number; y: number; ink: Ink }>;
};

export function rasterise(sprite: Sprite): RasterisedSprite {
  const pixels: { x: number; y: number; ink: Ink }[] = [];

  sprite.rows.forEach((row, y) => {
    for (let x = 0; x < sprite.width; x += 1) {
      const ink = INK_BY_CHAR[row[x] ?? "."];
      if (ink) pixels.push({ x, y, ink });
    }
  });

  return { width: sprite.width, height: sprite.height, pixels };
}

/** Tight box around the inked pixels, used for collision and for centring sprites. */
export function inkBounds(sprite: Sprite): { x: number; y: number; width: number; height: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  sprite.rows.forEach((row, y) => {
    for (let x = 0; x < sprite.width; x += 1) {
      if (!INK_BY_CHAR[row[x] ?? "."]) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  });

  if (minX === Infinity) return { x: 0, y: 0, width: sprite.width, height: sprite.height };

  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}
