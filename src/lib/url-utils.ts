import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { completionLevels, newTargets } from "$lib/stores";

import type { Action } from "$lib/types";
import { getRegionData } from "$lib/utils";
import { get } from "svelte/store";

export function getQVKeyForNewTarget(key: string) {
  return `t-${key}`;
}

export function getQVKeyForCompleted(key: string) {
  return `c-${key}`;
}

export function updateURLfromStores(regionSlug: string) {
  const newSearchParams = new URLSearchParams(get(page).url.searchParams);
  const initialSearchParamsString = newSearchParams.toString();

  const regionData = getRegionData(regionSlug);
  const completionLevelsValue = get(completionLevels);
  const newTargetsValue = get(newTargets);

  // Réalisé ; on ne met à jour l'URL que pour les valeurs non nulles
  Object.entries(completionLevelsValue[regionSlug]).forEach(([key, value]) => {
    if (value) {
      newSearchParams.set(getQVKeyForCompleted(key), Number(value).toFixed(0));
    } else {
      newSearchParams.delete(getQVKeyForCompleted(key));
    }
  });

  // Nouveaux objectifs ; on ne met à jour l'URL que si la valeur diffère
  // de la valeur par défaut
  Object.entries(newTargetsValue[regionSlug]).forEach(([key, value]) => {
    if (value != null) {
      const action = regionData.find((action) => action.id === key) as Action;
      const defaultTargetValue =
        action.objCO2 - completionLevelsValue[regionSlug][key];
      if (Math.round(value) != Math.round(defaultTargetValue)) {
        newSearchParams.set(getQVKeyForNewTarget(key), value.toFixed(0));
      } else {
        newSearchParams.delete(getQVKeyForNewTarget(key));
      }
    } else {
      newSearchParams.delete(getQVKeyForNewTarget(key));
    }
  });

  if (newSearchParams.toString() !== initialSearchParamsString) {
    return goto(`?${newSearchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }
}
