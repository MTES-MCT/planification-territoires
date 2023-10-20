<script lang="ts">
  import { onMount } from "svelte";

  import { getRegionName } from "$lib/utils";
  import { updateURLfromStores } from "$lib/url-utils";
  import { completionLevels } from "$lib/stores";
  import ActionsForm from "$lib/actions-form.svelte";

  import NavigationBar from "../../navigation-bar.svelte";

  import type { Action } from "$lib/types";

  export let data;

  function handleInputUpdate(newValuePhys: number, action: Action) {
    $completionLevels[data.regionSlug][action.id] = newValuePhys;
    return updateURLfromStores(data.regionSlug);
  }

  onMount(() => {
    updateURLfromStores(data.regionSlug);
  });

  $: initialValuesPhys = $completionLevels[data.regionSlug];
  $: targetValuesPhys = Object.fromEntries(
    data.regionData.map((action) => [action.id, action.objPhys])
  );
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Comprendre les ordres de grandeur"
  nextLabel="Visualiser l’impact des changements d’ordres de grandeur"
  nextUrl="/territoire/{data.regionSlug}/diagnostic"
  backLabel="Voir les objectifs territoriaux"
  backUrl="/territoire/{data.regionSlug}"
  step="2"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-3xl">
      Pour chaque secteur, traduisez les objectifs de baisse des émissions de
      gaz à effet de serre en ordres de grandeur physiques pour en mesurer
      l’impact. Ces ordres de grandeur sont illustratifs et indicatifs, chaque
      levier reposant dans les faits sur plusieurs données physiques, mais
      permettent de rendre tangible la marche à franchir. Lorsque la donnée
      était disponible pour toutes les régions, des informations sur le point de
      départ sont indiquées à titre d’information. Jouez avec ces ordres de
      grandeur pour mesurer l’impact sur l’objectif 2030.
    </p>
  </div>
  <form class="mb-6">
    <ActionsForm
      onUpdate={handleInputUpdate}
      regionData={data.regionData}
      inputLabel="Action"
      {initialValuesPhys}
      {targetValuesPhys}
    />
  </form>
</NavigationBar>
