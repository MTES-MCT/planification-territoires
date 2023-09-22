<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { tidy, groupBy } from "@tidyjs/tidy";

  import CompletionLevelInput from "./completion-level-input.svelte";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;

  const sectors = tidy(
    data.regionData,
    groupBy(["sector", "category"], [], groupBy.entriesObject())
  );
  // À chaque modification de data.completionLevels, on met à jour
  // la querystring
  $: {
    Object.entries(data.completionLevels).forEach((c) =>
      $page.url.searchParams.set(c[0], c[1].toString())
    );
    goto(`?${$page.url.searchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
    });
  }
</script>

<svelte:head>
  <title>{data.region} | Objectifs | Simulateur territoires</title>
</svelte:head>

<NavigationBar region={data.region} title="Définition des objectifs" />
<a
  class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
  href="/regions/{data.region}/resultats?{$page.url.searchParams.toString()}"
  >Visualiser les objectifs actualisés</a
>

<form class="mb-12">
  {#each sectors as sector}
    <fieldset>
      <div class="mb-4 mt-8 w-full">
        <legend><h2 class="mb-1">{sector.key}</h2></legend>
      </div>
      <div class="mb-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each sector.values as category}
          {#each category.values as lever}
            <CompletionLevelInput
              {lever}
              bind:completionLevels={data.completionLevels}
            />
          {/each}
        {/each}
      </div>

      <a
        class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
        href="/regions/{data.region}/resultats?{$page.url.searchParams.toString()}"
        >Visualiser les objectifs actualisés</a
      >
    </fieldset>
  {/each}
</form>
