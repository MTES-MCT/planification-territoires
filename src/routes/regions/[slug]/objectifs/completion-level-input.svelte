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

  function focusOnClick(evt: Event) {
    const target = evt.target as HTMLInputElement;
    target.select();
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
          step="any"
          min={0}
          id={lever.id}
          value={valuePhys}
          on:input={handlePhysInputChanged}
          on:focus={focusOnClick}
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
          step="any"
          min={0}
          id={`${lever.id}-co2`}
          value={valueCO2}
          on:input={handleCO2InputChanged}
          on:focus={focusOnClick}
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

<style lang="postcss">
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
