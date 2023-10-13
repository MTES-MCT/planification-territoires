<script lang="ts">
  import { page } from "$app/stores";

  import MainViz from "$lib/main-viz.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Visualisation de la progression par rapport à l’objectif 2030"
  backLabel="Éditer le diagnostic territorial"
  backUrl="/territoire/{data.regionSlug}/diagnostic/edition?{$page.url.searchParams.toString()}"
  step="3"
>
  <p class="mb-2">
    Voici les nouveaux objectifs actualisés sur la base des données renseignées.
    <span class="print:hidden">
      Vous pouvez ensuite visualiser les objectifs restants.
    </span>
  </p>

  <MainViz data={data.regionData} showProgression />

  <button
    class="fr-btn fr-btn--secondary mt-4 print:!hidden"
    on:click={() => {
      navigator.clipboard.writeText($page.url.href);
    }}
    >Copier le lien de partage
  </button>
  <button
    class="fr-btn fr-btn--secondary mb-12 mt-2 print:!hidden"
    on:click={() => print()}
    >Imprimer ou enregistrer en PDF
  </button>
</NavigationBar>
