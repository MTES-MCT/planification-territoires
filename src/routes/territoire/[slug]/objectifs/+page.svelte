<script lang="ts">
  import MainViz from "$lib/main-viz.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Découvrir à titre indicatif les objectifs du territoire répartis par levier"
  nextLabel={data.regionLimited
    ? ""
    : "Comprendre quels sont les ordres de grandeur qui illustrent les leviers"}
  nextUrl={data.regionLimited
    ? undefined
    : `/territoire/${data.regionSlug}/ordres_de_grandeur/edition`}
  backUrl="/"
  step="1"
  totalSteps={data.regionLimited ? 1 : undefined}
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
