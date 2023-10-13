import { getRegionName } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { regionSlug } = await parent();
  return {
    title: `Objectifs | ${getRegionName(regionSlug)}`,
    hasNavigation: true,
  };
};
