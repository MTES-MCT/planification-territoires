<script lang="ts">
  import { prettifyNumber } from "$lib/utils.js";
  import type { Region } from "$lib/types";

  export let region: Region;
</script>

<div class="fr-col-md-3 fr-col-12">
  <div class="fr-card fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          <a href="/regions/{region.name}">{region.name}</a>
        </h3>
        <div class="fr-card__desc">
          <div class="mb-2 text-xs text-gray-600">Objectif de réduction</div>
          <p class="fr-badge">
            {prettifyNumber(region.totalObjCO2)}
            <span class="ml-1 normal-case">kTCO2</span>
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
