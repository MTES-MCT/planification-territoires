<script lang="ts">
  import { getColor, markdownToHtml } from "$lib/utils.js";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "$lib/sub-title.svelte";
  import DataDescription from "$lib/data-description.svelte";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let progress: number | undefined = undefined;
  export let inputLabel: string;
  export let initialValueCO2: number;
  export let targetValueCO2: number;

  export let onUpdate: (newValuePhys: number, action: Action) => void;

  $: valuePhys = Math.round(initialValueCO2 * action.ratioCO2toPhys);
  $: valueCO2 = initialValueCO2;

  function sanitizeNumber(numberStr: string): number {
    if (numberStr) {
      return Math.round(Number(numberStr));
    }
    return 0;
  }

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valueCO2 = sanitizeNumber(target.value);
    valuePhys = Math.round(valueCO2 * action.ratioCO2toPhys);
    onUpdate(valueCO2, action);
  }

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valuePhys = sanitizeNumber(target.value);
    valueCO2 = Math.round(valuePhys / action.ratioCO2toPhys);
    onUpdate(valueCO2, action);
  }
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
        <div class="pr-4">
          <SubTitle label="Objectif à atteindre en 2030" />
        </div>
      </div>
      <SubTitle label={inputLabel} />
    </div>

    <div class="flex gap-x-4">
      <DataDescription value={targetValueCO2} unit={action.unitCO2} />
      <div class="flex-1">
        <label class="sr-only" for={`${action.id}-co2`}>
          {action.unitCO2}
        </label>
        <input
          class="fr-input"
          name={`${action.id}-co2`}
          type="number"
          step={1}
          min={0}
          id={`${action.id}-co2`}
          value={valueCO2}
          on:change={handleCO2InputChanged}
          disabled={action.editionDisabled}
        />
      </div>
    </div>

    {#if !action.noTranslation}
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
          value={targetValueCO2 * action.ratioCO2toPhys}
          unit={action.unitPhys}
        />
        <div class="flex-1">
          <label class="sr-only" for={action.id}>
            {action.unitPhys}
          </label>
          <input
            lang="fr"
            class="fr-input"
            name={action.id}
            type="number"
            step={1}
            min={0}
            id={action.id}
            value={valuePhys}
            on:change={handlePhysInputChanged}
            disabled={action.editionDisabled}
          />
        </div>
      </div>
    {/if}

    {#if action.comment1}
      <div
        class="markdown mt-4 flex flex-row items-baseline gap-8 border-t p-2 !text-xl leading-tight text-gray-800"
      >
        <div class="text-base font-semibold">Commentaire</div>
        <div>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html markdownToHtml(action.comment1)}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .markdown > :global(p) {
    @apply text-xs leading-tight text-gray-800 md:text-sm;
  }
</style>
