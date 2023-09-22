<script lang="ts">
  import type { Region } from "$lib/types";
  import rawRegions from "$lib/regions.json";
  import RegionCard from "./region-card.svelte";

  const regions = rawRegions as Region[];
</script>

<h1 class="mb-2 mt-4">Régions</h1>
<p class="max-w-2xl">
  Séléctionnez une région pour prendre connaissance des objectifs nationaux
  déclinés par le SGPE sur ce territoire.
</p>
<div class="fr-grid-row fr-grid-row--gutters fr-mb-1w w-full">
  {#each regions as region}
    <RegionCard {region} />
  {/each}
</div>
