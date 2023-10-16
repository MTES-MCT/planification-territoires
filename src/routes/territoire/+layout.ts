import { get } from "svelte/store";
import isEqual from "lodash/isEqual";

import {
  getRegionData,
  getCompletionLevelsFromURL,
  getNewTargetsFromURL,
} from "$lib/utils";
import { completionLevels, newTargets } from "$lib/stores";

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, url }) => {
  const regionSlug = params.slug as string;
  const regionData = getRegionData(regionSlug);
  if (url.searchParams.toString()) {
    // Rechargement des paramètres du réalisé
    const currentCompletionRegionData = get(completionLevels)[regionSlug];
    const completionDataFromQS = getCompletionLevelsFromURL(url.searchParams);
    if (!isEqual(currentCompletionRegionData, completionDataFromQS)) {
      completionLevels.update((cls) => ({
        ...cls,
        [regionSlug]: completionDataFromQS,
      }));
    }

    // Rechargement des nouveaux objectifs
    const currentTargetRegionData = get(newTargets)[regionSlug];
    const newTargetDataFromQS = getNewTargetsFromURL(url.searchParams);
    if (!isEqual(currentTargetRegionData, newTargetDataFromQS)) {
      newTargets.update((cls) => ({
        ...cls,
        [regionSlug]: newTargetDataFromQS,
      }));
    }
  }

  // Mise à jour des nouveaux objectifs à partir des objectifs initiaux
  regionData.forEach((action) => {
    if (get(newTargets)[regionSlug][action.id] == null) {
      newTargets.update((cls) => ({
        ...cls,
        [regionSlug]: {
          ...cls[regionSlug],
          [action.id]:
            action.objPhys - get(completionLevels)[regionSlug][action.id],
        },
      }));
    }
  });
  return {
    regionSlug,
    regionData,
  };
};
