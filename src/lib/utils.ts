import rawActionsData from "$lib/assets/data.json";
import type { Action, RegionCompletionLevels } from "$lib/types";
import { filter, tidy, select, distinct, arrange } from "@tidyjs/tidy";

const actionsData = rawActionsData.map((row) => ({
  ...row,
  regionSlug: normalizeString(row.region),
})) as Action[];

export function prettyNum(
  number: number,
  { roundBig = false, roundAll = true, unitCO2 = true } = {}
) {
  const numberStr = number.toLocaleString("fr-FR", {
    maximumFractionDigits: roundAll ? 0 : number < 1000 || !roundBig ? 2 : 0,
  });
  return unitCO2 ? `${numberStr} ktCO₂e` : numberStr;
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(min, Math.min(max, x));
}

export function getRegionData(regionSlug: string): Action[] {
  return tidy(
    actionsData,
    filter((d) => d.regionSlug === regionSlug)
  );
}

export function getRegionsNames(): string[] {
  return tidy(
    actionsData,
    select("region"),
    distinct("region"),
    arrange((a, b) => a.region.localeCompare(b.region, "fr"))
  ).map((row) => row.region);
}

export function getRegionsSlugs(): string[] {
  return tidy(
    actionsData,
    select("regionSlug"),
    distinct("regionSlug"),
    arrange((a, b) => a.regionSlug.localeCompare(b.regionSlug, "fr"))
  ).map((row) => row.regionSlug);
}

export function getRegionName(regionSlug: string): string {
  return getRegionsNames().find((name) => normalizeString(name) === regionSlug);
}

export function getSectorsNames(): string[] {
  return tidy(
    actionsData,
    select("sector"),
    distinct("sector"),
    arrange((a, b) => a.sector.localeCompare(b.sector, "fr"))
  ).map((row) => row.sector);
}

export function getIdNames(): string[] {
  return tidy(
    actionsData,
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

export function normalizeString(str: string): string {
  return (
    str
      .trim()
      .toLowerCase()
      // décomposition canonique, les caractères accentués vont être décomposés en
      // caractère ascii + diacritique
      .normalize("NFD")
      // on supprime les diacritiques…
      .replace(/[\u0300-\u036f]/g, "")
      // et enfin on remplace tous les caractères non ascii
      .replace(/([^0-9a-zA-Z])/g, "-")
  );
}
