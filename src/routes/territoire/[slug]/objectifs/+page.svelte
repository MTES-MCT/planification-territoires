<script lang="ts">
  import MainViz from "$lib/main-viz.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Présentation des objectifs territoriaux pour 2030"
  nextLabel="Comprendre les ordres de grandeur"
  nextUrl="/territoire/{data.regionSlug}/ordres_de_grandeur/edition"
  backUrl="/#territoires"
  backLabel="Choisir un autre territoire"
  step="1"
>
  <p class="mb-2 max-w-3xl print:leading-tight">
    Voici la baisse des émissions de gaz à effet de serre attendue en 2030 par
    rapport à 2019. Les différents gaz à effet de serre sont comptabilisés en
    équivalent CO₂ (CO2₂e), une unité commune introduite par le GIEC pour
    permettre des comparaisons basées sur le pouvoir de réchauffement global de
    chacun des gaz à effet de serre.
  </p>

  <div class="my-8 block print:my-0">
    <MainViz data={data.regionData} />
  </div>
</NavigationBar>
