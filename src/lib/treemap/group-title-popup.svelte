<script lang="ts">
  import PrettyNumber from "$lib/pretty-number.svelte";
  import { tidy, groupBy, sum, summarize, filter } from "@tidyjs/tidy";

  import type { Lever } from "$lib/types";

  export let data: {
    path: string;
    leversData: Lever[];
    showCompleted: boolean;
    showNewTargets: boolean;
  };

  $: group = data.path.split("/")[1];
  $: groupData = tidy(
    data.leversData,
    groupBy("group", [
      summarize({
        totalObjCO2: sum("objCO2"),
        totalCompleted: sum("progressionCO2"),
      }),
    ]),
    filter((row) => row.group === group)
  )[0];
</script>

<div class="rounded border border-gray-300 bg-white px-4 py-2 text-sm">
  <div class="text-base font-semibold">{groupData.group}</div>
  <div class="value-row">
    <div class="desc">
      {#if data.showNewTargets}Objectif final{:else}Objectif initial{/if} :
    </div>
    <div class="value">
      <PrettyNumber number={groupData.totalObjCO2} negate forceSign />
    </div>
  </div>

  {#if data.showCompleted && groupData.totalCompleted}
    <div class="value-row">
      <div class="desc">Action :</div>
      <div class="value">
        <PrettyNumber number={groupData.totalCompleted} negate forceSign />
      </div>
    </div>

    <div class="value-row">
      <div class="desc">Objectif restant :</div>
      <div class="value">
        <PrettyNumber
          number={groupData.totalObjCO2 - groupData.totalCompleted}
          negate
          forceSign
        />
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
