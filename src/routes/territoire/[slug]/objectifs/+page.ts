import type { PageLoad } from "./$types";
import { getRegionName } from "$lib/utils";

export const load: PageLoad = async ({ parent }) => {
  const { regionSlug } = await parent();

  return {
    title: getRegionName(regionSlug),
    hasNavigation: true,
  };
};
