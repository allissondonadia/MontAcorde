import { Dot, Position, FRETBOARD_CONFIG } from "../types/chord";

export const getDotPosition = (dot: Dot): Position => {
  const casaSpacing =
    (FRETBOARD_CONFIG.height - 60) / FRETBOARD_CONFIG.casaCount;
  const cordaSpacing =
    (FRETBOARD_CONFIG.width - 60) / (FRETBOARD_CONFIG.cordaCount - 1);

  const sx = 28 + (FRETBOARD_CONFIG.cordaCount - dot.corda) * cordaSpacing;
  const sy =
    30 + (dot.casa - 1) * casaSpacing + FRETBOARD_CONFIG.casaDeslocamento;

  return { cx: sx, cy: sy };
};
