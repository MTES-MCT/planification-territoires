<script lang="ts">
  import { page } from "$app/stores";

  import MainViz from "$lib/main-viz.svelte";
  import ShareButtons from "$lib/share-buttons.svelte";
  import { getRegionName } from "$lib/utils";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Visualisation de la progression par rapport à l’objectif 2030"
  backLabel="Éditer le diagnostic territorial"
  backUrl="/territoire/{data.regionSlug}/diagnostic/edition?{$page.url.searchParams.toString()}"
  nextLabel="Réajustez votre ambition"
  nextUrl="/territoire/{data.regionSlug}/ambition?{$page.url.searchParams.toString()}"
  step="3"
>
  <p class="mb-2">
    Voici les nouveaux objectifs actualisés sur la base des données renseignées.
    <span class="print:hidden">
      Vous pouvez ensuite visualiser les objectifs restants.
    </span>
  </p>

  <MainViz data={data.regionData} showProgression />

  <ShareButtons />
</NavigationBar>
