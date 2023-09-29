<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.region} | Nouvel objectif | Simulateur territoires</title>
</svelte:head>

<NavigationBar
  region={data.region}
  title="Votre nouvel objectif 2030 sur la base du diagnostic mené"
/>

<p class="max-w-2xl">
  Voici le nouveau flux annuel de baisse des émissions de GES par rapport à 2019
  que vous devez atteindre en 2030.
</p>

<div class="mb-4">
  <a
    class="fr-link fr-icon-arrow-left-line fr-link--icon-left block"
    href="/regions/{data.region}/resultats?{$page.url.searchParams.toString()}"
    >Visualiser le réalisé</a
  >
</div>

<div class="h-[75vh]">
  <MainTreemap
    data={data.regionData}
    completionLevels={data.completionLevels}
    substractCompleted
  />
</div>

<button
  class="fr-btn mb-12 mt-4"
  on:click={() => {
    navigator.clipboard.writeText($page.url.href);
  }}
  >Copier le lien de partage
</button>
