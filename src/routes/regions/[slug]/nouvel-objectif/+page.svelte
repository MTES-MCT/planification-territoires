<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;

  let resultatsUrl = `/regions/${
    data.region
  }/resultats?${$page.url.searchParams.toString()}`;
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
    href={resultatsUrl}>Visualiser le réalisé</a
  >
</div>

<div class="h-[75vh]">
  <MainTreemap
    data={data.regionData}
    completionLevels={data.completionLevels}
    substractCompleted
  />
</div>

<ul class="fr-btns-group fr-btns-group--inline-sm my-12">
  <li><a class="fr-btn" href={resultatsUrl}>Visualiser le réalisé</a></li>
  <li>
    <button
      class="fr-btn fr-btn--secondary"
      on:click={() => {
        navigator.clipboard.writeText($page.url.href);
      }}
      >Copier le lien de partage
    </button>
  </li>
</ul>
