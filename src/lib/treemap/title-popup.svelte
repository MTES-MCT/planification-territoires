<script lang="ts">
  import type { Lever } from "$lib/types";
  import { prettyNum } from "$lib/utils";

  export let data: {
    lever: Lever;
    showProgression: boolean;
  };
</script>

<div class="rounded border border-gray-300 bg-white px-4 py-2 text-sm">
  <div class="text-base font-semibold">{data.lever.group}</div>
  <div class="mb-1 font-semibold">{data.lever.sector}</div>
  <div class="mb-3">{data.lever.name}</div>

  <div class="value-row">
    <div class="desc">Objectif initial :</div>
    <div class="value">−{prettyNum(data.lever.objCO2)}</div>
  </div>

  {#if data.showProgression && data.lever.progressionCO2}
    <div class="value-row">
      <div class="desc">Réalisé :</div>
      <div class="value">−{prettyNum(data.lever.progressionCO2)}</div>
    </div>

    <div class="value-row">
      <div class="desc">Objectif restant :</div>
      <div class="value">
        −{prettyNum(data.lever.objCO2 - data.lever.progressionCO2)}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .value-row {
    @apply flex flex-row justify-between;
  }

  .value-row .desc {
    @apply shrink;
  }

  .value-row .value {
    @apply shrink-0 font-medium;
  }
</style>
