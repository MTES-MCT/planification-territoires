import type { PageLoad } from "./$types";
import { getCompletionLevels, getRegionData } from "$lib/utils";

export const load: PageLoad = async ({ params, url }) => {
  return {
    region: params.slug,
    regionData: getRegionData(params.slug),
    completionLevels: getCompletionLevels(url.searchParams),
  };
};
