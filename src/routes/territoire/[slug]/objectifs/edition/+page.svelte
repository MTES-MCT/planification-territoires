<script lang="ts">
  import { onMount } from "svelte";

  import { getRegionName } from "$lib/utils";
  import { updateURLfromStores } from "$lib/url-utils";
  import { completionLevels, newTargets } from "$lib/stores";
  import ActionsForm from "$lib/actions-form.svelte";

  import NavigationBar from "../../navigation-bar.svelte";
  import NewTargetsGauge from "../new-targets-gauge.svelte";

  import type { Action } from "$lib/types";

  export let data;

  function handleInputUpdate(newValuePhys: number, action: Action) {
    $newTargets[data.regionSlug][action.id] = newValuePhys;
    return updateURLfromStores(data.regionSlug);
  }

  onMount(() => {
    updateURLfromStores(data.regionSlug);
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
  nextUrl="/territoire/{data.regionSlug}/objectifs"
  backLabel="Visualiser l’impact des changements d’ordres de grandeur"
  backUrl="/territoire/{data.regionSlug}/diagnostic"
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
