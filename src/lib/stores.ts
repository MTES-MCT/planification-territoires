import { writable } from "svelte/store";

import { getIdNames, getRegionsSlugs } from "$lib/utils";
import type { CompletionLevels, NewTargets } from "$lib/types";

function getEmptyCompletionLevels(): CompletionLevels {
  return Object.fromEntries(
    getRegionsSlugs().map((regionSlug) => [
      regionSlug,
      Object.fromEntries(getIdNames().map((id) => [id, 0])),
    ])
  );
}
export const completionLevels = writable<CompletionLevels>(
  getEmptyCompletionLevels()
);

function getEmptyTargets(): NewTargets {
  return Object.fromEntries(
    getRegionsSlugs().map((regionSlug) => [
      regionSlug,
      Object.fromEntries(getIdNames().map((id) => [id, null])),
    ])
  );
}
export const newTargets = writable<NewTargets>(getEmptyTargets());
