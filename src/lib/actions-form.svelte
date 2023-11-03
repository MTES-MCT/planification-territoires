<script lang="ts">
  import type {
    Action,
    RegionCompletionLevels,
    RegionNewTargets,
  } from "$lib/types";
  import { clamp } from "$lib/utils";
  import { groupBy, tidy } from "@tidyjs/tidy";
  import DoubleEntryInput from "$lib/double-entry-input.svelte";

  export let onUpdate: (newValueCO2: number, action: Action) => void;
  export let inputLabel: string;
  export let regionData: Action[];
  export let initialValuesCO2: RegionCompletionLevels | RegionNewTargets;
  export let targetValuesCO2: { [leverName: string]: number };
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

    <div class="mb-4 flex flex-col gap-y-10">
      {#each sector.values as action}
        {@const initialValueCO2 = initialValuesCO2[action.id]}
        {@const targetValueCO2 = targetValuesCO2[action.id]}
        <DoubleEntryInput
          {action}
          progress={targetValueCO2 && !noProgress
            ? clamp((initialValueCO2 ?? 0) / targetValueCO2, 0, 1)
            : 0}
          {inputLabel}
          onUpdate={(newValueCO2, action) => onUpdate(newValueCO2, action)}
          initialValueCO2={initialValueCO2 ?? 0}
          {targetValueCO2}
        />
      {/each}
    </div>
  </fieldset>
{/each}
