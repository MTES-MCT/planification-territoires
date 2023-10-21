<script lang="ts">
  // Adapté de https://observablehq.com/@d3/treemap
  // Copyright 2021-2023 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/treemap

  import DiagonalHatchPattern from "./diagonalHatchPattern.svelte";
  import ProgressBlock from "./progressBlock.svelte";
  import * as d3 from "d3";
  import Label from "$lib/treemap/label.svelte";
  import { tooltipAction } from "../tooltip/tooltip-action";
  import type { ComponentType } from "svelte";
  import type { HierarchyNode } from "d3";

  type Row = object;
  export let data: Row[];
  export let getPath: (row: Row) => string;
  export let getValue: (row: Row) => number;
  export let getLabel: (row: Row) => string;
  export let getColor: (row: Row) => string;
  export let getProgressionRatio: (row: Row) => number;
  export let tile = d3.treemapSquarify;
  export let titleComponent: ComponentType;
  export let showCompleted: boolean;
  export let showNewTargets: boolean;

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
        <g
          transform="translate({d.x0},{d.y0})"
          use:tooltipAction={{
            data: { lever: d.data, showCompleted, showNewTargets },
            innerComponent: titleComponent,
          }}
        >
          <ProgressBlock
            width={leafWidth}
            height={leafHeight}
            fill={getColor(d.data.sector)}
            progress={getProgressionRatio(d.data)}
          />
          <Label
            height={leafHeight}
            width={leafWidth}
            title={lines[0]}
            value={lines[1]}
          />
        </g>
      {/each}
    </svg>
  {/if}
</div>
