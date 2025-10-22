export type Dot = {
  corda: number;
  casa?: number;
  finger?: string;
  type?: "dot" | "square" | "gray" | "outline" | "x" | "rounded";
};

export type Position = {
  cx: number;
  cy: number;
};

export interface ChordProps {
  dot: Dot;
  index: number;
}

export const FRETBOARD_CONFIG = {
  casaDeslocamento: 95,
  casaCount: 5,
  cordaCount: 6,
  width: 528,
  height: 632,
  backgroundImageWidth: 528,
  backgroundImageHeight: 700,
} as const;

export const BASE_DOTS: Dot[] = [
  { corda: 6, type: "gray" },
  { corda: 5, type: "outline" },
  { corda: 4, type: "outline" },
  { corda: 3, type: "outline" },
  { corda: 2, type: "outline" },
  { corda: 1, type: "outline" },
];

export const PRESETS: Record<string, Dot[]> = {
  Am: [
    { corda: 2, casa: 1, finger: "1" },
    { corda: 3, casa: 2, finger: "3" },
    { corda: 4, casa: 2, finger: "2" },
    { corda: 5, type: "x" },
    { corda: 4, type: "gray" },
    { corda: 3, type: "outline" },
    { corda: 2, type: "outline" },
    { corda: 1, type: "outline" },
  ],
  C: [
    { corda: 1, casa: 1, finger: "1" },
    { corda: 4, casa: 2, finger: "2" },
    { corda: 5, casa: 3, finger: "3" },
  ],
  Cm7: [
    { corda: 5, casa: 3, type: "rounded" },
    { corda: 2, casa: 4, finger: "2" },
    { corda: 4, casa: 5, finger: "3" },
  ],
  D: [
    { corda: 3, casa: 2, finger: "1" },
    { corda: 1, casa: 2, finger: "2" },
    { corda: 2, casa: 3, finger: "3" },
  ],
  F: [
    { corda: 6, casa: 1, type: "rounded" },
    { corda: 3, casa: 2, finger: "2" },
    { corda: 5, casa: 3, finger: "3" },
    { corda: 4, casa: 3, finger: "4" },
  ],
  G: [
    { corda: 5, casa: 2, finger: "1" },
    { corda: 6, casa: 3, finger: "2" },
    { corda: 2, casa: 3, finger: "3" },
    { corda: 1, casa: 3, finger: "4" },
  ],
};
