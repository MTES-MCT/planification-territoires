<script lang="ts">
  import PrettyNumber from "$lib/pretty-number.svelte";
  import { sum } from "$lib/utils";

  import { completionLevels, newTargets } from "$lib/stores";

  import type { Action } from "$lib/types";

  export let regionData: Action[];
  export let hideWhenOk = true;

  $: expectedCO2 = sum(regionData.map((action) => action.objCO2));
  $: completedCO2 = sum(
    regionData.map((action) => $completionLevels[action.regionSlug][action.id])
  );
  $: targetCO2 = sum(
    regionData.map((action) => $newTargets[action.regionSlug][action.id] ?? 0)
  );

  $: targetMiss = Math.round(expectedCO2 - completedCO2 - targetCO2);
</script>

{#if targetMiss > 0}
  <div class="fr-alert fr-alert--error fr-alert--sm">
    <p>
      Vous devez assigner <PrettyNumber number={targetMiss} />
      {#if targetMiss < 2}supplémentaire{:else}supplémentaires{/if}
    </p>
  </div>
{:else if targetMiss < 0}
  <div class="fr-alert fr-alert--success fr-alert--sm">
    <p>
      Vos objectifs permettent de dépasser l'ambition globale de
      <PrettyNumber number={targetMiss} negate />
    </p>
  </div>
{:else if !hideWhenOk}
  <div class="fr-alert fr-alert--info fr-alert--sm">
    <p>Vos objectifs permettent d'atteindre l'ambition globale</p>
  </div>
{/if}
