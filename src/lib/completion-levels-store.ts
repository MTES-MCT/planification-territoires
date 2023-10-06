import { writable } from "svelte/store";

import { getIdNames, getRegionsSlugs } from "$lib/utils";
import type { CompletionLevels } from "$lib/types";

function getEmptyCompletionLevels(): CompletionLevels {
  return Object.fromEntries(
    getRegionsSlugs().map((regionSlug) => [
      regionSlug,
      Object.fromEntries(getIdNames().map((id) => [id, 0])),
    ])
  );
}
const completionLevels = writable<CompletionLevels>(getEmptyCompletionLevels());
export default completionLevels;
