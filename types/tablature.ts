export interface TablatureNote {
  string: number; // 1-6 (E-e)
  position: number; // Posição horizontal (0-100+)
  value: string; // Número da casa ou letra do dedo (P, I, M, A)
  type: "number" | "finger";
}

export const TABLATURE_CONFIG = {
  width: 1000,
  height: 400,
  stringSpacing: 36,
  topMargin: 95,
  leftMargin: 40,
  rightMargin: 40,
};

export const FINGER_TYPES = ["P", "I", "M", "A"] as const;

export const STRING_NAMES = ["E", "B", "G", "D", "A", "E"] as const;
