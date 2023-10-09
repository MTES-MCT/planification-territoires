<script lang="ts">
  import { getRegionsNames, normalizeString } from "$lib/utils";
  import RegionCard from "./_index/region-card.svelte";

  const regionNames = getRegionsNames();
</script>

<h1 class="mt-12 max-w-xl">
  Visualisez vos objectifs territoriaux de baisse des émissions de GES
</h1>
<div class="mb-8 max-w-2xl">
  <p class="max-w-2xl">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    <a class="fr-link" href="/a-propos"
      >En savoir plus sur le simulateur territorial</a
    >
  </p>
  <p>
    Sélectionnez votre région pour visualiser à titre indicatif la part de votre
    territoire dans les objectifs nationaux de baisse des GES.
  </p>
</div>
<div class="fr-grid-row fr-grid-row--gutters !mb-16 w-full">
  {#each regionNames as regionName}
    <RegionCard {regionName} regionSlug={normalizeString(regionName)} />
  {/each}
</div>
