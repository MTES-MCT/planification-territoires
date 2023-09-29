<script lang="ts">
  import Treemap from "$lib/treemap.svelte";
  import Treemap2 from "$lib/treemap2.svelte";
  import ColorLegend from "$lib/color-legend.svelte";

  import type { CompletionLevels, Lever } from "$lib/types";
  import { clamp, getColor, getSectorsNames, prettifyNumber } from "$lib/utils";

  export let data: Lever[];
  export let completionLevels: CompletionLevels | undefined = undefined;
  export let substractCompleted = false;

  let width: number;
  let height: number;
  let treemapVersion: "v1";

  function getLabel(lever: Lever) {
    return `${lever.name}\n−${prettifyNumber(lever.objCO2)} kt CO₂`;
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

  function getPathV1(lever: Lever) {
    return lever.path;
  }

  function getPathV2(lever: Lever) {
    return lever.path2;
  }

  function getProgressionRatio(lever: Lever) {
    if (substractCompleted) {
      return 0;
    }
    if (lever.progressionRatio) return clamp(lever.progressionRatio, 0, 1);
    return 0;
  }

  function getGroupName(path: string) {
    return path.split("/")[1];
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

<div class="mb-2 flex items-end gap-4">
  <div class="grow">
    <ColorLegend items={getLegendItems()} />
  </div>
  <select bind:value={treemapVersion} class="fr-select basis-32">
    <option value="v1"> version 1 </option>
    <option value="v2"> version 2 </option>
  </select>
</div>
<div bind:clientWidth={width} bind:clientHeight={height} class="h-full">
  {#if width && height}
    {#if treemapVersion === "v1"}
      <Treemap
        data={extData}
        getPath={getPathV1}
        {getLabel}
        {getColor}
        {getValue}
        {getTitle}
        {getProgressionRatio}
        {width}
        height={height - 40}
      />
    {:else}
      <Treemap2
        data={extData}
        getPath={getPathV2}
        {getLabel}
        {getColor}
        {getValue}
        {getTitle}
        {getProgressionRatio}
        {getGroupName}
        {width}
        height={height - 20}
      />
    {/if}
  {/if}
</div>
