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
  title="Visualisez l’ambition de votre territoire"
  backLabel="Réajustez votre ambition"
  backUrl="/territoire/{data.regionSlug}/objectifs/edition?{$page.url.searchParams.toString()}"
  step="5"
>
  <p class="mb-2">
    Voici les objectifs finaux ajustés sur la base de votre ambition
    territoriale
  </p>

  <MainViz data={data.regionData} showProgression />
  <ShareButtons />
</NavigationBar>
