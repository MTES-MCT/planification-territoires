<script lang="ts">
  import { tidy, groupBy, sum, summarize, filter } from "@tidyjs/tidy";

  import completionLevels from "$lib/completion-levels-store";
  import Treemap from "$lib/treemap/treemap.svelte";
  import Treemap2 from "$lib/treemap/treemap2.svelte";
  import ColorLegend from "$lib/color-legend.svelte";
  import { clamp, getColor, getSectorsNames, prettyNum } from "$lib/utils";
  import type { Lever } from "$lib/types";

  export let data: Lever[];
  export let substractCompleted = false;
  export let showProgression = false;

  let treemapVersion = "v2";
  let width: number;
  let height: number;

  function getLabel(lever: Lever) {
    if (substractCompleted || showProgression) {
      return `${lever.name}\n−${prettyNum(
        lever.objCO2 - lever.progressionCO2
      )} ktCO₂`;
    }
    return `${lever.name}\n−${prettyNum(lever.objCO2)} ktCO₂`;
  }

  function getValue(lever: Lever) {
    if (substractCompleted) {
      return lever.objCO2 - lever.progressionCO2;
    }
    return lever.objCO2;
  }

  function getTitle(lever: Lever) {
    if (substractCompleted) {
      return `${lever.name}\n\nObjectif restant : \n−${prettyNum(
        lever.objCO2 - lever.progressionCO2
      )} ktCO₂`;
    } else {
      let title = `${lever.name}\n\nObjectif initial : \n−${prettyNum(
        lever.objCO2
      )} ktCO₂`;
      if (showProgression && lever.progressionCO2) {
        title += `\n\nRéalisé ou contractualisé : \n−${prettyNum(
          lever.progressionCO2
        )} ktCO₂
        `;
      }
      return title;
    }
  }

  function getPathV1(lever: Lever) {
    return lever.path;
  }

  function getPathV2(lever: Lever) {
    return lever.path2;
  }

  function getProgressionRatio(lever: Lever) {
    if (substractCompleted || !showProgression) {
      return 0;
    }
    if (lever.progressionCO2) {
      return clamp(lever.progressionCO2 / lever.objCO2, 0, 1);
    }
    return 0;
  }

  function _getGroupFromPath(path: string) {
    return path.split("/")[1];
  }

  function getGroupName(path: string) {
    return _getGroupFromPath(path);
  }

  function getGroupTotal(path: string) {
    const group = _getGroupFromPath(path);
    const total = tidy(
      aggData,
      groupBy("group", [
        summarize({
          totalObjCO2: sum("objCO2"),
          totalCompleted: sum("progressionCO2"),
        }),
      ]),
      filter((row) => row.group === group)
    )[0];
    if (showProgression || substractCompleted) {
      return `−${prettyNum(total.totalObjCO2 - total.totalCompleted)} ktCO₂`;
    }
    return `−${prettyNum(total.totalObjCO2)} ktCO₂`;
  }

  function getLegendItems() {
    return getSectorsNames().map((sector) => ({
      label: sector,
      color: getColor(sector),
    }));
  }

  function getTotalObjectives() {
    const objectives = tidy(
      aggData,
      summarize({
        totalObjCO2: sum("objCO2"),
        totalCompleted: sum("progressionCO2"),
      })
    )?.[0];
    if (substractCompleted) {
      return objectives?.totalObjCO2 - objectives?.totalCompleted;
    }
    return objectives?.totalObjCO2;
  }

  function getTotalCompleted() {
    const objectives = tidy(
      aggData,
      summarize({
        totalCompleted: sum("progressionCO2"),
      })
    )?.[0];

    return objectives?.totalCompleted;
  }

  // On injecte le niveau de progression, en ktCO₂
  $: extData = data.map((lever: Lever) => ({
    ...lever,
    progressionCO2:
      $completionLevels[lever.region][lever.id] / lever.ratioCO2toPhys,
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
  <div class="font-bold">
    Total d’objectif de baisse des émissions de GES : {prettyNum(
      getTotalObjectives()
    )} ktCO₂
  </div>
  {#if showProgression}
    <div class="max-w-2xl font-bold">
      Les zones hachurées correspondent à ce que vous avez déjà réalisé ou
      contractualisé, soit un total de {prettyNum(getTotalCompleted())} ktCO₂
    </div>
  {/if}
  <div class="mb-2 flex items-end gap-4">
    <div class="grow">
      <ColorLegend items={getLegendItems()} />
    </div>
    <select bind:value={treemapVersion} class="fr-select basis-32">
      <option value="v1">version 1</option>
      <option value="v2">version 2</option>
    </select>
  </div>
  <div
    class="min-h-0 flex-1"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    {#if treemapVersion === "v1"}
      <Treemap
        data={aggData}
        getPath={getPathV1}
        {getLabel}
        {getColor}
        {getValue}
        {getTitle}
        {getProgressionRatio}
        {width}
        {height}
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
        {getGroupTotal}
        {width}
        {height}
      />
    {/if}
  </div>
</div>
