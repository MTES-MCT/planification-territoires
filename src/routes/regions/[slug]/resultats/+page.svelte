<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.region} | Résultats | Simulateur territoires</title>
</svelte:head>

<h1>Résultats pour la région {data.region}</h1>

<div class="h-96">
  <MainTreemap
    data={data.regionData}
    completionLevels={data.completionLevels}
  />
</div>

<button
  on:click={() => {
    navigator.clipboard.writeText($page.url.href);
  }}>Copier le lien de partage</button
>
<br />

<a href="/regions/{data.region}/objectifs?{$page.url.searchParams.toString()}"
  >Retour à l’édition</a
>
