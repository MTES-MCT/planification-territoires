export interface Action {
  id: string;
  leverName: string;
  region: string;
  objCO2: number;
  unitPhys: string;
  unitCO2: string;
  pointDeDepart2019?: number;
  sector: string;
  group: string;
  ratioCO2toPhys: number;
  pathSector: string;
  pathGroup: string;
  regionSlug: string;
  editionDisabled: boolean;
  noTranslation: boolean;
  comment: string;
}

export interface Lever {
  name: string;
  group: string;
  sector: string;
  pathSector: string;
  pathGroup: string;
  objCO2: number;
  progressionCO2: number;
}

// Part de l’objectif déjà réalisée ou planifiée, en ktCO₂e
export type RegionCompletionLevels = {
  [leverName: string]: number;
};
export type CompletionLevels = {
  [region: string]: RegionCompletionLevels;
};

// Cible définie par l'utilisateur, en en ktCO₂e
export type RegionNewTargets = {
  [leverName: string]: number | null;
};
export type NewTargets = {
  [region: string]: RegionNewTargets;
};
