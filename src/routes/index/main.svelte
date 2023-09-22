<script lang="ts">
  import { goto } from "$app/navigation";
  import { tidy, select, distinct } from "@tidyjs/tidy";
  import type { Lever } from "$lib/types";

  import rawData from "$lib/data.json";
  const data = rawData as Lever[];

  const regionNames = tidy(data, select("region"), distinct("region")).map(
    (row) => row.region
  );

  let selectedRegion = regionNames[0];
</script>

<div class="mb-8 mt-4 flex flex-wrap gap-x-8 gap-y-2">
  <label>
    Région :
    <select bind:value={selectedRegion}>
      {#each regionNames as name}
        <option value={name}>
          {name}
        </option>
      {/each}
    </select>
  </label>
</div>

<button on:click={() => goto(`/regions/${selectedRegion}`)}
  >Voir la région</button
>

<style lang="postcss">
  select {
    @apply rounded border border-gray-300 bg-transparent px-1 py-0.5 leading-9 outline-title-blue-france;
  }
</style>
