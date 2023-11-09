<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  import { getRegionName } from "$lib/utils";
  import { updateURLfromStores } from "$lib/url-utils";
  import { completionLevels, newTargets } from "$lib/stores";
  import ActionsForm from "$lib/actions-form.svelte";

  import NavigationBar from "../../navigation-bar.svelte";

  import type { Action } from "$lib/types";

  export let data;

  function handleInputUpdate(newValueCO2: number, action: Action) {
    $completionLevels[data.regionSlug][action.id] = newValueCO2;
    $newTargets[data.regionSlug][action.id] = null;
    return updateURLfromStores(data.regionSlug);
  }

  onMount(() => {
    updateURLfromStores(data.regionSlug);
  });

  $: initialValuesCO2 = $completionLevels[data.regionSlug];

  const completedValuesCO2 = Object.fromEntries(
    data.regionData.map((action) => [action.id, 0])
  );
  const targetValuesCO2 = Object.fromEntries(
    data.regionData.map((action) => [action.id, action.objCO2])
  );
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Comprendre quels sont les ordres de grandeur qui illustrent les leviers"
  nextLabel="Visualiser l’impact qu’un changement d’ordre de grandeur peut avoir sur les objectifs"
  nextUrl="/territoire/{data.regionSlug}/ordres_de_grandeur?{$page.url
    .searchParams}"
  backLabel="Retourner à la première indication des objectifs territoriaux répartis par levier"
  backUrl="/territoire/{data.regionSlug}/objectifs"
  step="2"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-3xl">
      Pour chaque secteur et pour chaque levier, les objectifs de baisse des
      émissions de gaz à effet de serre sont illustrés par des ordres de
      grandeur physiques. Ces ordres de grandeur sont indicatifs, chaque levier
      reposant sur un ensemble de politiques publiques qui doivent être
      combinées pour atteindre l’objectif. Lorsque la donnée est disponible pour
      toutes les régions, les points de départ des ordres de grandeur sont
      pré-remplis à titre d’information. Jouez avec ces ordres de grandeur pour
      visualiser l’impact qu'un changement d’ordre de grandeur peut avoir sur
      les objectifs.
    </p>
  </div>
  <form class="mb-6">
    <ActionsForm
      onUpdate={handleInputUpdate}
      regionData={data.regionData}
      inputLabel="Simulateur"
      {initialValuesCO2}
      {targetValuesCO2}
      {completedValuesCO2}
    />
  </form>
</NavigationBar>
