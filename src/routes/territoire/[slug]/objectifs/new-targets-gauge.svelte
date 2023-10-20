<script lang="ts">
  import { sum } from "$lib/utils";

  import { prettyNum } from "$lib/utils.js";
  import { completionLevels, newTargets } from "$lib/stores";

  import type { Action } from "$lib/types";

  export let regionData: Action[];
  export let hideWhenOk = true;

  $: expectedCO2 = sum(regionData.map((action) => action.objCO2));
  $: completedCO2 = sum(
    regionData.map(
      (action) =>
        $completionLevels[action.regionSlug][action.id] / action.ratioCO2toPhys
    )
  );
  $: targetCO2 = sum(
    regionData.map(
      (action) =>
        ($newTargets[action.regionSlug][action.id] ?? 0) / action.ratioCO2toPhys
    )
  );

  $: targetMiss = Math.round(expectedCO2 - completedCO2 - targetCO2);
</script>

{#if targetMiss > 0}
  <div class="fr-alert fr-alert--error fr-alert--sm">
    <p>
      Vous devez assigner {prettyNum(targetMiss)} supplémentaire
      {#if targetMiss >= 2}s{/if}
    </p>
  </div>
{:else if targetMiss < 0}
  <div class="fr-alert fr-alert--success fr-alert--sm">
    <p>
      Vos objectifs permettent de dépasser l'ambition globale de {prettyNum(
        targetMiss,
        { negate: true }
      )}
    </p>
  </div>
{:else if !hideWhenOk}
  <div class="fr-alert fr-alert--info fr-alert--sm">
    <p>Vos objectifs permettent d'atteindre l'ambition globale</p>
  </div>
{/if}
