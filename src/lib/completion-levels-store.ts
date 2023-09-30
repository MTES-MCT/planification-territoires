import { writable } from "svelte/store";

import { getRegionsNames, getIdNames } from "$lib/utils";
import type { CompletionLevels } from "$lib/types";

function getEmptyCompletionLevels(): CompletionLevels {
  return Object.fromEntries(
    getRegionsNames().map((regionName) => [
      regionName,
      Object.fromEntries(getIdNames().map((id) => [id, 0])),
    ])
  );
}

const completionLevels = writable<CompletionLevels>(getEmptyCompletionLevels());
export default completionLevels;
