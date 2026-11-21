export const GRADIENT_DIRECTIONS = {
  TOP_TO_BOTTOM: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  BOTTOM_TO_TOP: { start: { x: 0, y: 1 }, end: { x: 0, y: 0 } },
  LEFT_TO_RIGHT: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  RIGHT_TO_LEFT: { start: { x: 1, y: 0 }, end: { x: 0, y: 0 } },
  DIAGONAL_TOP_LEFT: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  DIAGONAL_TOP_RIGHT: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
  DIAGONAL_BOTTOM_LEFT: { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
  DIAGONAL_BOTTOM_RIGHT: { start: { x: 1, y: 1 }, end: { x: 0, y: 0 } },
} as const;

export const GRADIENT_PRESETS = {
  WELCOME: {
    colors: ["#000000", "#1a1a1a", "#2d2d2d"],
    direction: GRADIENT_DIRECTIONS.TOP_TO_BOTTOM,
  },
  AUTH: {
    colors: ["#3E3A6D", "#8E44AD", "#6c5ce7"],
    direction: GRADIENT_DIRECTIONS.DIAGONAL_TOP_LEFT,
  },
  MAIN: {
    colors: ["#2d1b69", "#8E44AD", "#a29bfe"],
    direction: GRADIENT_DIRECTIONS.DIAGONAL_TOP_RIGHT,
  },
  SETTINGS: {
    colors: ["#2d2d2d", "#404040", "#5a5a5a"],
    direction: GRADIENT_DIRECTIONS.TOP_TO_BOTTOM,
  },
  ERROR: {
    colors: ["#2d1b1b", "#4a1f1f", "#6b2b2b"],
    direction: GRADIENT_DIRECTIONS.BOTTOM_TO_TOP,
  },
  SUCCESS: {
    colors: ["#1b2d1b", "#1f4a1f", "#2b6b2b"],
    direction: GRADIENT_DIRECTIONS.TOP_TO_BOTTOM,
  },
} as const;
