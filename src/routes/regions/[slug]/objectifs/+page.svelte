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
<form>
  <fieldset class="fr-fieldset gap-6">
    {#each data.regionData as lever}
      <CompletionLevelInput
        {lever}
        bind:completionLevels={data.completionLevels}
      />
    {/each}
  </fieldset>
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
