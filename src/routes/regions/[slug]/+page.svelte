<script lang="ts">
  import { page } from "$app/stores";
  import { tidy, filter } from "@tidyjs/tidy";

  import MainTreemap from "$lib/main-treemap.svelte";

  import type { Lever } from "$lib/types";

  import rawLeversData from "$lib/data.json";
  const leversData = rawLeversData as Lever[];

  export let data;

  let selectedRegionData: Lever[];
  $: selectedRegionData = tidy(
    leversData,
    filter((d) => d.region === data.region)
  );
</script>

<svelte:head>
  <title>Région {data.region} | Simulateur territoires</title>
</svelte:head>

<div class="h-96">
  <MainTreemap data={selectedRegionData} />
</div>

<a href="/regions/{data.region}/objectifs?{$page.url.searchParams.toString()}"
  >Renseignez vos objectifs</a
>
