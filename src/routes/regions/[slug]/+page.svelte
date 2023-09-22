<script lang="ts">
  export let data;
</script>

<svelte:head>
  <title>Région {data.region} | Simulateur territoires</title>
</svelte:head>

<!--  import { tidy, select, distinct, filter } from "@tidyjs/tidy";-->

<!--  import MainTreemap from "./main-treemap.svelte";-->
<!--  import CompletionLevelInput from "./completion-level-input.svelte";-->

<!--  import type { CompletionLevels, Lever } from "$lib/types";-->

<!--  import rawData from "$lib/data.json";-->
<!--  const data = rawData as Lever[];-->

<!--  const regionNames = tidy(data, select("region"), distinct("region")).map(-->
<!--    (row) => row.region-->
<!--  );-->

<!--  let selectedRegion = regionNames[0];-->
<!--  let selectedLever: Lever;-->
<!--  let completionLevels: CompletionLevels;-->

<!--  function handleLeverClick(lever: Lever) {-->
<!--    selectedLever = lever;-->
<!--  }-->

<!--  let selectedRegionData: Lever[];-->
<!--  $: selectedRegionData = tidy(-->
<!--    data,-->
<!--    filter((d) => d.region === selectedRegion)-->
<!--  );-->

<!--  $: {-->
<!--    selectedRegion;-->
<!--    completionLevels = Object.fromEntries(data.map((l) => [l.name, 0]));-->
<!--  }-->
<!--</script>-->

<!--<svelte:head>-->
<!--  <title>Régions | Simulateur territoires</title>-->
<!--</svelte:head>-->

<!--<div class="mb-8 mt-4 flex flex-wrap gap-x-8 gap-y-2">-->
<!--  <label>-->
<!--    Région :-->
<!--    <select bind:value={selectedRegion}>-->
<!--      {#each regionNames as name}-->
<!--        <option value={name}>-->
<!--          {name}-->
<!--        </option>-->
<!--      {/each}-->
<!--    </select>-->
<!--  </label>-->
<!--</div>-->

<!--<div class="my-4 rounded border bg-gray-50 p-4">-->
<!--  {#if selectedLever}-->
<!--    <CompletionLevelInput lever={selectedLever} bind:completionLevels />-->
<!--  {:else}-->
<!--    <p class="text-center font-bold">-->
<!--      Cliquez sur un levier pour renseigner vos actions-->
<!--    </p>-->
<!--  {/if}-->
<!--</div>-->

<!--<div class="h-96">-->
<!--  <MainTreemap-->
<!--    data={selectedRegionData}-->
<!--    {completionLevels}-->
<!--    onLeverClick={handleLeverClick}-->
<!--  />-->
<!--</div>-->

<!--<style lang="postcss">-->
<!--  select {-->
<!--    @apply rounded border border-gray-300 bg-transparent px-1 py-0.5 leading-9 outline-title-blue-france;-->
<!--  }-->
<!--</style>-->
