<script lang="ts">
  import { tidy, groupBy, sum, summarize, filter } from "@tidyjs/tidy";

  import completionLevels from "$lib/completion-levels-store";
  import Mondrian from "$lib/treemap/mondrian.svelte";
  import Marimekko from "$lib/treemap/marimekko.svelte";
  import ColorLegend from "$lib/color-legend.svelte";
  import { clamp, getColor, getSectorsNames, prettyNum } from "$lib/utils";
  import type { Lever } from "$lib/types";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";

  export let data: Lever[];
  export let substractCompleted = false;
  export let showProgression = false;

  let selectedViz = "mondrian";
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

  function getPathMondrian(lever: Lever) {
    return lever.path;
  }

  function getPathMarimekko(lever: Lever) {
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

  function handleSelectVizVersion(evt: Event) {
    const target = evt.target as HTMLInputElement;
    selectedViz = target.value;
    window._paq.push([
      "trackEvent",
      "Options",
      "Choix visualisation",
      selectedViz,
    ]);
  }

  // On injecte le niveau de progression, en ktCO₂
  $: extData = data.map((lever: Lever) => ({
    ...lever,
    progressionCO2:
      $completionLevels[lever.regionSlug][lever.id] / lever.ratioCO2toPhys,
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
  <div class="mb-4 border p-4 font-medium leading-tight text-gray-600 sm:flex">
    <div class="mb-8 mr-4 flex-1 sm:mb-0 sm:border-r sm:pr-6">
      <div class="mb-2 max-w-[220px] lg:mb-0">
        Baisse des émissions de GES à atteindre d'ici 2030
      </div>
      <div class="text-right text-2xl font-semibold text-gray-900">
        {prettyNum(getTotalObjectives())} ktCO₂
      </div>
    </div>

    <div class="flex-1">
      {#if showProgression}
        <div class="mb-2 flex max-w-[260px] gap-2 lg:mb-0">
          <svg width="38" height="38" stroke-width="2" stroke="#bbb">
            <DiagonalHatchPattern />
            <rect fill="url(#diagonalHatch)" width="100%" height="100%" />
          </svg>
          Total des actions déjà menées ou contractualisées
        </div>
        <div class="text-right text-2xl font-semibold text-gray-900">
          {prettyNum(getTotalCompleted())} ktCO₂
        </div>
      {/if}
    </div>
  </div>
  <div class="mb-2 flex items-end gap-4">
    <div class="grow">
      <ColorLegend items={getLegendItems()} />
    </div>
    <select
      bind:value={selectedViz}
      on:change={handleSelectVizVersion}
      class="fr-select basis-48 print:!hidden"
    >
      <option value="mondrian">Mondrian</option>
      <option value="marimekko">Marimekko</option>
    </select>
  </div>
  <div
    class="min-h-0 flex-1"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    {#if selectedViz === "mondrian"}
      <Mondrian
        data={aggData}
        getPath={getPathMondrian}
        {getLabel}
        {getColor}
        {getValue}
        {getTitle}
        {getProgressionRatio}
        {width}
        {height}
      />
    {:else}
      <Marimekko
        data={aggData}
        getPath={getPathMarimekko}
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
