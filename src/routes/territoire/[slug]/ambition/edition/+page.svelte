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

  function handleInputUpdate(newValueCO2: number, action: Action) {
    $newTargets[data.regionSlug][action.id] = newValueCO2;
    return updateURLfromStores(data.regionSlug);
  }

  onMount(() => {
    updateURLfromStores(data.regionSlug);
  });

  $: initialValuesCO2 = $newTargets[data.regionSlug];

  $: completedValuesCO2 = Object.fromEntries(
    data.regionData.map((action) => [
      action.id,
      $completionLevels[data.regionSlug][action.id],
    ])
  );
  const targetValuesCO2 = Object.fromEntries(
    data.regionData.map((action) => [
      action.id,
      action.objCO2 - $completionLevels[data.regionSlug][action.id],
    ])
  );
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Proposer une nouvelle ambition pour le territoire"
  nextLabel="Visualiser une nouvelle ambition pour le territoire"
  nextUrl="/territoire/{data.regionSlug}/ambition"
  backLabel="Visualiser l’impact des changements d’ordres de grandeur"
  backUrl="/territoire/{data.regionSlug}/ordres_de_grandeur"
  step="4"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-3xl">
      Pour chaque secteur, proposez un objectif que vous estimez atteignable
      pour le territoire. Vous avez ainsi la possibilité d'être plus ou moins
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
      {initialValuesCO2}
      {targetValuesCO2}
      {completedValuesCO2}
      noProgress
    />
  </form>
</NavigationBar>
