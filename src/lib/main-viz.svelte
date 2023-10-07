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
  export let showProgression = false;

  let selectedViz = "mondrian";
  let showRemainingOnly = false;

  function getLabel(lever: Lever) {
    if (showRemainingOnly || showProgression) {
      return `${lever.name}\n−${prettyNum(
        lever.objCO2 - lever.progressionCO2
      )} ktCO₂`;
    }
    return `${lever.name}\n−${prettyNum(lever.objCO2)} ktCO₂`;
  }

  function getValue(lever: Lever) {
    if (showRemainingOnly) {
      return lever.objCO2 - lever.progressionCO2;
    }
    return lever.objCO2;
  }

  function getTitle(lever: Lever) {
    if (showRemainingOnly) {
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
    if (showRemainingOnly || !showProgression) {
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
    if (showProgression || showRemainingOnly) {
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
    if (showRemainingOnly) {
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

  function handleSelectVizVersion(_evt: Event) {
    window._paq.push([
      "trackEvent",
      "Options",
      "Choix visualisation",
      selectedViz,
    ]);
  }

  function handleShowRemainingToggle(_evt: Event) {
    window._paq.push([
      "trackEvent",
      "Options",
      "Masquer le réalisé",
      !showRemainingOnly,
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

  $: canHideCompletedObjectives =
    showProgression && aggData.some((lever) => !!lever.progressionCO2);
</script>

<div class="flex h-full flex-col">
  <div class="mb-4 border p-3 font-medium leading-tight text-gray-600 sm:flex">
    <div class="mb-8 mr-4 flex-1 sm:mb-0 sm:border-r sm:pr-6">
      <div class="mb-2 max-w-[220px] lg:mb-0">
        Baisse des émissions de GES à atteindre d'ici 2030
      </div>
      <div class="text-right text-xl font-semibold text-gray-900 lg:text-2xl">
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
        <div class="text-right text-xl font-semibold text-gray-900 lg:text-2xl">
          {prettyNum(getTotalCompleted())} ktCO₂
        </div>
      {/if}
    </div>
  </div>

  <!--  Options -->
  <div class="mb-4 flex flex-row flex-wrap items-end gap-x-10 print:!hidden">
    <div class="fr-select-group shrink-0">
      <select
        bind:value={selectedViz}
        on:change={handleSelectVizVersion}
        class="fr-select"
        id="viz-select"
        name="viz-select"
      >
        <option value="mondrian">Mondrian</option>
        <option value="marimekko">Marimekko</option>
      </select>
    </div>

    {#if canHideCompletedObjectives}
      <div class="fr-toggle fr-toggle--label-left shrink-0">
        <input
          type="checkbox"
          class="fr-toggle__input"
          id="show-completed-toggle"
          aria-describedby="show-completed-toggle-hint-text"
          on:click={handleShowRemainingToggle}
          bind:checked={showRemainingOnly}
        />
        <label
          class="fr-toggle__label basis-96"
          for="show-completed-toggle"
          data-fr-checked-label="Restants"
          data-fr-unchecked-label="Tout"
        >
          Afficher uniquement les objectifs restants</label
        >
      </div>
    {/if}
  </div>

  <!--  Légende-->
  <div class="mb-2">
    <ColorLegend items={getLegendItems()} />
  </div>
  {#key showRemainingOnly}
    <!--  Visualisation -->
    <div class="min-h-0 flex-1">
      {#if selectedViz === "mondrian"}
        <div class="hidden md:block">
          <Mondrian
            data={aggData}
            getPath={getPathMondrian}
            {getLabel}
            {getColor}
            {getValue}
            {getTitle}
            {getProgressionRatio}
            width={1248}
            height={580}
          />
        </div>
        <div class="block md:hidden">
          <Mondrian
            data={aggData}
            getPath={getPathMondrian}
            {getLabel}
            {getColor}
            {getValue}
            {getTitle}
            {getProgressionRatio}
            width={720}
            height={780}
          />
        </div>
      {:else}
        <div class="hidden md:block">
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
            width={1248}
            height={580}
          />
        </div>
        <div class="block md:hidden">
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
            width={720}
            height={780}
          />
        </div>
      {/if}
    </div>
  {/key}
</div>
