import rawLeversData from "$lib/assets/data.json";
import type { CompletionLevels, Lever } from "$lib/types";
import { filter, tidy, select, distinct, arrange } from "@tidyjs/tidy";

const leversData = rawLeversData as Lever[];

export function prettifyNumber(number: number) {
  if (Number.isFinite(number)) {
    let suffix = "";
    if (number > 10e6) {
      number /= 1e6;
      suffix = " M";
    } else if (number > 10000) {
      number /= 1000;
      suffix = " K";
    }
    return `${number.toLocaleString("fr-FR", {
      maximumFractionDigits: 2,
    })}${suffix}`;
  }
  return "";
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

export function getCompletionLevels(
  searchParams: URLSearchParams
): CompletionLevels {
  const leversId = tidy(leversData, select("id"), distinct("id"));
  const levels = Object.fromEntries(leversId.map((l) => [l.id, 0]));
  searchParams.forEach((value, key) => {
    levels[key] = Number(value);
  });
  return levels;
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

    case "Energie":
      return "#d9d9d9";

    case "Déchêt":
      return "#bebada";

    case "Tertiaire":
      return "#ffed6f";

    case "Résidentiel":
      return "#fdb462";

    default:
      return "red";
  }
}
