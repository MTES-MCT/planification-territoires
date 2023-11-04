import { get } from "svelte/store";
import { completionLevels, newTargets } from "$lib/stores";

import type { Action } from "$lib/types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ parent }) => {
  const { regionSlug, regionData } = await parent();

  regionData.forEach((action: Action) => {
    if (get(newTargets)[regionSlug][action.id] == null) {
      newTargets.update((targets) => ({
        ...targets,
        [regionSlug]: {
          ...targets[regionSlug],
          // Si le realisé est déjà supérieur à l’objectif initial, on ne veut
          // pas proposer un chiffre négatif comme objectif futur !
          [action.id]: Math.max(
            0,
            action.objCO2 - get(completionLevels)[regionSlug][action.id]
          ),
        },
      }));
    }
  });
  return { regionData };
};
