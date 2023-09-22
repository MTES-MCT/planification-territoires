<script lang="ts">
  import Treemap from "$lib/treemap.svelte";
  import type { CompletionLevels, Lever } from "$lib/types";
  import { clamp, getColor, prettifyNumber } from "$lib/utils";

  export let data: Lever[];
  export let completionLevels: CompletionLevels | undefined = undefined;

  let width: number;
  let height: number;

  function getLabel(lever: Lever) {
    return `${lever.category}\n\n${lever.label}\n\n${prettifyNumber(
      lever.objCO2
    )} kt CO₂`;
  }

  function getValue(lever: Lever) {
    return lever.objCO2;
  }

  function getTitle(lever: Lever) {
    return `${lever.sector}\n\n${lever.label}`;
  }

  function getPath(lever: Lever) {
    return lever.path;
  }

  function getProgressionRatio(lever: Lever) {
    if (lever.progressionRatio) return clamp(lever.progressionRatio, 0, 1);
    return 0;
  }

  $: extData = data.map((lever: Lever) => ({
    ...lever,
    progressionRatio: completionLevels
      ? lever.objPhys
        ? completionLevels[lever.id] / lever.objPhys
        : 0
      : 0,
  }));
</script>

<div bind:clientWidth={width} bind:clientHeight={height} class="h-full">
  {#if width && height}
    <Treemap
      data={extData}
      {getPath}
      {getLabel}
      {getColor}
      {getValue}
      {getTitle}
      {getProgressionRatio}
      {width}
      {height}
    />
  {/if}
</div>
