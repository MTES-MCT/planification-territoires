import { getRegionName } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { regionSlug } = await parent();
  return {
    title: `Ambition | ${getRegionName(regionSlug)}`,
    hasNavigation: true,
  };
};
