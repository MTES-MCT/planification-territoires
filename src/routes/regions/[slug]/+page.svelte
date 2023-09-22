<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";

  export let data;
</script>

<svelte:head>
  <title>Région {data.region} | Simulateur territoires</title>
</svelte:head>

<div class="h-96">
  <MainTreemap data={data.regionData} />
</div>

<a href="/regions/{data.region}/objectifs?{$page.url.searchParams.toString()}"
  >Renseignez vos objectifs</a
>
