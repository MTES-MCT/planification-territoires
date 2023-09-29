<script lang="ts">
  import { getColor } from "$lib/utils";
  import type { CompletionLevels, Lever } from "$lib/types";
  import DataDescription from "./data-description.svelte";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "./sub-title.svelte";

  export let lever: Lever;
  export let completionLevels: CompletionLevels;

  const handleRangeChanged = (ratio: number) => (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    completionLevels[lever.id] =
      target.value !== ""
        ? Math.floor(Number(target.value) * ratio)
        : undefined;
  };
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
  <div class="flex flex-grow flex-col justify-between border border-t-0 p-6">
    <SubTitle label="Objectif à atteindre en 2030" />
    <div
      class="mb-6 flex gap-x-4 rounded-xl border px-4 py-3"
      style={`border-color:${getColor(lever.sector)}`}
    >
      <DataDescription value={lever.objPhys} unit="unités physique" />
      <div class="flex h-full items-center pt-2 text-lg">⇄</div>
      <DataDescription value={lever.objPhys / lever.ratio} unit="ktCO₂" />
    </div>

    <SubTitle label="Action déjà menée ou contractualisée" />
    <div class="flex items-end gap-x-4">
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
          on:input={handleRangeChanged(1)}
        />
      </div>
      <div class="flex h-full items-end pb-1 text-lg">⇄</div>
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
          value={((completionLevels[lever.id] ?? 0) / lever.ratio).toFixed(2)}
          on:input={handleRangeChanged(lever.ratio)}
        />
      </div>
    </div>
  </div>
</div>
