<script lang="ts">
  import {
    tidy,
    groupBy,
    sum,
    summarize,
    filter,
    rename,
    mutate,
  } from "@tidyjs/tidy";

  import completionLevels from "$lib/completion-levels-store";
  import displayOptions from "$lib/display-options-store";
  import Mondrian from "$lib/treemap/mondrian.svelte";
  import Marimekko from "$lib/treemap/marimekko.svelte";
  import ColorLegend from "$lib/color-legend.svelte";
  import { clamp, getColor, getSectorsNames, prettyNum } from "$lib/utils";
  import type { Action, Lever } from "$lib/types";
  import DiagonalHatchPattern from "$lib/treemap/diagonalHatchPattern.svelte";
  import TitlePopup from "$lib/treemap/title-popup.svelte";
  import GroupTitlePopup from "$lib/treemap/group-title-popup.svelte";

  export let data: Action[];
  export let showProgression = false;

  function getLabel(lever: Lever) {
    if (showProgression && $displayOptions.showRemainingOnly) {
      return `${lever.name}\n${prettyNum(lever.objCO2 - lever.progressionCO2, {
        negate: true,
      })}`;
    }
    return `${lever.name}\n${prettyNum(lever.objCO2, { negate: true })}`;
  }

  function getValue(lever: Lever) {
    if (showProgression && $displayOptions.showRemainingOnly) {
      return lever.objCO2 - lever.progressionCO2;
    }
    return lever.objCO2;
  }

  function getPathMondrian(lever: Lever) {
    return lever.pathSector;
  }

  function getPathMarimekko(lever: Lever) {
    return lever.pathGroup;
  }

  function getProgressionRatio(lever: Lever) {
    if ($displayOptions.showRemainingOnly || !showProgression) {
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
      leversData,
      groupBy("group", [
        summarize({
          totalObjCO2: sum("objCO2"),
          totalCompleted: sum("progressionCO2"),
        }),
      ]),
      filter((row) => row.group === group)
    )[0];
    if (showProgression && $displayOptions.showRemainingOnly) {
      return `${prettyNum(total.totalObjCO2 - total.totalCompleted, {
        negate: true,
      })}`;
    }
    return `${prettyNum(total.totalObjCO2, { negate: true })}`;
  }

  function getSectorTotalInGroup(sector: string, group: string) {
    const sectorTotal = groupedSectors.find(
      (row) => row.group === group && row.sector === sector
    );
    return showProgression && $displayOptions.showRemainingOnly
      ? sectorTotal.totalRemaining
      : sectorTotal.totalObjCO2;
  }

  function getLegendItems() {
    return getSectorsNames().map((sector) => ({
      label: sector,
      color: getColor(sector),
    }));
  }

  function getTotalObjectives() {
    const objectives = tidy(
      leversData,
      summarize({
        totalObjCO2: sum("objCO2"),
        totalCompleted: sum("progressionCO2"),
      })
    )?.[0];
    if (showProgression && $displayOptions.showRemainingOnly) {
      return objectives?.totalObjCO2 - objectives?.totalCompleted;
    }
    return objectives?.totalObjCO2;
  }

  function getTotalCompleted() {
    const objectives = tidy(
      leversData,
      summarize({
        totalCompleted: sum("progressionCO2"),
      })
    )?.[0];

    return objectives?.totalCompleted;
  }

  function handleSelectVizVersion(_evt: Event) {
    if (window._paq) {
      window._paq.push([
        "trackEvent",
        "Options",
        "Choix visualisation",
        $displayOptions.selectedViz,
      ]);
    }
  }

  function handleShowRemainingToggle(_evt: Event) {
    if (window._paq) {
      window._paq.push([
        "trackEvent",
        "Options",
        "Masquer le réalisé",
        !$displayOptions.showRemainingOnly,
      ]);
    }
  }

  // On injecte le niveau de progression, en ktCO2, et groupe les traductions physiques par nom de levier
  let leversData: Lever[];
  $: leversData = tidy(
    data.map((action: Action) => ({
      ...action,
      progressionCO2:
        $completionLevels[action.regionSlug][action.id] / action.ratioCO2toPhys,
    })),
    groupBy(
      ["leverName", "group", "sector", "pathSector", "pathGroup"],
      [
        summarize({
          objCO2: sum("objCO2"),
          progressionCO2: sum("progressionCO2"),
        }),
      ]
    ),
    rename({ leverName: "name" })
  );

  $: groupedSectors = tidy(
    leversData,
    groupBy(
      ["group", "sector"],
      [
        summarize({
          totalObjCO2: sum("objCO2"),
          totalCompleted: sum("progressionCO2"),
        }),
        mutate({
          totalRemaining: (d) => d.totalObjCO2 - d.totalCompleted,
        }),
      ]
    )
  );

  $: canHideCompletedObjectives =
    showProgression && leversData.some((level) => !!level.progressionCO2);
</script>

{#key $displayOptions.showRemainingOnly}
  <div class="flex h-full flex-col">
    <div
      class="mb-4 border p-3 text-sm font-medium text-gray-600 sm:flex xl:text-base"
    >
      <div
      class="mb-8 mr-4 flex flex-1 flex-col justify-between sm:mb-0 sm:border-r sm:pr-4 md:min-h-[68px]"
      >
      <div
        class="!leading-tight print:text-sm print:font-normal md:mb-2 lg:mb-0"
      >
          Flux annuel de baisse des émissions de GES à atteindre d’ici 2030
        </div>
      <div
        class="text-right text-xl font-semibold leading-tight text-gray-900 print:!text-base lg:text-2xl"
      >
          {prettyNum(getTotalObjectives())}
        </div>
      </div>

      <div class="flex flex-1 flex-col justify-between">
        {#if showProgression}
          <div class="mb-2 flex items-center gap-3 lg:mb-0">
            <svg
              width="38"
              height="38"
              stroke-width="2"
              stroke="#bbb"
              class="shrink-0"
            >
              <DiagonalHatchPattern />
              <rect fill="url(#diagonalHatch)" width="100%" height="100%" />
            </svg>
            <div class="!leading-tight print:text-sm print:font-normal">
              Flux annuel de baisse des émissions de GES provoquée par les
              actions menées, contractualisées ou planifiées
            </div>
          </div>
          <div
            class="text-right text-xl font-semibold leading-tight text-gray-900 print:!text-baselg:text-2xl"
          >
            {prettyNum(getTotalCompleted())}
          </div>
        {/if}
      </div>
    </div>

    <!--  Options -->
    <div class="mb-4 flex flex-row flex-wrap items-end gap-x-10 print:!hidden">
      <div class="fr-select-group flex shrink-0 items-baseline gap-4">
        <label class=" shrink-0" for="viz-select">Vision par</label>
        <select
          bind:value={$displayOptions.selectedViz}
          on:change={handleSelectVizVersion}
          class="fr-select"
          id="viz-select"
          name="viz-select"
        >
          <option value="secteurs">Secteurs</option>
          <option value="chantiers">Chantiers</option>
        </select>
      </div>

      {#if canHideCompletedObjectives}
        <div class="fr-toggle fr-toggle--label-left">
          <input
            type="checkbox"
            class="fr-toggle__input"
            id="show-completed-toggle"
            aria-describedby="show-completed-toggle-hint-text"
            on:click={handleShowRemainingToggle}
            bind:checked={$displayOptions.showRemainingOnly}
          />
          <label
            class="fr-toggle__label wrap basis-96"
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

    <!--  Visualisation -->
    <div class="min-h-0 flex-1">
      {#if $displayOptions.selectedViz === "secteurs"}
        <div class="hidden md:block">
          <Mondrian
            data={leversData}
            getPath={getPathMondrian}
            {getLabel}
            {getColor}
            {getValue}
            {getProgressionRatio}
            {showProgression}
            titleComponent={TitlePopup}
            width={1248}
            height={520}
          />
        </div>
        <div class="block md:hidden">
          <Mondrian
            data={leversData}
            getPath={getPathMondrian}
            {getLabel}
            {getColor}
            {getValue}
            {getProgressionRatio}
            {showProgression}
            titleComponent={TitlePopup}
            width={720}
            height={720}
          />
        </div>
      {:else}
        <div class="hidden md:block">
          <Marimekko
            data={leversData}
            getPath={getPathMarimekko}
            {getLabel}
            {getColor}
            {getValue}
            {getProgressionRatio}
            {showProgression}
            {getGroupName}
            {getGroupTotal}
            {getSectorTotalInGroup}
            titleComponent={TitlePopup}
            groupTitleComponent={GroupTitlePopup}
            width={1248}
            height={520}
          />
        </div>
        <div class="block md:hidden">
          <Marimekko
            data={leversData}
            getPath={getPathMarimekko}
            {getLabel}
            {getColor}
            {getValue}
            {getProgressionRatio}
            {showProgression}
            {getGroupName}
            {getGroupTotal}
            {getSectorTotalInGroup}
            titleComponent={TitlePopup}
            groupTitleComponent={GroupTitlePopup}
            width={720}
            height={720}
          />
        </div>
      {/if}
    </div>
  </div>
{/key}
