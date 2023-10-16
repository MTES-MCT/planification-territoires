<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import { getQVKeyForNewTarget, getRegionName } from "$lib/utils";
  import { completionLevels, newTargets } from "$lib/stores";
  import ActionsForm from "$lib/actions-form.svelte";

  import NavigationBar from "../../navigation-bar.svelte";
  import NewTargetsGauge from "../new-targets-gauge.svelte";

  import type { Action } from "$lib/types";

  export let data;

  function updateURL() {
    const newSearchParams = new URLSearchParams($page.url.searchParams);

    Object.entries($newTargets[data.regionSlug]).forEach(([key, value]) => {
      if (value != null) {
        newSearchParams.set(
          getQVKeyForNewTarget(key),
          Number(value.toFixed(4)).toString()
        );
      } else {
        newSearchParams.delete(getQVKeyForNewTarget(key));
      }
    });
    goto(`?${newSearchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }

  function handleInputUpdate(newValuePhys: number, action: Action) {
    $newTargets[data.regionSlug][action.id] = newValuePhys;
    updateURL();
  }

  onMount(() => {
    updateURL();
  });

  $: initialValuesPhys = $newTargets[data.regionSlug];
  $: targetValuesPhys = Object.fromEntries(
    data.regionData.map((action) => [
      action.id,
      action.objPhys - $completionLevels[data.regionSlug][action.id],
    ])
  );
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Réajustez votre ambition"
  nextLabel="Visualisez l’ambition de votre territoire"
  nextUrl={`/territoire/${
    data.regionSlug
  }/objectifs?${$page.url.searchParams.toString()}`}
  backLabel="Visualiser le panorama des leviers actualisé"
  backUrl="/territoire/{data.regionSlug}/diagnostic?{$page.url.searchParams.toString()}"
  step="4"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-2xl text-lg">
      Pour chaque secteur, renseignez l’objectif que vous estimez atteignable
      pour votre territoire. Vous avez ainsi la possibilité d'être plus ou moins
      ambitieux que l’objectif initialement indiqué et mis à jour dans l'étape
      précédente. En conséquence, une jauge apparaîtra vous permettant de suivre
      les ktCO₂e qu’il vous reste à répartir.
    </p>
  </div>
  <div slot="sticky-top" class="mb-4">
    <NewTargetsGauge regionData={data.regionData} hideWhenOk={false}
    ></NewTargetsGauge>
  </div>

  <form class="mb-6">
    <ActionsForm
      onUpdate={handleInputUpdate}
      regionData={data.regionData}
      inputLabel="Objectif estimé comme atteignable en 2030"
      {initialValuesPhys}
      {targetValuesPhys}
      noProgress
    />
  </form>
</NavigationBar>
