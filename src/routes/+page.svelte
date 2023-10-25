<script lang="ts">
  import { getRegionsNames, normalizeString } from "$lib/utils";
  import RegionCard from "./_index/region-card.svelte";

  const regionNames = getRegionsNames();
</script>

<h1 class="mt-12 max-w-xl">
  Visualiser les leviers de baisse des émissions de gaz à effet de serre sur son
  territoire dans le cadre des COP territoriales
</h1>
<div class="mb-8 max-w-2xl">
  <p class="max-w-2xl">
    Le simulateur territorial vous permet de comprendre et de vous approprier
    les objectifs de baisse des émissions de gaz à effet de serre pour 2030 à
    l’échelle territoriale. La démarche consiste à :
  </p>
  <ol>
    <li>Visualiser les objectifs territoriaux répartis par leviers</li>
    <li>Comprendre les ordres de grandeur en se servant d’approximations</li>
    <li>Faire varier l’ambition par leviers grâce à un simulateur</li>
  </ol>
  <p>
    Les données présentées sont des données de travail qui n'engagent en rien
    l'État.
    <a class="fr-link" href="/a-propos"
      >En savoir plus sur le simulateur territorial</a
    >.
  </p>
  <p>
    Sélectionner sa région pour visualiser à titre indicatif la part de son
    territoire dans les objectifs nationaux de baisse des émissions de gaz à
    effet de serre pour 2030.
  </p>
</div>
<div class="fr-grid-row fr-grid-row--gutters !mb-16 w-full" id="territoires">
  {#each regionNames as regionName}
    <RegionCard {regionName} regionSlug={normalizeString(regionName)} />
  {/each}
</div>
