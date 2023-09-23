<script lang="ts">
  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "./navigation-bar.svelte";

  export let data;

  const editionLink = `/regions/${data.region}/objectifs`;
</script>

<svelte:head>
  <title>Région {data.region} | Simulateur territoires</title>
</svelte:head>

<NavigationBar region={data.region} title="Présentation des objectifs" />

<p class="max-w-xl">
  Voici les objectifs nationaux déclinés par le SGPE en {data.region}. Veuillez
  <a class="fr-link" href={editionLink}>renseignez les actions</a> déjà menées ou
  contractualisées.
</p>

<div class="my-8 block h-[75vh]">
  <MainTreemap data={data.regionData} />
</div>

<div class="mb-8">
  <a
    class="fr-link fr-icon-arrow-right-line fr-link--icon-right block"
    href={editionLink}>Renseignez les actions</a
  >
</div>
