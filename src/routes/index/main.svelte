<script lang="ts">
  import { getRegionNames } from "$lib/utils";
  import RegionCard from "./region-card.svelte";

  const regions = getRegionNames();
</script>

<p class="max-w-2xl">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
  in culpa qui officia deserunt mollit anim id est laborum. <a href="/a-propos"
    >À propos</a
  >
</p>

<h1 class="mb-2 mt-4">Régions</h1>

<p class="max-w-2xl">
  Sélectionnez votre région pour visualiser à titre indicatif la part de votre
  territoire dans les objectifs nationaux de baisse des GES.
</p>
<div class="fr-grid-row fr-grid-row--gutters fr-mb-1w w-full">
  {#each regions as region}
    <RegionCard {region} />
  {/each}
</div>
