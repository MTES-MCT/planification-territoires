<script lang="ts">
  import { page } from "$app/stores";
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
  title="Visualiser l’impact qu'un changement d'ordre de grandeur peut avoir sur les objectifs"
  backUrl="/territoire/{data.regionSlug}/ordres_de_grandeur/edition?{$page.url
    .searchParams}"
  nextLabel="Proposer de nouveaux objectifs par levier sur la base des étapes précédentes"
  nextUrl="/territoire/{data.regionSlug}/ambition/edition?{$page.url
    .searchParams}"
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
