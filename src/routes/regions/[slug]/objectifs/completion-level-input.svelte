<script lang="ts">
  import { prettifyNumber } from "$lib/utils";
  import type { CompletionLevels, Lever } from "$lib/types";

  export let lever: Lever;
  export let completionLevels: CompletionLevels;

  function handleRangeChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    completionLevels[lever.id] = Number(target.value);
  }
</script>

<div class="flex flex-row flex-wrap items-start gap-x-12 gap-y-4">
  <label for={lever.id} class=" ">
    <p><strong>{lever.label}</strong></p>
    <p>
      Objectif (unités physiques) : {prettifyNumber(lever.objPhys)}
    </p>
    <p>
      Objectif (ktCO₂) : {prettifyNumber(lever.objCO2)}
    </p>
    <p>
      Reste à faire (ktCO₂) : {prettifyNumber(
        (lever.objPhys - completionLevels[lever.id]) / lever.ratio
      )}
    </p>
  </label>
  <div class="flex flex-wrap gap-4">
    <input
      type="number"
      step={1}
      bind:value={completionLevels[lever.id]}
      class=" w-40 border bg-gray-100 p-2"
      id={lever.id}
      on:input={handleRangeChanged}
    />
  </div>
</div>
