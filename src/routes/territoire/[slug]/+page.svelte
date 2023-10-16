<script lang="ts">
  import MainViz from "$lib/main-viz.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "./navigation-bar.svelte";

  export let data;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Présentation de vos objectifs territoriaux pour 2030"
  nextLabel="Réaliser le diagnostic territorial"
  nextUrl={`/territoire/${data.regionSlug}/diagnostic/edition`}
  backUrl="/#territoires"
  backLabel="Choisir un autre territoire"
  step="1"
>
  <p class="mb-2 print:leading-tight">
    Voici le flux annuel de baisse des émissions de GES par rapport à 2019 que
    vous devez atteindre d'ici 2030.
    <span class="print:hidden">
      À partir de ce tableau et grâce à l’outil suivant, réalisez votre
      diagnostic territorial.
    </span>
  </p>

  <div class="my-8 block print:my-0">
    <MainViz data={data.regionData} />
  </div>
</NavigationBar>
