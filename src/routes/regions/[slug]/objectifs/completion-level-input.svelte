<script lang="ts">
  import { getColor } from "$lib/utils";
  import type { CompletionLevels, Lever } from "$lib/types";
  import DataDescription from "./data-description.svelte";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "./sub-title.svelte";

  export let lever: Lever;
  export let completionLevels: CompletionLevels;

  $: completionCO2 = toC02();

  function toC02() {
    return ((completionLevels[lever.id] ?? 0) / lever.ratio).toFixed(2);
  }

  function updateCompletionLevels(evt: Event, ratio = 1) {
    let target = evt.target as HTMLInputElement;
    completionLevels[lever.id] =
      target.value !== ""
        ? Math.floor(Number(target.value) * ratio)
        : undefined;
  }

  function handlePhysRangeChanged(evt: Event) {
    updateCompletionLevels(evt);
    completionCO2 = toC02();
  }

  function handleCO2RangeChanged(evt: Event) {
    updateCompletionLevels(evt, lever.ratio);
  }
</script>

<div class="flex flex-col">
  <svg width="100%" height={50}>
    <style>
      .title {
        font-size: 18px;
        font-weight: bold;
        fill-opacity: 0.75;
      }
    </style>
    <DiagonalHatchPattern />
    <ProgressBlock
      height={200}
      fill={getColor(lever.sector)}
      progress={(completionLevels[lever.id] || 0) / lever.objPhys}
    />
    <title>{lever.name}</title>
    <text>
      <tspan class="title" x="16" y="32">
        {lever.name}
      </tspan>
    </text>
  </svg>

  <h1 class="sr-only">{lever.name}</h1>
  <div
    class="flex flex-grow flex-col justify-between border border-t-0 p-6"
    style={`border-color:${getColor(lever.sector)}`}
  >
    <SubTitle label="Objectif à atteindre en 2030" />
    <div class="mb-6 flex gap-x-3 rounded-xl border px-4 py-2">
      <DataDescription value={lever.objPhys} unit="unités physique" />
      <div class="flex h-full items-center pt-2 text-sm md:text-lg">⇄</div>
      <DataDescription value={lever.objPhys / lever.ratio} unit="ktCO₂" />
    </div>

    <SubTitle label="Action déjà menée ou contractualisée" />
    <div class="flex items-end gap-x-3">
      <div class="flex-1">
        <label class="fr-label !text-sm" for={lever.id}
          >L'unité est : {lever.tradPhys}</label
        >
        <input
          class="fr-input"
          name={lever.id}
          type="number"
          step={Math.floor(lever.objPhys / 20)}
          id={lever.id}
          value={completionLevels[lever.id]}
          on:input={handlePhysRangeChanged}
        />
      </div>
      <div class="flex h-full items-end pb-1 text-sm md:text-lg">⇄</div>
      <div class="flex-1">
        <label class="fr-label mt-5 !text-sm" for={`${lever.id}-co2`}
          >L'unité est : ktCO₂
        </label>
        <input
          class="fr-input"
          name={`${lever.id}-co2`}
          type="number"
          step={10}
          id={`${lever.id}-co2`}
          value={completionCO2}
          on:input={handleCO2RangeChanged}
        />
      </div>
    </div>
  </div>
</div>
