<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import { updateURLfromStores } from "$lib/url-utils";
  import MainViz from "$lib/main-viz.svelte";
  import ShareButtons from "$lib/share-buttons.svelte";
  import { getRegionName } from "$lib/utils";
  import { newTargets } from "$lib/stores";

  import NavigationBar from "../navigation-bar.svelte";
  import NewTargetsGauge from "./new-targets-gauge.svelte";

  import type { Action } from "$lib/types";

  export let data;

  onMount(() => {
    updateURLfromStores(data.regionSlug);
  });

  $: targetData = data.regionData.map((action: Action) => {
    const valueCO2 = $newTargets[action.regionSlug][action.id] ?? 0;
    return {
      ...action,
      objCO2: valueCO2,
    };
  });
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Partager les objectifs qui forment une nouvelle ambition pour le territoire"
  backUrl="/territoire/{data.regionSlug}/ambition/edition?{$page.url
    .searchParams}"
  step="5"
>
  <p class="mb-2 max-w-3xl">
    Voici les nouveaux objectifs proposés répartis dans le panorama des leviers
    du territoire.
  </p>

  <div class="mb-4">
    <NewTargetsGauge regionData={data.regionData}></NewTargetsGauge>
  </div>

  <MainViz data={targetData} showNewTargets />
  <ShareButtons />
</NavigationBar>
