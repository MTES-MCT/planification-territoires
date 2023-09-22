<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { tidy, groupBy } from "@tidyjs/tidy";

  import CompletionLevelInput from "./completion-level-input.svelte";

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

<h1 class="mb-0 text-base">{data.region}</h1>
<a class="fr-link text-normal" href="/">Choisir une autre région</a>
<h2 class="mb-0 mt-4">Définition des objectifs</h2>
<form class="mb-12 px-3">
  {#each sectors as sector}
    <fieldset class="fr-fieldset gap-6">
      <legend class="mb-4"
        ><h3 class="mb-1 mt-8">{sector.key}</h3>
        <a
          class="fr-link fr-icon-arrow-right-line fr-link--icon-right block"
          href="/regions/{data.region}/resultats?{$page.url.searchParams.toString()}"
          >Visualiser</a
        ></legend
      >
      {#each sector.values as category}
        {#each category.values as lever}
          <CompletionLevelInput
            {lever}
            bind:completionLevels={data.completionLevels}
          />
        {/each}
      {/each}
    </fieldset>
  {/each}
</form>
