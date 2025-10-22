export type Dot = {
  corda: number;
  casa: number;
  finger?: string | null;
  type?: "dot" | "square" | "gray" | "outline" | "x";
};

export type Position = {
  cx: number;
  cy: number;
};

export type SnapResult = {
  corda: number;
  casa: number;
};

export const FRETBOARD_CONFIG = {
  casaDeslocamento: 95,
  casaCount: 5,
  cordaCount: 6,
  width: 528,
  height: 632,
  backgroundImageWidth: 528,
  backgroundImageHeight: 700,
} as const;

export const PRESETS: Record<string, Dot[]> = {
  Am: [
    { corda: 2, casa: 1, finger: "1" },
    { corda: 3, casa: 2, finger: "3" },
    { corda: 4, casa: 2, finger: "2" },
    { corda: 5, casa: 5.5, type: "x" },
    { corda: 4, casa: 5.5, type: "gray" },
    { corda: 3, casa: 5.5, type: "outline" },
    { corda: 2, casa: 5.5, type: "outline" },
    { corda: 1, casa: 5.5, type: "outline" },
  ],
  C: [
    { corda: 1, casa: 1, finger: "1" },
    { corda: 4, casa: 2, finger: "2" },
    { corda: 5, casa: 3, finger: "3" },
  ],
  D: [
    { corda: 3, casa: 2, finger: "1" },
    { corda: 1, casa: 2, finger: "2" },
    { corda: 2, casa: 3, finger: "3" },
  ],
  G: [
    { corda: 5, casa: 2, finger: "1" },
    { corda: 6, casa: 3, finger: "2" },
    { corda: 2, casa: 3, finger: "3" },
    { corda: 1, casa: 3, finger: "4" },
  ],
};
