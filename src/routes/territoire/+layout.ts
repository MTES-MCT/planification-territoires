import type { RegionCompletionLevels, RegionNewTargets } from "$lib/types";
import { getQVKeyForCompleted, getQVKeyForNewTarget } from "$lib/url-utils";

import { getIdNames, getRegionData } from "$lib/utils";
import { completionLevels, newTargets } from "$lib/stores";

import type { LayoutLoad } from "./$types";

let initialLoad = true;

function getCompletionLevelsFromURL(
  searchParams: URLSearchParams
): RegionCompletionLevels {
  return Object.fromEntries(
    getIdNames().map((id) => [
      id,
      Number(searchParams.get(getQVKeyForCompleted(id))) || 0,
    ])
  );
}

function getNewTargetsFromURL(searchParams: URLSearchParams): RegionNewTargets {
  return Object.fromEntries(
    getIdNames().map((id) => {
      const newTarget = searchParams.get(getQVKeyForNewTarget(id));
      return [id, newTarget != null ? Number(newTarget) : null];
    })
  );
}

export const load: LayoutLoad = async ({ params, url }) => {
  const regionSlug = params.slug as string;
  const regionData = getRegionData(regionSlug);
  if (initialLoad) {
    // Ce code est appelé au chargement initial, mais pas lors de la navigation
    // c'est le seul moment ou les paramètres de l'URL sont pris en compte
    if (url.searchParams.toString()) {
      // Rechargement des paramètres du réalisé
      const completionDataFromQS = getCompletionLevelsFromURL(url.searchParams);
      completionLevels.update((cls) => ({
        ...cls,
        [regionSlug]: completionDataFromQS,
      }));

      // Rechargement des nouveaux objectifs
      const newTargetDataFromQS = getNewTargetsFromURL(url.searchParams);
      newTargets.update((cls) => ({
        ...cls,
        [regionSlug]: newTargetDataFromQS,
      }));
    }
  }

  initialLoad = false;

  return {
    regionSlug,
    regionData,
  };
};
