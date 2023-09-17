<script lang="ts">
  import * as d3 from "d3";
  import { tidy, select, distinct, filter } from "@tidyjs/tidy";

  import Treemap from "$lib/treemap.svelte";
  import { prettifyNumber } from "$lib/utils";
  import data from "$lib/data.json";

  const tileAlgorithms = [
    ["binary", d3.treemapBinary],
    ["squarify", d3.treemapSquarify],
    ["slice-dice", d3.treemapSliceDice],
    ["slice", d3.treemapSlice],
    ["dice", d3.treemapDice],
  ];

  const regionNames = tidy(data, select("region"), distinct("region")).map(
    (region) => region.region
  );

  let width: number;
  let height: number;

  let selectedRegion = regionNames[0];
  let currentLever;

  $: regionData = tidy(
    editedData,
    filter((d) => d.region === selectedRegion)
  );
  let values;
  $: {
    selectedRegion;
    values = Object.fromEntries(data.map((l) => [l.id, 0]));
  }

  let selectedTileAlgorithm = d3.treemapSquarify;

  let editedData;
  $: {
    selectedRegion;
    editedData = data.map((d) => {
      return {
        ...d,
        realisationpc: 0,
      };
    });
  }

  function handleLeverClicked(lever) {
    currentLever = lever;
  }

  function handleRangeChanged(evt) {
    const id = evt.target.id;
    const newValue = evt.target.value;
    editedData.find(
      (d) => d.id === id && d.region === selectedRegion
    ).realisationpc = currentLever.obj_phys
      ? newValue / currentLever.obj_phys
      : 0;
    editedData = editedData;
  }
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

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

  <label>
    Algorithme d’affichage :
    <select bind:value={selectedTileAlgorithm}>
      {#each tileAlgorithms as algorithm}
        <option value={algorithm[1]}>
          {algorithm[0]}
        </option>
      {/each}
    </select>
  </label>
</div>

<div class="my-4 rounded border bg-gray-50 p-4">
  {#if currentLever}
    <div class="flex flex-row flex-wrap items-start gap-x-12 gap-y-4">
      <label for={currentLever.id} class=" ">
        <p><strong>{currentLever.id}</strong></p>
        <p>
          Objectif (unités physiques) : {prettifyNumber(currentLever.obj_phys)}
        </p>
        <p>
          Objectif (ktCO₂) : {prettifyNumber(currentLever.obj_co2)}
        </p>
      </label>
      <div class="flex flex-wrap gap-4">
        <input
          type="range"
          min={0}
          max={currentLever.obj_phys}
          step={1}
          bind:value={values[currentLever.id]}
          id={currentLever.id}
          on:input={handleRangeChanged}
          class=" w-40"
        />
        <input
          type="number"
          min={0}
          max={currentLever.obj_phys}
          step={1}
          bind:value={values[currentLever.id]}
          class=" w-40 border border bg-gray-100 p-2"
          id={currentLever.id}
          on:input={handleRangeChanged}
        />
      </div>
    </div>
  {:else}
    <p class="text-center font-bold">
      Cliquez sur un levier pour renseigner vos actions
    </p>
  {/if}
</div>

{#if width && height}
  <Treemap
    data={regionData}
    path={(d) => `${d.secteur}/${d.id.replaceAll("/", "-")}`}
    label={(d) =>
      `${d.levier}\n\n${d.id}\n\n${prettifyNumber(
        d.obj_phys
      )}\n\n${prettifyNumber(d.obj_co2)} kt CO₂`}
    group={(d) => d.secteur}
    value={(d) => d.obj_co2}
    title={(d) => `${d.secteur}\n\n${d.id}`}
    width={width - 20}
    height={height - 350}
    tile={selectedTileAlgorithm}
    onClick={handleLeverClicked}
  />
{/if}

<style lang="postcss">
  select {
    @apply rounded border border-gray-300 bg-transparent px-1 py-0.5 leading-9 outline-title-blue-france;
  }
</style>
