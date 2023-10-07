<script lang="ts">
  // Adapté de https://observablehq.com/@d3/treemap
  // Copyright 2021-2023 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/treemap

  import type { HierarchyNode } from "d3";
  import DiagonalHatchPattern from "./diagonalHatchPattern.svelte";
  import ProgressBlock from "./progressBlock.svelte";
  import * as d3 from "d3";

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
        {@const width = d.x1 - d.x0}
        {@const height = d.y1 - d.y0}
        <g transform="translate({d.x0},{d.y0})">
          <ProgressBlock
            {width}
            {height}
            fill={getColor(d.data.sector)}
            progress={getProgressionRatio(d.data)}
          />
          <title>{getTitle(d.data)}</title>
          <foreignObject {width} {height}>
            <div class="h-full pl-2 pr-1 pt-2 font-medium tracking-tighter">
              {#if height > 60 && width > 80}
                <div class="mb-[1px] hyphens-auto text-base leading-[1.1]">
                  {lines[0]}
                </div>
                <div class="truncate text-sm font-normal">{lines[1]}</div>
              {:else if height > 40 && width > 40}
                <div class="truncate text-sm leading-none">
                  {lines[0]}
                </div>
                <div class="truncate text-xs font-normal">{lines[1]}</div>
              {:else if height > 16 && width > 50}
                <div class="-mt-[3px] truncate text-xs leading-tight">
                  {lines[0]}
                </div>
              {/if}
            </div>
          </foreignObject>
        </g>
      {/each}
    </svg>
  {/if}
</div>
