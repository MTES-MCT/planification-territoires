<script lang="ts">
  import { tidy, groupBy } from "@tidyjs/tidy";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import completionLevels from "$lib/completion-levels-store";
  import NavigationBar from "../navigation-bar.svelte";
  import CompletionLevelInput from "./completion-level-input.svelte";

  export let data;

  const sectors = tidy(
    data.regionData,
    groupBy(["sector", "category"], [], groupBy.entriesObject())
  );

  // À chaque modification de completionLevels, on met à jour
  // la querystring
  $: {
    Object.entries($completionLevels[data.region])
      .filter((c) => c[1] !== 0)
      .forEach((c) => $page.url.searchParams.set(c[0], (c[1] || 0).toString()));
    goto(`?${$page.url.searchParams.toString()}`, {
      keepFocus: true,
      noScroll: true,
      replaceState: true,
    });
  }

  $: resultatsUrl = `/regions/${
    data.region
  }/resultats?${$page.url.searchParams.toString()}`;
</script>

<svelte:head>
  <title>{data.region} | Objectifs | Simulateur territoires</title>
</svelte:head>

<NavigationBar
  region={data.region}
  title="Votre diagnostic territorial"
  nextLabel="Visualiser le panorama des leviers actualisé"
  nextUrl={resultatsUrl}
  backLabel="Voir les objectifs territoriaux"
  backUrl="/regions/{data.region}"
  step="2"
/>
<p class="max-w-2xl text-lg">
  Pour chaque secteur, renseignez les actions déjà menées ou contractualisées.
  En conséquence, le <a class="fr-link" href={resultatsUrl}
    >panorama des leviers</a
  > se mettra mécaniquement à jour. Pour permettre une harmonisation de l’évaluation
  de la baisse des émissions de GES, nous avons utilisé un traducteur de vos politiques
  publiques qui convertit le résultat d’actions concrètes en ktCO₂ évitées.
</p>

<form class="mb-12">
  {#each sectors as sector}
    <fieldset class="mb-12">
      <div class="mb-4 mt-2 w-full">
        <legend><h2 class="mb-1">{sector.key}</h2></legend>
      </div>
      <div class="mb-4 grid gap-6 md:grid-cols-2">
        {#each sector.values as category}
          {#each category.values as lever}
            <CompletionLevelInput {lever} />
          {/each}
        {/each}
      </div>
      <a
        class="fr-btn fr-btn--secondary fr-icon-arrow-right-line fr-btn--icon-right"
        href={resultatsUrl}>Visualisez votre panorama des leviers actualisé</a
      >
    </fieldset>
  {/each}
</form>
