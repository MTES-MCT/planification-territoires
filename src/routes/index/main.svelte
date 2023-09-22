<script lang="ts">
  import type { Region } from "$lib/types";
  import rawRegions from "$lib/regions.json";

  const regions = rawRegions as Region[];
</script>

<div class="fr-container">
  <h1>Régions</h1>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-1w w-full">
    {#each regions as region}
      <div class="fr-col-md-3 fr-col-12">
        <div class="fr-card fr-enlarge-link">
          <div class="fr-card__body">
            <div class="fr-card__content">
              <h3 class="fr-card__title">
                <a href="/regions/{region.name}">{region.name}</a>
              </h3>
              <div class="fr-card__desc">
                <div class="mb-2 text-xs text-gray-600">
                  Objectif de réduction
                </div>
                <p class="fr-badge">
                  {(region.totalObjCO2 / 1000).toFixed(2)}
                  <span class="ml-2 normal-case">kTCO2</span>
                </p>
                <div class="mb-2 mt-4 text-xs text-gray-600">
                  Part de la population
                </div>
                <p class="fr-badge transform-none">
                  {region.populationShare}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  select {
    @apply rounded border border-gray-300 bg-transparent px-1 py-0.5 leading-9 outline-title-blue-france;
  }
</style>
