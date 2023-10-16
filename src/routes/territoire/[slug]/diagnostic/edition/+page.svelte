<script lang="ts">
  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import { getQVKeyForCompleted, getRegionName } from "$lib/utils";
  import { completionLevels } from "$lib/stores";
  import ActionsForm from "$lib/actions-form.svelte";

  import NavigationBar from "../../navigation-bar.svelte";

  import type { Action } from "$lib/types";

  export let data;

  function updateURL() {
    const newSearchParams = new URLSearchParams($page.url.searchParams);

    Object.entries($completionLevels[data.regionSlug]).forEach(
      ([key, value]) => {
        if (value) {
          newSearchParams.set(
            getQVKeyForCompleted(key),
            Number(value.toFixed(4)).toString()
          );
        } else {
          newSearchParams.delete(getQVKeyForCompleted(key));
        }
      }
    );
    goto(`?${newSearchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }
  function handleInputUpdate(newValuePhys: number, action: Action) {
    $completionLevels[data.regionSlug][action.id] = newValuePhys;
    updateURL();
  }

  onMount(() => updateURL());

  $: initialValuesPhys = $completionLevels[data.regionSlug];
  $: targetValuesPhys = Object.fromEntries(
    data.regionData.map((action) => [action.id, action.objPhys])
  );
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Votre diagnostic territorial"
  nextLabel="Visualiser le panorama des leviers actualisé"
  nextUrl={`/territoire/${
    data.regionSlug
  }/diagnostic?${$page.url.searchParams.toString()}`}
  backLabel="Voir les objectifs territoriaux"
  backUrl="/territoire/{data.regionSlug}"
  step="2"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-2xl text-lg">
      Pour chaque secteur, renseignez le résultat des actions déjà menées,
      contractualisées ou planifiées. En conséquence, le panorama des leviers se
      mettra mécaniquement à jour. Pour permettre une harmonisation de
      l’évaluation de la baisse des émissions de GES, nous avons utilisé un
      traducteur de vos politiques publiques qui convertit le résultat d’actions
      concrètes en ktCO₂e évitées.
    </p>
  </div>
  <form class="mb-6">
    <ActionsForm
      onUpdate={handleInputUpdate}
      regionData={data.regionData}
      inputLabel="Action déjà menée ou contractualisée"
      {initialValuesPhys}
      {targetValuesPhys}
    />
  </form>
</NavigationBar>
