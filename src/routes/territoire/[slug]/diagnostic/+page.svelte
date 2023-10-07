<script lang="ts">
  import { getRegionName } from "$lib/utils";
  import { tidy, groupBy } from "@tidyjs/tidy";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import completionLevels from "$lib/completion-levels-store";
  import NavigationBar from "../navigation-bar.svelte";
  import CompletionLevelInput from "./completion-level-input.svelte";

  import type { Lever } from "$lib/types";

  export let data;

  const sectors = tidy(
    data.regionData,
    groupBy(["sector", "category"], [], groupBy.entriesObject())
  );

  function handleInputUpdate(newValuePhys: number, lever: Lever) {
    $completionLevels[data.regionSlug][lever.id] = newValuePhys;
    // Mise à jour de l'URL
    const newSearchParams = new URLSearchParams($page.url.searchParams);
    if (!newValuePhys) {
      newSearchParams.delete(lever.id);
    } else {
      newSearchParams.set(lever.id, Number(newValuePhys.toFixed(4)).toString());
    }
    goto(`?${newSearchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }

  $: resultatsUrl = `/territoire/${
    data.regionSlug
  }/resultats?${$page.url.searchParams.toString()}`;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Votre diagnostic territorial"
  nextLabel="Visualiser le panorama des leviers actualisé"
  nextUrl={resultatsUrl}
  backLabel="Voir les objectifs territoriaux"
  backUrl="/territoire/{data.regionSlug}/objectifs"
  step="2"
  stickyFooter
>
  <div slot="no-sticky">
    <p class="max-w-2xl text-lg">
      Pour chaque secteur, renseignez les actions déjà menées ou
      contractualisées. En conséquence, le panorama des leviers se mettra
      mécaniquement à jour. Pour permettre une harmonisation de l’évaluation de
      la baisse des émissions de GES, nous avons utilisé un traducteur de vos
      politiques publiques qui convertit le résultat d’actions concrètes en
      ktCO₂ évitées.
    </p>
  </div>
  <form class="mb-6">
    {#each sectors as sector}
      <fieldset class="mb-10">
        <div class="mb-4 mt-2 w-full">
          <legend><h2 class="mb-1">{sector.key}</h2></legend>
        </div>
        <div class="mb-4 grid gap-6 md:grid-cols-2">
          {#each sector.values as category}
            {#each category.values as lever}
              <CompletionLevelInput
                {lever}
                valuePhys={$completionLevels[lever.regionSlug][lever.id]}
                onUpdate={(newValuePhys, lever) =>
                  handleInputUpdate(newValuePhys, lever)}
              />
            {/each}
          {/each}
        </div>
      </fieldset>
    {/each}
  </form>
</NavigationBar>
