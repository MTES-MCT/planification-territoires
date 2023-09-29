<script lang="ts">
  import { getColor, prettifyNumber } from "$lib/utils";
  import type { CompletionLevels, Lever } from "$lib/types";
  import DataDescription from "./data-description.svelte";

  export let lever: Lever;
  export let completionLevels: CompletionLevels;

  function handleRangeChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    completionLevels[lever.id] =
      target.value !== "" ? Number(target.value) : undefined;
  }

  $: objShare = (100 * (completionLevels[lever.id] || 0)) / lever.objPhys;
</script>

<div class="overflow-hidden rounded-2xl border p-6">
  <span
    class="rounded-full px-3 py-1 text-xs font-semibold"
    style="background-color: {getColor(lever.sector)}">{lever.name}</span
  >
  <div class="mt-8 flex h-12 items-end pb-2">
    <label class="fr-label" for={lever.id}>{lever.tradPhys}</label>
  </div>
  <input
    class="fr-input max-w-md"
    name={lever.id}
    type="number"
    step={Math.floor(lever.objPhys / 20)}
    bind:value={completionLevels[lever.id]}
    id={lever.id}
    on:input={handleRangeChanged}
  />
  <div class="mt-2 text-xs text-gray-500">
    Représente une réduction de {prettifyNumber(
      (completionLevels[lever.id] || 0) / lever.ratio
    )} ktCO₂
  </div>
  <dl class="mb-2 mt-4 border-t pt-4">
    <DataDescription
      label="Objectif en unité physique"
      value={prettifyNumber(lever.objPhys)}
    />
  </dl>
  <div
    class="flex h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
  >
    <div
      class="flex flex-col justify-center overflow-hidden"
      role="progressbar"
      style="width: {objShare}%; background-color: {getColor(lever.sector)}"
      aria-valuenow={objShare}
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
  </div>
</div>
