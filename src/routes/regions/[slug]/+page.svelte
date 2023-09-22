<script lang="ts">
  import { goto } from "$app/navigation";
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

<button
  class="border"
  on:click={() => goto(`/regions/${data.region}/objectifs`)}
>
  Renseignez vos objectifs
</button>
