<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { tidy, groupBy } from "@tidyjs/tidy";

  import MainTreemap from "$lib/main-treemap.svelte";
  import CompletionLevelInput from "./completion-level-input.svelte";

  export let data;

  const sectors = tidy(
    data.regionData,
    groupBy(["sector", "category"], [], groupBy.entriesObject())
  );
  // À chaque modification de data.completionLevels, on met à jour
  // la querystring
  $: {
    Object.entries(data.completionLevels).forEach((c) =>
      $page.url.searchParams.set(c[0], c[1].toString())
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

<h1>Objectifs</h1>
<form class="px-3">
  {#each sectors as sector}
    <fieldset class="fr-fieldset gap-6">
      <legend><h2 class="mb-2 mt-10">{sector.key}</h2></legend>
      {#each sector.values as category}
        {#each category.values as lever}
          <CompletionLevelInput
            {lever}
            bind:completionLevels={data.completionLevels}
          />
        {/each}
      {/each}
    </fieldset>
  {/each}
</form>

<div class="h-96">
  <MainTreemap
    data={data.regionData}
    completionLevels={data.completionLevels}
  />
</div>

<a href="/regions/{data.region}/resultats?{$page.url.searchParams.toString()}"
  >Afficher et partager les résultats</a
>
<br />
<a href="/regions/{data.region}?{$page.url.searchParams.toString()}"
  >Retourner à la visualisation des objectifs de la région</a
>
