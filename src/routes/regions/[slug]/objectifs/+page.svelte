<script lang="ts">
  import { goto } from "$app/navigation";

  import { tidy, filter } from "@tidyjs/tidy";

  import MainTreemap from "$lib/main-treemap.svelte";
  import CompletionLevelInput from "./completion-level-input.svelte";

  import type { CompletionLevels, Lever } from "$lib/types";

  export let data;
  import rawLeversData from "$lib/data.json";
  const leversData = rawLeversData as Lever[];

  const regionData: Lever[] = tidy(
    leversData,
    filter((d) => d.region === data.region)
  );

  let completionLevels: CompletionLevels = Object.fromEntries(
    regionData.map((l) => [l.name, 0])
  );

  console.log(data);
</script>

<svelte:head>
  <title>Objectifs | Simulateur territoires</title>
</svelte:head>

{#each regionData as lever}
  <div class="my-4 rounded border bg-gray-50 p-4">
    <CompletionLevelInput {lever} bind:completionLevels />
  </div>
{/each}

<div class="h-96">
  <MainTreemap data={regionData} {completionLevels} />
</div>

<button
  class="border"
  on:click={() => goto(`/regions/${data.region}/resultats`)}
  >Afficher et partager les résultats</button
>
