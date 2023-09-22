<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.region} | Résultats | Simulateur territoires</title>
</svelte:head>

<NavigationBar
  region={data.region}
  title="Visualisation des objectifs actualisés"
/>

<p class="max-w-2xl">
  Voici les nouveaux objectifs actualisés sur la base des données renseignées.
</p>

<div class="mb-4">
  <a
    class="fr-link fr-icon-arrow-left-line fr-link--icon-left block"
    href="/regions/{data.region}/objectifs?{$page.url.searchParams.toString()}"
    >Éditer les actions menées</a
  >
</div>

<div class="h-[75vh]">
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
