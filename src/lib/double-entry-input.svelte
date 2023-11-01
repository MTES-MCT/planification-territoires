<script lang="ts">
  import { clamp, getColor, markdownToHtml } from "$lib/utils.js";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import ProgressBlock from "$lib/treemap/progressBlock.svelte";
  import SubTitle from "$lib/sub-title.svelte";
  import TextClamp from "$lib/text-clamp.svelte";
  import DataDescription from "$lib/data-description.svelte";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let progress: number | undefined = undefined;
  export let inputLabel: string;
  export let initialValueCO2: number;
  export let targetValueCO2: number;

  export let onUpdate: (newValuePhys: number, action: Action) => void;

  function sanitizeNumber(numberStr: string): number {
    if (numberStr) {
      return Math.round(Number(numberStr));
    }
    return 0;
  }

  function getValuePhysFromCO2(value: number) {
    return Math.max(0, startPoint + Math.round(value * action.ratioCO2toPhys));
  }

  const startPoint = Math.round(action.pointDeDepart2019 ?? 0);
  const inverted = action.ratioCO2toPhys < 0;

  let valuePhys = getValuePhysFromCO2(initialValueCO2);
  let valueCO2 = initialValueCO2;

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valueCO2 = sanitizeNumber(target.value);
    target.value = valueCO2;
    valuePhys = getValuePhysFromCO2(valueCO2);
    onUpdate(valueCO2, action);
  }

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;

    valuePhys = inverted
      ? clamp(sanitizeNumber(target.value), 0, startPoint)
      : Math.max(sanitizeNumber(target.value), startPoint);
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
    <div class="flex gap-8">
      <!-- Colonne de gauche : saisie -->
      <div class="basis-2/3 border-r pr-6">
        <div class="flex gap-x-4">
          <div class="flex-1 border-r pb-6">
            <SubTitle label="Objectif à atteindre en 2030" />
          </div>
          <SubTitle label={inputLabel} />
        </div>
        <!--  Emissions évitées ktCO₂ -->
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
        <!--  soit -->
        {#if !action.noTranslation}
          <div class="flex gap-x-4">
            <div
              class="flex-1 border-r py-2 text-right text-xs font-medium text-gray-500"
            >
              <span class="pr-4">Soit</span>
            </div>
            <div
              class="flex-1 py-2 text-right text-xs font-medium text-gray-500"
            >
              Soit
            </div>
          </div>
          <!--  Unités physiques -->
          <div class="flex gap-x-4">
            <DataDescription
              value={getValuePhysFromCO2(targetValueCO2)}
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
                min={inverted ? 0 : startPoint}
                max={inverted ? startPoint : undefined}
                id={action.id}
                value={valuePhys}
                on:change={handlePhysInputChanged}
                disabled={action.editionDisabled}
              />
              {#if inverted}
                <div class="mt-1 text-xs italic text-gray-500">
                  Les émissions évitées augmentent quand cette valeur diminue
                </div>{/if}
            </div>
          </div>
        {/if}
      </div>
      <!-- Colonne de droite : explications -->
      <div class="basis-1/3">
        <div class="flex flex-col gap-4">
          {#if action.comment}
            <div class="markdown">
              <TextClamp htmlText={markdownToHtml(action.comment)} />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
