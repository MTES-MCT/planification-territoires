<script lang="ts">
  import type { Lever } from "$lib/types";
  import { prettyNum } from "$lib/utils";

  export let data: {
    lever: Lever;
    showCompleted: boolean;
    showNewTargets: boolean;
  };
</script>

<div class="rounded border border-gray-300 bg-white px-4 py-2 text-sm">
  <div class="text-base font-semibold">{data.lever.group}</div>
  <div class="mb-1 font-semibold">{data.lever.sector}</div>
  <div class="mb-3">{data.lever.name}</div>

  <div class="value-row">
    <div class="desc">
      {#if data.showNewTargets}Objectif final{:else}Objectif initial{/if} :
    </div>
    <div class="value">
      {prettyNum(data.lever.objCO2, { negate: true, forceSign: true })}
    </div>
  </div>

  {#if data.showCompleted && data.lever.progressionCO2}
    <div class="value-row">
      <div class="desc">Réalisé :</div>
      <div class="value">
        {prettyNum(data.lever.progressionCO2, {
          negate: true,
          forceSign: true,
        })}
      </div>
    </div>

    <div class="value-row">
      <div class="desc">Objectif restant :</div>
      <div class="value">
        {prettyNum(data.lever.objCO2 - data.lever.progressionCO2, {
          negate: true,
          forceSign: true,
        })}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .value-row {
    @apply flex flex-row justify-between gap-1;
  }

  .value-row .desc {
    @apply shrink;
  }

  .value-row .value {
    @apply shrink-0 font-medium;
  }
</style>
