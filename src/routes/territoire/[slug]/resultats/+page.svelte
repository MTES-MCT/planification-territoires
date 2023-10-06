<script lang="ts">
  import { page } from "$app/stores";

  import MainViz from "$lib/main-viz.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;

  let nouvelObjectifUrl = `/territoire/${
    data.regionSlug
  }/nouvel-objectif?${$page.url.searchParams.toString()}`;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Visualisation du réalisé par rapport à l’objectif 2030"
  nextLabel="Visualiser les objectifs restants"
  nextUrl={nouvelObjectifUrl}
  backLabel="Éditer le diagnostic territorial"
  backUrl="/territoire/{data.regionSlug}/diagnostic?{$page.url.searchParams.toString()}"
  step="3"
>
  <p class="mb-2">
    Voici les nouveaux objectifs actualisés sur la base des données renseignées.
    <span class="print:hidden">
      Vous pouvez ensuite visualiser les objectifs restants.</span
    >
  </p>

  <div class="h-[75vh]">
    <MainViz data={data.regionData} showProgression />
  </div>

  <button
    class="fr-btn fr-btn--secondary mb-12 mt-4 print:!hidden"
    on:click={() => {
      navigator.clipboard.writeText($page.url.href);
    }}
    >Copier le lien de partage
  </button>
</NavigationBar>
