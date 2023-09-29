export interface Lever {
  id: string;
  name: string;
  tradPhys: string;
  region: string;
  objCO2: number;
  objPhys: number;
  sector: string;
  group: string;
  ratio: number;
  path: string;
  path2: string;
  progressionRatio?: number;
}

// État actuel de l'objectif, en unités physiques
// à diviser par ratio pour l'obtenir en ktCO₂eq
export interface CompletionLevels {
  [leverName: string]: number | undefined;
}
