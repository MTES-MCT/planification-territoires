<script lang="ts">
  import { tidy, groupBy, sum, summarize } from "@tidyjs/tidy";

  import Treemap from "$lib/treemap.svelte";
  import Treemap2 from "$lib/treemap2.svelte";
  import ColorLegend from "$lib/color-legend.svelte";

  import type { CompletionLevels, Lever } from "$lib/types";
  import { clamp, getColor, getSectorsNames, prettifyNumber } from "$lib/utils";

  export let data: Lever[];
  export let completionLevels: CompletionLevels | undefined = undefined;
  export let substractCompleted = false;

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
    if (lever.progressionCO2) {
      return clamp(lever.progressionCO2 / lever.objCO2, 0, 1);
    }
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

  // On injecte le niveau de progression, en ktCO₂
  $: extData = data.map((lever: Lever) => ({
    ...lever,
    progressionCO2: completionLevels
      ? lever.ratio
        ? completionLevels[lever.id] / lever.ratio
        : 0
      : 0,
  }));

  // On groupe les traductions physiques par nom de levier
  $: aggData = tidy(
    extData,
    groupBy(
      ["name", "group", "sector", "path", "path2"],
      [
        summarize({
          objCO2: sum("objCO2"),
          progressionCO2: sum("progressionCO2"),
        }),
      ]
    )
  );
</script>

<div class="flex h-full flex-col">
  <div class="mb-2 flex items-end gap-4">
    <div class="grow">
      <ColorLegend items={getLegendItems()} />
    </div>
    <select bind:value={treemapVersion} class="fr-select basis-32">
      <option value="v1"> version 1 </option>
      <option value="v2"> version 2 </option>
    </select>
  </div>
  <div class="flex-auto">
    {#if treemapVersion === "v1"}
      <Treemap
        data={aggData}
        getPath={getPathV1}
        {getLabel}
        {getColor}
        {getValue}
        {getTitle}
        {getProgressionRatio}
      />
    {:else}
      <Treemap2
        data={aggData}
        getPath={getPathV2}
        {getLabel}
        {getColor}
        {getValue}
        {getTitle}
        {getProgressionRatio}
        {getGroupName}
      />
    {/if}
  </div>
</div>
