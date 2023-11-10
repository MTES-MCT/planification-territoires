<script lang="ts">
  import { normalizeString, getRegions } from "$lib/utils";
  import RegionCard from "./_index/region-card.svelte";

  const regions = getRegions();
</script>

<h1 class="mt-12 max-w-3xl">
  COP territoriales : simuler des objectifs de baisse des émissions de gaz à
  effet de serre pour son territoire
</h1>
<div class="mb-12 max-w-3xl">
  <p class="mb-3">
    Le simulateur territorial permet de comprendre les leviers de baisse des
    émissions de gaz à effet de serre pour 2030 puis de simuler à l’échelle de
    son territoire de nouveaux objectifs correspondants. La démarche consiste
    donc à :
  </p>
  <ol>
    <li>
      <strong>Découvrir</strong> à titre indicatif les objectifs du territoire répartis
      par levier
    </li>
    <li>
      <strong>Comprendre</strong> quels sont les ordres de grandeur qui illustrent
      les leviers
    </li>
    <li>
      <strong>Visualiser</strong> l’impact qu'un changement d'ordre de grandeur peut
      avoir sur les objectifs
    </li>
    <li>
      <strong>Proposer</strong> de nouveaux objectifs par levier sur la base des
      étapes précédentes
    </li>
    <li>
      <strong>Partager</strong> les objectifs qui forment une nouvelle ambition pour
      le territoire
    </li>
  </ol>
  <p>
    Les données présentées sont des données de travail qui n'engagent en rien
    l’État.
    <br />
    <a class="fr-link" href="/a-propos#cop"
      >En savoir plus sur sur les COP territoriales</a
    >. <br />
    <a class="fr-link" href="/a-propos#simulateur"
      >En savoir plus sur le simulateur territorial</a
    >.
  </p>
</div>
<div class="mb-8 max-w-3xl print:hidden">
  <p>
    Sélectionner sa région pour découvrir à titre indicatif la contribution de
    son territoire à la trajectoire nationale de baisse des émissions de gaz à
    effet de serre en 2030 par rapport à 2019.
  </p>
</div>
<div class="fr-grid-row fr-grid-row--gutters !mb-16 w-full" id="territoires">
  {#each regions as region}
    <RegionCard {region} regionSlug={normalizeString(region.regionName)} />
  {/each}
</div>
