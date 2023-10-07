import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { regionData } = await parent();
  return {
    title: `Résultats | ${regionData[0]?.region}`,
  };
};
