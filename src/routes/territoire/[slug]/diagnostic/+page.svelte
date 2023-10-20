<script lang="ts">
  import { onMount } from "svelte";
  import MainViz from "$lib/main-viz.svelte";
  import ShareButtons from "$lib/share-buttons.svelte";
  import { getRegionName } from "$lib/utils";
  import { updateURLfromStores } from "$lib/url-utils";

  import NavigationBar from "../navigation-bar.svelte";

  export let data;

  onMount(() => {
    updateURLfromStores(data.regionSlug);
  });
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Impact des changements d’ordres de grandeur"
  backLabel="Comprendre les ordres de grandeur"
  backUrl="/territoire/{data.regionSlug}/diagnostic/edition"
  nextLabel="Réajuster votre ambition"
  nextUrl="/territoire/{data.regionSlug}/objectifs/edition"
  step="3"
>
  <p class="mb-2 max-w-3xl">
    Voici l’impact des changements d’ordres de grandeur renseignés lors de
    l’étape précédente sur le panorama des leviers du territoire.
    <span class="print:hidden">
      Vous pouvez ensuite visualiser les objectifs restants.
    </span>
  </p>

  <MainViz data={data.regionData} showCompleted />

  <ShareButtons />
</NavigationBar>
