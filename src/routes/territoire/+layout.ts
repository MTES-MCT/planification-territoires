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
  return {
    regionSlug,
    regionData: getRegionData(regionSlug),
  };
};
