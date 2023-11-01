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

  const startPoint = Math.round(action.pointDeDepart2019 ?? 0);

  let valuePhys =
    startPoint + Math.round(initialValueCO2 * action.ratioCO2toPhys);
  let valueCO2 = initialValueCO2;

  function sanitizeNumber(numberStr: string): number {
    if (numberStr) {
      return Math.round(Number(numberStr));
    }
    return 0;
  }

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valueCO2 = sanitizeNumber(target.value);
    target.value = valueCO2;
    valuePhys = startPoint + Math.round(valueCO2 * action.ratioCO2toPhys);
    onUpdate(valueCO2, action);
  }

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valuePhys = Math.max(sanitizeNumber(target.value), startPoint);
    target.value = valuePhys;
    valueCO2 = Math.round((valuePhys - startPoint) / action.ratioCO2toPhys);
    onUpdate(valueCO2, action);
  }
  let titleHeight = 50;
</script>

<div class="flex break-inside-avoid flex-col">
  <svg width="100%" height={titleHeight + 10}>
    <DiagonalHatchPattern />
    <ProgressBlock height={200} fill={getColor(action.sector)} {progress} />
    <title>{action.leverName}</title>
    <foreignObject width="100%" height="100%">
      <h3
        class="px-4 pt-3 text-lg font-bold opacity-75"
        bind:clientHeight={titleHeight}
      >
        {action.leverName}
      </h3>
    </foreignObject>
  </svg>

  <h1 class="sr-only">{action.leverName}</h1>
  <div
    class="flex flex-col border border-t-0 px-4 pb-2 pt-3"
    style={`border-color:${getColor(action.sector)}`}
  >
    <div class="flex gap-x-4">
      <div class="flex-1 border-r pb-6">
        <div class="inline-flex items-center pr-1">
          <SubTitle label="Objectif à atteindre en 2030" />
          {#if action.comment2}
            <button
              class="fr-btn--tooltip fr-btn"
              id="button-tooltip-{action.id}"
              type="button"
              aria-describedby="tooltip-{action.id}"
            >
              Information contextuelle
            </button>
            <div
              class="fr-tooltip fr-placement [&>p]:mb-0 [&>p]:text-sm"
              id="tooltip-{action.id}"
              role="tooltip"
              aria-hidden="true"
            >
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              {@html markdownToHtml(action.comment2)}
            </div>
          {/if}
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
          value={startPoint + targetValueCO2 * action.ratioCO2toPhys}
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
            min={startPoint}
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
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html markdownToHtml(action.comment1)}
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .markdown :global(p) {
    @apply text-xs leading-tight text-gray-800 md:text-sm;
  }

  .markdown :global(li) {
    @apply text-xs leading-tight text-gray-500 md:text-sm;
  }
  .markdown > :global(p:last-of-type) {
    @apply mb-0;
  }
</style>
