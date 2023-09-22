<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.region} | Résultats | Simulateur territoires</title>
</svelte:head>

<h1 class="mb-0 text-base">{data.region}</h1>
<a class="fr-link text-normal" href="/">Choisir une autre région</a>
<h2 class="mb-0 mt-4">Visualisation des objectifs</h2>

<div class="mb-4">
  <a
    class="fr-link fr-icon-arrow-left-line fr-link--icon-left block"
    href="/regions/{data.region}/objectifs?{$page.url.searchParams.toString()}"
    >Éditer</a
  >
</div>

<div class="h-96">
  <MainTreemap
    data={data.regionData}
    completionLevels={data.completionLevels}
  />
</div>

<button
  class="fr-btn mb-12 mt-4"
  on:click={() => {
    navigator.clipboard.writeText($page.url.href);
  }}
  >Copier le lien de partage
</button>
