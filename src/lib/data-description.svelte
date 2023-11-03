<script lang="ts">
  import PrettyNumber from "$lib/pretty-number.svelte";

  export let value: number;
  export let unit: string;
</script>

<div
  class="flex flex-1 flex-col items-end justify-end border-r pb-4 text-right"
>
  <div class="pr-5">
    <div
      class="-mt-1 text-base font-semibold leading-tight text-gray-900 md:text-lg"
    >
      <PrettyNumber number={value} withUnitCO2={false} />
    </div>
    <div class="text-xs leading-tight text-gray-800 md:text-sm">
      {#each unit.split("(") as line, i}
        {#if i === 0}{line}<br />{:else}
          <span class="italic text-gray-500">{line.replace(")", "")}</span>
        {/if}
      {/each}
    </div>
  </div>
</div>
