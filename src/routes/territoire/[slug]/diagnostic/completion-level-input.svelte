<script lang="ts">
  import { clamp, getColor } from "$lib/utils";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "./sub-title.svelte";
  import DataDescription from "./data-description.svelte";
  import type { Lever } from "$lib/types";

  export let lever: Lever;
  export let valuePhys: number;
  export let onUpdate: (newValuePhys: number, lever: Lever) => void;

  let valueCO2 = +(valuePhys / lever.ratioCO2toPhys).toFixed(4);

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const newValuePhys = Number(target.value) || 0;
    valueCO2 = +(newValuePhys / lever.ratioCO2toPhys).toFixed(4);
    onUpdate(newValuePhys, lever);
  }

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valueCO2 = Number(target.value) || 0;
    const newValuePhys = +(valueCO2 * lever.ratioCO2toPhys).toFixed(4);
    onUpdate(newValuePhys, lever);
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
      progress={clamp(valuePhys / lever.objPhys, 0, 1)}
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
    class="flex flex-col border border-t-0 p-4"
    style={`border-color:${getColor(lever.sector)}`}
  >
    <div class="flex gap-x-4">
      <div class="flex-1 border-r pb-6">
        <div class="max-w-[180px] pr-4">
          <SubTitle label="Objectif à atteindre en 2030" />
        </div>
      </div>
      <SubTitle label="Action déjà menée ou contractualisée" />
    </div>

    <div class="flex gap-x-4">
      <DataDescription value={lever.objPhys} unit={lever.unitPhys} />
      <div class="flex-1">
        <label class="sr-only" for={lever.id}>
          {lever.unitPhys}
        </label>
        <input
          class="fr-input"
          name={lever.id}
          type="number"
          step="any"
          min={0}
          id={lever.id}
          value={valuePhys}
          on:input={handlePhysInputChanged}
        />
      </div>
    </div>

    <div class="flex gap-x-4">
      <div
        class="flex-1 border-r py-2 text-right text-xs font-medium text-gray-500"
      >
        <span class="pr-4">Soit</span>
      </div>
      <div class="flex-1 py-2 text-right text-xs font-medium text-gray-500">
        Soit
      </div>
    </div>

    <div class="flex gap-x-4">
      <DataDescription
        value={lever.objPhys / lever.ratioCO2toPhys}
        unit={lever.unitCO2}
      />
      <div class="flex-1">
        <label class="sr-only" for={`${lever.id}-co2`}>
          {lever.unitCO2}
        </label>
        <input
          class="fr-input"
          name={`${lever.id}-co2`}
          type="number"
          step="any"
          min={0}
          id={`${lever.id}-co2`}
          value={valueCO2}
          on:input={handleCO2InputChanged}
        />
      </div>
    </div>
  </div>
</div>
