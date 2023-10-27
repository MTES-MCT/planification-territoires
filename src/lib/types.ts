export interface Action {
  id: string;
  leverName: string;
  region: string;
  objCO2: number;
  objPhys: number;
  unitPhys: string;
  unitCO2: string;
  point_de_depart_2019?: number;
  sector: string;
  group: string;
  ratioCO2toPhys: number;
  pathSector: string;
  pathGroup: string;
  regionSlug: string;
  editionDisabled: boolean;
  noTranslation: boolean;
  comment1: string;
  comment2: string;
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
// à multiplier par ratioCO2toPhys pour l'obtenir en unités physiques
export type RegionCompletionLevels = {
  [leverName: string]: number;
};
export type CompletionLevels = {
  [region: string]: RegionCompletionLevels;
};

// Cible définie par l'utilisateur, en en ktCO₂e
// // à multiplier par ratioCO2toPhys pour l'obtenir en unités physiques
export type RegionNewTargets = {
  [leverName: string]: number | null;
};
export type NewTargets = {
  [region: string]: RegionNewTargets;
};
