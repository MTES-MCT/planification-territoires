import type { PageLoad } from "./$types";
import type { CompletionLevels, Lever } from "$lib/types";

import { tidy, filter } from "@tidyjs/tidy";

import rawLeversData from "$lib/data.json";
const leversData = rawLeversData as Lever[];

export const load: PageLoad = async ({ params, url }) => {
  const regionData: Lever[] = tidy(
    leversData,
    filter((d) => d.region === params.slug)
  );

  const completionLevels: CompletionLevels = Object.fromEntries(
    regionData.map((l) => [l.name, 0])
  );

  // Mise à jour de completionsLevels avec les paramètres de l’URL
  url.searchParams.forEach((value, key) => {
    completionLevels[key] = Number(value);
  });

  return {
    region: params.slug,
    regionData,
    completionLevels,
  };
};
