<script lang="ts">
  import Treemap from "$lib/treemap.svelte";
  import ColorLegend from "$lib/color-legend.svelte";

  import type { CompletionLevels, Lever } from "$lib/types";
  import { clamp, getColor, getSectorsNames, prettifyNumber } from "$lib/utils";

  export let data: Lever[];
  export let completionLevels: CompletionLevels | undefined = undefined;
  export let substractCompleted = false;

  let width: number;
  let height: number;

  function getLabel(lever: Lever) {
    return `${lever.category}\n${lever.label}\n−${prettifyNumber(
      lever.objCO2
    )} kt CO₂`;
  }

  function getValue(lever: Lever) {
    if (completionLevels != null && substractCompleted) {
      return lever.objCO2 - completionLevels[lever.id] / lever.ratio;
    }
    return lever.objCO2;
  }

  function getTitle(lever: Lever) {
    return `${
      lever.sector !== lever.category ? lever.sector + "\n" : ""
    }${getLabel(lever)}`.replace(/\n/g, "\n\n");
  }

  function getPath(lever: Lever) {
    return lever.path;
  }

  function getProgressionRatio(lever: Lever) {
    if (substractCompleted) {
      return 0;
    }
    if (lever.progressionRatio) return clamp(lever.progressionRatio, 0, 1);
    return 0;
  }

  function getLegendItems() {
    return getSectorsNames().map((sector) => ({
      label: sector,
      color: getColor(sector),
    }));
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

<div class="mb-2">
  <ColorLegend items={getLegendItems()} />
</div>
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
