<script lang="ts">
  import { onMount } from "svelte";

  import { getRegionName } from "$lib/utils";
  import { updateURLfromStores } from "$lib/url-utils";
  import { completionLevels } from "$lib/stores";
  import ActionsForm from "$lib/actions-form.svelte";

  import NavigationBar from "../../navigation-bar.svelte";

  import type { Action } from "$lib/types";

  export let data;

  function handleInputUpdate(newValueCO2: number, action: Action) {
    $completionLevels[data.regionSlug][action.id] = newValueCO2;
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
  title="Comprendre les ordres de grandeur"
  nextLabel="Visualiser l’impact des changements d’ordres de grandeur"
  nextUrl="/territoire/{data.regionSlug}/ordres_de_grandeur"
  backLabel="Voir les objectifs territoriaux"
  backUrl="/territoire/{data.regionSlug}/objectifs"
  step="2"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-3xl">
      Pour chaque secteur, traduisez les objectifs de baisse des émissions de
      gaz à effet de serre en ordres de grandeur physiques. Ces ordres de
      grandeur sont illustratifs et indicatifs, chaque levier reposant dans les
      faits sur un ensemble de politiques publiques qui doivent être combinées
      pour atteindre l’objectif. Lorsque la donnée était disponible pour toutes
      les régions, les points de départ des ordres de grandeur sont indiqués à
      titre d’information. Jouez avec ces ordres de grandeur pour estimer
      l’impact sur l’objectif 2030.
    </p>
  </div>
  <form class="mb-6">
    <ActionsForm
      onUpdate={handleInputUpdate}
      regionData={data.regionData}
      inputLabel="Action"
      {initialValuesCO2}
      {targetValuesCO2}
      {completedValuesCO2}
    />
  </form>
</NavigationBar>
