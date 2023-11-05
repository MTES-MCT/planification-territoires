<script lang="ts">
  import {
    clamp,
    getColor,
    markdownToHtml,
    sanitizeValueCO2,
  } from "$lib/utils.js";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "$lib/sub-title.svelte";
  import RichText from "$lib/rich-text.svelte";
  import DataDescription from "$lib/data-description.svelte";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let progress: number | undefined = undefined;
  export let inputLabel: string;
  export let initialValueCO2: number;
  export let targetValueCO2: number;

  export let onUpdate: (newValuePhys: number, action: Action) => void;

  const startPoint = action.startPoint2019 ?? 0;
  const inverted = action.ratioCO2toPhys < 0;

  export function sanitizeValuePhys(value: string | number | null): number {
    const numValue = Number(value) || 0;
    return inverted
      ? clamp(numValue, 0, startPoint)
      : Math.max(numValue, startPoint);
  }

  function roundTo1D(num: number) {
    return Math.round(num * 10) / 10;
  }

  function getValuePhysFromCO2(value: number) {
    return Math.max(0, startPoint + value * action.ratioCO2toPhys);
  }

  let valuePhys = roundTo1D(getValuePhysFromCO2(initialValueCO2));
  let valueCO2 = Math.round(initialValueCO2);

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const rawValueCO2 = sanitizeValueCO2(target.value);
    valueCO2 = Math.round(rawValueCO2);
    target.value = valueCO2;
    valuePhys = roundTo1D(getValuePhysFromCO2(rawValueCO2));
    onUpdate(valueCO2, action);
  }

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const rawValuePhys = sanitizeValuePhys(target.value);
    valuePhys = roundTo1D(rawValuePhys);
    target.value = valuePhys;
    valueCO2 = Math.round((rawValuePhys - startPoint) / action.ratioCO2toPhys);
    onUpdate(valueCO2, action);
  }

  let titleHeight = 50;
</script>

<div class="gap-x-8 sm:flex">
  <div class="flex basis-3/5 break-inside-avoid flex-col items-stretch">
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
    <!-- Colonne de gauche : saisie -->
    <h1 class="sr-only">{action.leverName}</h1>
    <div
      class="flex flex-1 flex-col border border-t-0 px-6 py-6"
      style={`border-color:${getColor(action.sector)}`}
    >
      {#if !action.editionDisabled}
        <div class="flex gap-x-5">
          <div class="flex-1 border-r pb-8">
            <SubTitle label="Objectif à atteindre en 2030" />
          </div>
          <SubTitle label={inputLabel} />
        </div>
      {/if}
      <!--  Emissions évitées ktCO₂ -->
      {#if !action.editionDisabled}
        <div class="flex gap-x-5">
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
        <!--  soit -->
        {#if !action.noTranslation}
          <div class="flex gap-x-5">
            <div
              class="flex-1 border-r py-2 text-right text-xs font-medium text-gray-500"
            >
              <span class="pr-5">Soit</span>
            </div>
            <div
              class="flex-1 py-2 text-right text-xs font-medium text-gray-500"
            >
              Soit
            </div>
          </div>
          <!--  Unités physiques -->
          <div class="flex gap-x-5">
            <DataDescription
              value={roundTo1D(getValuePhysFromCO2(targetValueCO2))}
              unit={action.unitPhys}
              round={false}
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
                step={0.1}
                min={inverted ? 0 : Math.floor(startPoint)}
                max={inverted ? Math.ceil(startPoint) : undefined}
                id={action.id}
                value={valuePhys}
                on:change={handlePhysInputChanged}
                disabled={action.editionDisabled}
              />
              {#if inverted}
                <div class="mt-1 text-xs italic text-gray-500">
                  Les émissions évitées augmentent quand cette valeur diminue
                </div>
              {/if}
            </div>
          </div>
        {/if}
      {:else}
        <RichText mdText={markdownToHtml(action.disabledComment)} />
      {/if}
    </div>
  </div>
  <!-- Colonne de droite : explications -->
  <div class="mt-4 basis-2/5">
    {#if action.comment}
      <div class="markdown">
        <RichText mdText={markdownToHtml(action.comment)} clamp />
      </div>
    {/if}
  </div>
</div>
