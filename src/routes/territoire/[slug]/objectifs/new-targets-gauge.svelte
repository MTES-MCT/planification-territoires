<script lang="ts">
  import sum from "lodash/sum";

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
  <div class="fr-alert fr-alert--error">
    <h3 class="fr-alert__title">Objectifs insuffisants</h3>
    <p>
      Vous devez assigner {prettyNum(targetMiss)} supplémentaire{#if targetMiss >= 2}s{/if}
    </p>
  </div>
{:else if targetMiss < 0}
  <div class="fr-alert fr-alert--success">
    <h3 class="fr-alert__title">Objectifs dépassés</h3>
    <p>
      Vos objectifs sont dépassés de {prettyNum(targetMiss, { negate: true })}
    </p>
  </div>
{:else if !hideWhenOk}
  <div class="fr-alert fr-alert--info">
    <h3 class="fr-alert__title">Objectifs satisfaisants</h3>
    <p>Vos objectifs répondent aux attentes</p>
  </div>
{/if}
