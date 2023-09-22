export interface Lever {
  category: string;
  name: string;
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
  [leverName: string]: number;
}