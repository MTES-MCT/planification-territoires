<script lang="ts">
  import type {
    Action,
    RegionCompletionLevels,
    RegionNewTargets,
  } from "$lib/types";
  import { clamp } from "$lib/utils";
  import { groupBy, tidy } from "@tidyjs/tidy";
  import DoubleEntryInput from "$lib/double-entry-input.svelte";

  export let onUpdate: (newValuePhys: number, action: Action) => void;
  export let inputLabel: string;
  export let regionData: Action[];
  export let initialValuesPhys: RegionCompletionLevels | RegionNewTargets;
  export let targetValuesPhys: { [leverName: string]: number };
  export let noProgress = false;

  const sectors = tidy(
    regionData,
    groupBy(["sector"], [], groupBy.entriesObject())
  );
</script>

{#each sectors as sector}
  <fieldset class="mb-10">
    <legend class="mb-4 mt-2 w-full">
      <h2 class="mb-1">{sector.key}</h2>
    </legend>

    <div class="mb-4 grid gap-6 md:grid-cols-2">
      {#each sector.values as action}
        {@const initialValuePhys = initialValuesPhys[action.id]}
        {@const targetValuePhys = targetValuesPhys[action.id]}
        <DoubleEntryInput
          {action}
          progress={targetValuePhys && !noProgress
            ? clamp(initialValuePhys ?? 0 / targetValuePhys, 0, 1)
            : 0}
          {inputLabel}
          onUpdate={(newValuePhys, action) => onUpdate(newValuePhys, action)}
          initialValuePhys={initialValuePhys ?? 0}
          {targetValuePhys}
        />
      {/each}
    </div>
  </fieldset>
{/each}
