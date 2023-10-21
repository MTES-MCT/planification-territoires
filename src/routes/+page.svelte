<script lang="ts">
  import { getRegionsNames, normalizeString } from "$lib/utils";
  import RegionCard from "./_index/region-card.svelte";

  const regionNames = getRegionsNames();
</script>

<h1 class="mt-12 max-w-xl">
  Visualisez les leviers de baisse des émissions de gaz à effet de serre sur
  votre territoire
</h1>
<div class="mb-8 max-w-2xl">
  <p class="max-w-2xl">
    Le simulateur territorial est un outil qui vous permet de comprendre et de
    vous approprier les objectifs de baisse des émissions de gaz à effet de
    serre à l’échelle de votre territoire. L’outil donne des ordres de grandeur
    physiques indicatifs qui permettent d’illustrer les choix stratégiques. Les
    données présentées sont des données de travail qui n'engagent en rien
    l'État.
    <a class="fr-link" href="/a-propos"
      >En savoir plus sur le simulateur territorial</a
    >.
  </p>
  <p>
    Sélectionnez votre région pour visualiser à titre indicatif la part de votre
    territoire dans les objectifs nationaux de baisse des émissions de gaz à
    effet de serre.
  </p>
</div>
<div class="fr-grid-row fr-grid-row--gutters !mb-16 w-full" id="territoires">
  {#each regionNames as regionName}
    <RegionCard {regionName} regionSlug={normalizeString(regionName)} />
  {/each}
</div>
