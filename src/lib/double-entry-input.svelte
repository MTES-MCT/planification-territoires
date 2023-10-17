<script lang="ts">
  import { getColor } from "$lib/utils.js";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "$lib/sub-title.svelte";
  import DataDescription from "$lib/data-description.svelte";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let progress: number | undefined = undefined;
  export let inputLabel: string;
  export let initialValuePhys: number;
  export let targetValuePhys: number;

  export let onUpdate: (newValuePhys: number, action: Action) => void;

  let valueCO2: number;

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const newValuePhys = Number(target.value) || 0;
    valueCO2 = +(newValuePhys / action.ratioCO2toPhys).toFixed(4);
    onUpdate(newValuePhys, action);
  }

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valueCO2 = Number(target.value) || 0;
    const newValuePhys = +(valueCO2 * action.ratioCO2toPhys).toFixed(4);
    onUpdate(newValuePhys, action);
  }

  $: valueCO2 = +(initialValuePhys / action.ratioCO2toPhys).toFixed(4);
</script>

<div class="flex break-inside-avoid flex-col">
  <svg width="100%" height={50}>
    <style>
      .title {
        font-size: 18px;
        font-weight: bold;
        fill-opacity: 0.75;
      }
    </style>
    <DiagonalHatchPattern />
    <ProgressBlock height={200} fill={getColor(action.sector)} {progress} />
    <title>{action.leverName}</title>
    <text>
      <tspan class="title" x="16" y="32">
        {action.leverName}
      </tspan>
    </text>
  </svg>

  <h1 class="sr-only">{action.leverName}</h1>
  <div
    class="flex flex-col border border-t-0 p-4"
    style={`border-color:${getColor(action.sector)}`}
  >
    <div class="flex gap-x-4">
      <div class="flex-1 border-r pb-6">
        <div class="max-w-[180px] pr-4">
          <SubTitle label="Objectif à atteindre en 2030" />
        </div>
      </div>
      <SubTitle label={inputLabel} />
    </div>

    <div class="flex gap-x-4">
      <DataDescription value={targetValuePhys} unit={action.unitPhys} />
      <div class="flex-1">
        <label class="sr-only" for={action.id}>
          {action.unitPhys}
        </label>
        <input
          class="fr-input"
          name={action.id}
          type="number"
          step="any"
          min={0}
          id={action.id}
          value={initialValuePhys}
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
        value={targetValuePhys / action.ratioCO2toPhys}
        unit={action.unitCO2}
      />
      <div class="flex-1">
        <label class="sr-only" for={`${action.id}-co2`}>
          {action.unitCO2}
        </label>
        <input
          class="fr-input"
          name={`${action.id}-co2`}
          type="number"
          step="any"
          min={0}
          id={`${action.id}-co2`}
          value={valueCO2}
          on:input={handleCO2InputChanged}
        />
      </div>
    </div>
  </div>
</div>