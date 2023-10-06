import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { region } = await parent();
  return {
    title: `Résultats | ${region}`,
  };
};
