<script lang="ts">
  import Treemap from "$lib/treemap.svelte";
  import type { CompletionLevels, Lever } from "$lib/types";
  import { clamp, prettifyNumber } from "$lib/utils";

  export let data: Lever[];
  export let completionLevels: CompletionLevels | undefined = undefined;

  let width: number;
  let height: number;

  function getLabel(lever: Lever) {
    return `${lever.category}\n\n${lever.name}\n\n${prettifyNumber(
      lever.objCO2
    )} kt CO₂`;
  }

  function getValue(lever: Lever) {
    return lever.objCO2;
  }

  function getTitle(lever: Lever) {
    return `${lever.sector}\n\n${lever.name}`;
  }

  function getPath(lever: Lever) {
    return lever.path;
  }

  function getProgressionRatio(lever: Lever) {
    if (lever.progressionRatio) return clamp(lever.progressionRatio, 0, 1);
    return 0;
  }

  function getColor(lever: Lever) {
    // Couleurs issues de https://colorbrewer2.org/#type=qualitative&scheme=Set3&n=12
    switch (lever.sector) {
      case "Transport":
        return "#80b1d3";
      case "Agriculture/Forêts/Sols":
        return "#b3de69";

      case "Industrie":
        return "#fb8072";

      case "Energie":
        return "#d9d9d9";

      case "Déchêt":
        return "#bebada";

      case "Tertiaire":
        return "#ffed6f";

      case "Résidentiel":
        return "#fdb462";

      default:
        return "red";
    }
  }

  $: extData = data.map((lever: Lever) => ({
    ...lever,
    progressionRatio: completionLevels
      ? lever.objPhys
        ? completionLevels[lever.name] / lever.objPhys
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
