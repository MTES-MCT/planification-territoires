<script lang="ts">
  import type { Region } from "$lib/types";
  import rawRegions from "$lib/regions.json";
  import RegionCard from "./region-card.svelte";

  const regions = rawRegions as Region[];
</script>

<h1 class="mt-4">Régions</h1>
<div class="fr-grid-row fr-grid-row--gutters fr-mb-1w w-full">
  {#each regions as region}
    <RegionCard {region} />
  {/each}
</div>
