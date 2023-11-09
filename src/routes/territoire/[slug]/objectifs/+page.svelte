<script lang="ts">
  import MainViz from "$lib/main-viz.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Découvrir une première indication des objectifs territoriaux répartis par levier"
  nextLabel="Comprendre quels sont les ordres de grandeur qui illustrent les leviers"
  nextUrl="/territoire/{data.regionSlug}/ordres_de_grandeur/edition"
  backUrl="/#territoires"
  backLabel="Choisir un autre territoire"
  step="1"
>
  <p class="mb-2 max-w-3xl print:leading-tight">
    Voici à titre indicatif la contribution du territoire à la trajectoire
    nationale de baisse des émissions de gaz à effet de serre en 2030 par
    rapport à 2019. Les objectifs correspondants sont répartis dans le panorama
    des leviers du territoire présenté ci-dessous.
  </p>

  <div class="my-8 block print:my-0">
    <MainViz data={data.regionData} />
  </div>
</NavigationBar>
