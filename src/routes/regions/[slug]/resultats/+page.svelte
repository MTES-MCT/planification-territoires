<script lang="ts">
  import { goto } from "$app/navigation";
  import { tidy, filter } from "@tidyjs/tidy";

  import MainTreemap from "$lib/main-treemap.svelte";

  import type { CompletionLevels, Lever } from "$lib/types";

  export let data;
  import rawLeversData from "$lib/data.json";
  const leversData = rawLeversData as Lever[];

  const regionData: Lever[] = tidy(
    leversData,
    filter((d) => d.region === data.region)
  );

  let completionLevels: CompletionLevels = Object.fromEntries(
    regionData.map((l) => [l.name, 0])
  );
</script>

<svelte:head>
  <title>{data.region} | Résultats | Simulateur territoires</title>
</svelte:head>

<h1>Résultats pour la région {data.region}</h1>

<div class="h-96">
  <MainTreemap data={regionData} {completionLevels} />
</div>

<button
  class="border"
  on:click={() => goto(`/regions/${data.region}/objectifs`)}
  >Retour à l’édition</button
>
