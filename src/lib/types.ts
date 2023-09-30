export interface Lever {
  id: string;
  name: string;
  region: string;
  objCO2: number;
  objPhys: number;
  unitPhys: string;
  unitCO2: string;
  sector: string;
  group: string;
  ratioCO2toPhys: number;
  path: string;
  path2: string;
  progressionRatio?: number;
}

// État actuel de l'objectif, en unités physiques
// à diviser par ratioCO2toPhys pour l'obtenir en ktCO₂eq
export type RegionCompletionLevels = {
  [leverName: string]: number;
};
export type CompletionLevels = {
  [region: string]: RegionCompletionLevels;
};
