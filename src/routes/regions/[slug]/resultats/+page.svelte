<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;

  let nouvelObjectifUrl = `/regions/${
    data.region
  }/nouvel-objectif?${$page.url.searchParams.toString()}`;
</script>

<svelte:head>
  <title>{data.region} | Résultats | Simulateur territoires</title>
</svelte:head>

<NavigationBar
  region={data.region}
  title="Visualisation du réalisé par rapport à l’objectif 2030"
/>

<p class="max-w-2xl">
  Voici les nouveaux objectifs actualisés sur la base des données renseignées.
  Vous pouvez ensuite <a class="fr-link" href={nouvelObjectifUrl}
    >visualiser les objectifs restant.</a
  >
</p>

<div class="mb-4">
  <a
    class="fr-btn fr-btn--tertiary fr-icon-arrow-left-line fr-btn--icon-left"
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

<ul class="fr-btns-group fr-btns-group--inline-sm my-12">
  <li>
    <a class="fr-btn" href={nouvelObjectifUrl}
      >Visualiser les objectifs restants</a
    >
  </li>
  <li>
    <button
      class="fr-btn fr-btn--secondary mb-12 mt-4"
      on:click={() => {
        navigator.clipboard.writeText($page.url.href);
      }}
      >Copier le lien de partage
    </button>
  </li>
</ul>
