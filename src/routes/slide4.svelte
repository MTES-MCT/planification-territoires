<script lang="ts">
  import * as d3 from "d3";
  import Treemap from "$lib/treemap.svelte";
  import data from "$lib/data.json";
  import { tidy, select, distinct, filter } from "@tidyjs/tidy";

  const regionNames = tidy(data, select("Région"), distinct("Région"))
    .map((region) => region.Région)
    .filter((val) => val != null);

  const tileAlgorithms = [
    ["binary", d3.treemapBinary],
    ["squarify", d3.treemapSquarify],
    ["slice-dice", d3.treemapSliceDice],
    ["slice", d3.treemapSlice],
    ["dice", d3.treemapDice],
  ];
  let width;
  let height;

  let selectedRegion;
  let selectedTileAlgorithm = d3.treemapSquarify;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="my-4 flex gap-4">
  <select bind:value={selectedRegion}>
    {#each regionNames as name}
      <option value={name}>
        {name}
      </option>
    {/each}
  </select>

  <select bind:value={selectedTileAlgorithm}>
    {#each tileAlgorithms as algorithm}
      <option value={algorithm[1]}>
        {algorithm[0]}
      </option>
    {/each}
  </select>
</div>

{#if width && height}
  <Treemap
    data={tidy(
      data,
      filter((d) => d.Région === selectedRegion)
    )}
    path={(d) => d.path}
    label={(d) => d.label}
    group={(d) => d.secteur}
    value={(d) => d.value}
    title={(d, _n) => d.title}
    width={width - 20}
    height={height - 200}
    tile={selectedTileAlgorithm}
  />
{/if}

<style lang="postcss">
  select {
    @apply rounded border border-gray-300 bg-transparent px-1 py-0.5 leading-9 outline-title-blue-france;
  }
</style>
