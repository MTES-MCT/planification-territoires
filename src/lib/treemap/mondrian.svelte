<script lang="ts">
  // Adapté de https://observablehq.com/@d3/treemap
  // Copyright 2021-2023 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/treemap

  import type { HierarchyNode } from "d3";
  import DiagonalHatchPattern from "./diagonalHatchPattern.svelte";
  import ProgressBlock from "./progressBlock.svelte";
  import * as d3 from "d3";
  import Label from "$lib/treemap/label.svelte";

  type Row = object;
  export let data: Row[];
  export let getPath: (row: Row) => string;
  export let getValue: (row: Row) => number; // given a node d, returns a quantitative value (for area encoding; null for count)
  export let getLabel: (row: Row) => string; // given a leaf node d, returns the name to display on the rectangle
  export let getTitle: (row: Row) => string; // given a leaf node d, returns its hover text
  export let getColor: (row: Row) => string;
  export let getProgressionRatio: (row: Row) => number;
  export let tile = d3.treemapSquarify; // treemap strategy

  export let width: number;
  export let height: number;

  $: hierarchy = d3.stratify().path((row) => getPath(row as Row))(data);

  $: root = d3
    .treemap()
    .tile(tile)
    .size([width, height])
    .padding(1)
    .round(true)(
    hierarchy
      .sum((row) => Math.max(0, row ? getValue(row) : 0))
      .sort((a: HierarchyNode<unknown>, b: HierarchyNode<unknown>) =>
        d3.descending(a.value, b.value)
      )
  );
</script>

<div class="h-full">
  {#if width && height}
    <svg viewBox="0 0 {width} {height}">
      <DiagonalHatchPattern />
      {#each root.leaves() as d}
        {@const lines = getLabel(d.data).split(/\n/g)}
        {@const leafWidth = d.x1 - d.x0}
        {@const leafHeight = d.y1 - d.y0}
        <g transform="translate({d.x0},{d.y0})">
          <ProgressBlock
            width={leafWidth}
            height={leafHeight}
            fill={getColor(d.data.sector)}
            progress={getProgressionRatio(d.data)}
          />
          <title>{getTitle(d.data)}</title>
          <Label height={leafHeight} width={leafWidth} {lines} />
        </g>
      {/each}
    </svg>
  {/if}
</div>
