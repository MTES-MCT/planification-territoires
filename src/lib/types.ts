export interface Lever {
  id: string;
  label: string;
  category: string;
  region: string;
  objCO2: number;
  objPhys: number;
  sector: string;
  group: string;
  ratio: number;
  path: string;
  progressionRatio?: number;
}

export interface CompletionLevels {
  [leverName: string]: number | undefined;
}
