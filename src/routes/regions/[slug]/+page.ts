import type { PageLoad } from "./$types";
import { getRegionData } from "$lib/utils";

export const load: PageLoad = async ({ params }) => {
  return {
    region: params.slug,
    regionData: getRegionData(params.slug),
  };
};
