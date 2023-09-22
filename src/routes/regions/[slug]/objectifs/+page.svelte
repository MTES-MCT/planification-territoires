<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import MainTreemap from "$lib/main-treemap.svelte";
  import CompletionLevelInput from "./completion-level-input.svelte";

  export let data;

  // À chaque modification de data.completionLevels, on met à jour
  // la querystring
  $: {
    Object.entries(data.completionLevels).forEach((c) =>
      $page.url.searchParams.set(c[0], c[1])
    );
    goto(`?${$page.url.searchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
    });
  }
</script>

<svelte:head>
  <title>{data.region} | Objectifs | Simulateur territoires</title>
</svelte:head>

{#each data.regionData as lever}
  <div class="my-4 rounded border bg-gray-50 p-4">
    <CompletionLevelInput
      {lever}
      bind:completionLevels={data.completionLevels}
    />
  </div>
{/each}

<div class="h-96">
  <MainTreemap
    data={data.regionData}
    completionLevels={data.completionLevels}
  />
</div>

<button
  class="border"
  on:click={() =>
    goto(
      `/regions/${data.region}/resultats?${$page.url.searchParams.toString()}`
    )}>Afficher et partager les résultats</button
>
