<script lang="ts">
  import { getColor } from "$lib/utils";
  import completionLevels from "$lib/completion-levels-store";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "./sub-title.svelte";
  import DataDescription from "./data-description.svelte";
  import type { Lever } from "$lib/types";

  export let lever: Lever;
  $: completionCO2 = toC02();

  function toC02() {
    return (
      $completionLevels[lever.region][lever.id] / lever.ratioCO2toPhys
    ).toFixed(2);
  }

  function updateCompletionLevels(evt: Event, ratio = 1) {
    let target = evt.target as HTMLInputElement;
    $completionLevels[lever.region][lever.id] =
      target.value !== ""
        ? Math.floor(Number(target.value) * ratio)
        : undefined;
  }

  function handlePhysRangeChanged(evt: Event) {
    updateCompletionLevels(evt);
    completionCO2 = toC02();
  }

  function handleCO2RangeChanged(evt: Event) {
    updateCompletionLevels(evt, lever.ratioCO2toPhys);
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
      progress={$completionLevels[lever.region][lever.id] / lever.objPhys}
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
    <SubTitle label="Action déjà menée ou contractualisée" />
    <div class="mb-8 flex items-end gap-x-3">
      <div class="flex-1">
        <label class="fr-label !text-sm" for={lever.id}>
          <span class="block text-xs text-gray-500"
            >L'unité est :
          </span>{lever.unitPhys}</label
        >
        <input
          class="fr-input"
          name={lever.id}
          type="number"
          step={Math.floor(lever.objPhys / 20)}
          min={0}
          id={lever.id}
          value={$completionLevels[lever.region][lever.id]}
          on:input={handlePhysRangeChanged}
        />
      </div>
      <div class="flex h-full items-end pb-1 text-sm md:text-lg">⇄</div>
      <div class="flex-1">
        <label class="fr-label !text-sm" for={`${lever.id}-co2`}>
          <span class="block text-xs text-gray-500">L'unité est : </span>
          {lever.unitCO2}</label
        >
        <input
          class="fr-input"
          name={`${lever.id}-co2`}
          type="number"
          step={10}
          min={0}
          id={`${lever.id}-co2`}
          value={completionCO2}
          on:input={handleCO2RangeChanged}
        />
      </div>
    </div>

    <SubTitle label="Objectif à atteindre en 2030" />
    <div class="flex gap-x-3">
      <DataDescription value={lever.objPhys} unit="unités physique" />
      <div class="flex h-full items-center pt-2 text-sm md:text-lg">⇄</div>
      <DataDescription
        value={lever.objPhys / lever.ratioCO2toPhys}
        unit="ktCO₂"
      />
    </div>
  </div>
</div>
