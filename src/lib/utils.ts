import showdown from "showdown";

import rawActionsData from "$lib/assets/data.json";
import type { Action } from "$lib/types";
import { arrange, distinct, filter, select, tidy } from "@tidyjs/tidy";

const actionsData = rawActionsData.map((row) => ({
  ...row,
  objPhys: row.objCO2 * row.ratioCO2toPhys,
  regionSlug: normalizeString(row.region),
})) as Action[];

export function prettyNum(
  number: number,
  { roundAll = true, unitCO2 = true, negate = false, forceSign = false } = {}
) {
  const absNumber = Math.abs(number);
  const numberStr = absNumber.toLocaleString("fr-FR", {
    maximumFractionDigits: roundAll ? 0 : 2,
  });
  let prefix = "";
  if (negate) {
    number = -number;
  }
  if (numberStr !== "0") {
    if (number < 0) {
      prefix = "−";
    } else if (number > 0 && forceSign) {
      prefix = "+";
    }
  }
  const suffix = unitCO2 ? ` ktCO₂e` : "";
  return `<span class="tracking-normal">${prefix}${numberStr}</span>${suffix}`;
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
  return getRegionsNames().find(
    (name) => normalizeString(name) === regionSlug
  ) as string;
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
  return tidy(actionsData, select("id"), distinct("id")).map((row) => row.id);
}

export function getColor(sector: string) {
  // Couleurs issues de https://colorbrewer2.org/#type=qualitative&scheme=Set3&n=12
  switch (sector) {
    case "Transport":
      return "#9fceef";
    case "Agriculture, Forêts et Sols":
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
      // et enfin, on remplace tous les caractères non ascii
      .replace(/([^0-9a-zA-Z])/g, "-")
  );
}

export function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}

export function markdownToHtml(markdownText: string, titleLevel = 3) {
  const mdConverter = new showdown.Converter({
    headerLevelStart: titleLevel,
    openLinksInNewWindow: true,
    simplifiedAutoLink: true,
    simpleLineBreaks: true,
  });

  // corrections typographiques
  const correctedText = markdownText
    // espace insécable avant `:`
    .replace(/ :/g, " :")
    // espace fine insécable avant `;!?»`
    .replace(/ [;!?»]/g, " $1")
    // espace fine insécable après `«`
    .replace(/« /g, "$1 ");

  return mdConverter.makeHtml(correctedText);
}

export function mtmEvent(category: string, action: string, name: string) {
  if (window._paq) {
    window._paq.push(["trackEvent", category, action, name]);
  }
}
