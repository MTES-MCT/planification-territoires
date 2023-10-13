<script lang="ts">
  import { getRegionName } from "$lib/utils";
  import { tidy, groupBy } from "@tidyjs/tidy";

  import { page } from "$app/stores";

  import NavigationBar from "../navigation-bar.svelte";
  import CompletionLevelInput from "./completion-level-input.svelte";

  import type { Action } from "$lib/types";

  export let data;

  const sectors = tidy(
    data.regionData,
    groupBy(["sector", "group"], [], groupBy.entriesObject())
  );

  function handleInputUpdate(_newValuePhys: number, _action: Action) {}

  $: resultatsAjusteUrl = `/territoire/${
    data.regionSlug
  }/resultats-ajuste?${$page.url.searchParams.toString()}`;
</script>

<NavigationBar
  territoryName={getRegionName(data.regionSlug)}
  title="Réajustez votre ambition"
  nextLabel="Visualisez l’ambition de votre territoire"
  nextUrl={resultatsAjusteUrl}
  backLabel="Visualiser le panorama des leviers actualisé"
  backUrl="/territoire/{data.regionSlug}/resultats?{$page.url.searchParams.toString()}"
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
  <form class="mb-6">
    {#each sectors as sector}
      <fieldset class="mb-10">
        <div class="mb-4 mt-2 w-full">
          <legend><h2 class="mb-1">{sector.key}</h2></legend>
        </div>
        <div class="mb-4 grid gap-6 md:grid-cols-2">
          {#each sector.values as group}
            {#each group.values as action}
              <CompletionLevelInput
                {action}
                valuePhys={action.objPhys}
                onUpdate={(newValuePhys, action) =>
                  handleInputUpdate(newValuePhys, action)}
              />
            {/each}
          {/each}
        </div>
      </fieldset>
    {/each}
  </form>
</NavigationBar>
