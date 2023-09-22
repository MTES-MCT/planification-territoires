import rawLeversData from "$lib/data.json";
import type { CompletionLevels, Lever } from "$lib/types";
import { filter, tidy, select, distinct } from "@tidyjs/tidy";

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
