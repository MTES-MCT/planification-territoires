import { get } from "svelte/store";
import isEqual from "lodash/isEqual";

import { getRegionData, getCompletionLevelsFromURL } from "$lib/utils";
import completionLevels from "$lib/completion-levels-store";

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, url }) => {
  const regionSlug = params.slug as string;

  if (url.searchParams.toString()) {
    const currentRegionData = get(completionLevels)[regionSlug];
    const dataFromQS = getCompletionLevelsFromURL(url.searchParams);
    if (!isEqual(currentRegionData, dataFromQS)) {
      completionLevels.update((cls) => ({ ...cls, [regionSlug]: dataFromQS }));
    }
  }
  return {
    regionSlug,
    regionData: getRegionData(regionSlug),
  };
};
