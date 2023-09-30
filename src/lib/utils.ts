import rawLeversData from "$lib/assets/data.json";
import type { Lever, RegionCompletionLevels } from "$lib/types";
import { filter, tidy, select, distinct, arrange } from "@tidyjs/tidy";

const leversData = rawLeversData as Lever[];

export function prettyNum(number: number, roundBig = false) {
  return number.toLocaleString("fr-FR", {
    maximumFractionDigits: number < 1000 || !roundBig ? 2 : 0,
  });
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x));
}

export function getRegionData(regionName: string): Lever[] {
  return tidy(
    leversData,
    filter((d) => d.region === regionName)
  );
}

export function getRegionsNames(): string[] {
  return tidy(
    leversData,
    select("region"),
    distinct("region"),
    arrange((a, b) => a.region.localeCompare(b.region, "fr"))
  ).map((row) => row.region);
}

export function getSectorsNames(): string[] {
  return tidy(
    leversData,
    select("sector"),
    distinct("sector"),
    arrange((a, b) => a.sector.localeCompare(b.sector, "fr"))
  ).map((row) => row.sector);
}

export function getIdNames(): string[] {
  return tidy(
    leversData,
    select("id"),
    distinct("id"),
    arrange((a, b) => a.id.localeCompare(b.sector, "id"))
  ).map((row) => row.id);
}

export function getCompletionLevelsFromURL(
  searchParams: URLSearchParams
): RegionCompletionLevels {
  return Object.fromEntries(
    getIdNames().map((l) => [l, Number(searchParams.get(l)) || 0])
  );
}

export function getColor(sector: string) {
  // Couleurs issues de https://colorbrewer2.org/#type=qualitative&scheme=Set3&n=12
  switch (sector) {
    case "Transport":
      return "#9fceef";
    case "Agriculture/Forêts/Sols":
      return "#b3de69";

    case "Industrie":
      return "#fb8072";

    case "Énergie":
      return "#d9d9d9";

    case "Déchet":
      return "#bebada";

    case "Tertiaire":
      return "#ffed6f";

    case "Résidentiel":
      return "#fdb462";

    default:
      return "black";
  }
}
