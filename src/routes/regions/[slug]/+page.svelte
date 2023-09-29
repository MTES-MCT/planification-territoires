<script lang="ts">
  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "./navigation-bar.svelte";

  export let data;

  const editionLink = `/regions/${data.region}/objectifs`;
</script>

<svelte:head>
  <title>Région {data.region} | Simulateur territoires</title>
</svelte:head>

<NavigationBar
  region={data.region}
  title="Présentation de vos objectifs territoriaux pour 2030"
/>

<p class="max-w-xl">
  Voici le flux annuel de baisse des émissions de GES par rapport à 2019 que
  vous devez atteindre en 2030. A partir de ce tableau et grâce à l’outil
  suivant, <a class="fr-link" href={editionLink}
    >réalisez votre diagnostic territorial</a
  >.
</p>

<div class="my-8 block h-[75vh]">
  <MainTreemap data={data.regionData} />
</div>

<div class="mb-8">
  <a
    class="fr-link fr-icon-arrow-right-line fr-link--icon-right block"
    href={editionLink}>Réalisez votre diagnostic territorial</a
  >
</div>
