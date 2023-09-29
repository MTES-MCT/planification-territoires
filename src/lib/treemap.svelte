<script lang="ts">
  // Adapté de https://observablehq.com/@d3/treemap
  // Copyright 2021-2023 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/treemap

  import type { HierarchyNode } from "d3";
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
  export let width: number; // outer width, in pixels
  export let height: number; // outer height, in pixels

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

  const uid = `O-${Math.random().toString(16).slice(2)}`;
</script>

<svg
  viewBox="0 0 {width} {height}"
  {width}
  {height}
  style="max-width: 100%; height: auto;"
  font-family="Marianne"
  font-size="12"
>
  <style>
    .line-0 {
      font-size: 13px;
      font-weight: bold;
      fill-opacity: 0.8;
    }

    .line-1 {
      font-size: 12px;
      fill-opacity: 0.8;
    }

    .line-2 {
      font-size: 10px;
      font-style: italic;
      fill-opacity: 0.7;
    }
  </style>
  <pattern
    id="diagonalHatch"
    patternUnits="userSpaceOnUse"
    width="4"
    height="8"
    patternTransform="rotate(-45 2 2)"
  >
    <path d="M -1,2 l 6,0" stroke="black" stroke-width="6" />
  </pattern>
  {#each root.leaves() as d, i}
    {@const lines = getLabel(d.data).split(/\n/g)}
    <g transform="translate({d.x0},{d.y0})">
      <rect fill={getColor(d.data)} width={d.x1 - d.x0} height={d.y1 - d.y0}>
      </rect>
      <rect
        fill="url(#diagonalHatch)"
        fill-opacity={0.1}
        x={0}
        width={(d.x1 - d.x0) * getProgressionRatio(d.data)}
        height={d.y1 - d.y0}
      />
      <title>{getTitle(d.data)}</title>
      <clipPath id="{uid}-clip-{i}">
        <rect width={d.x1 - d.x0} height={d.y1 - d.y0} />
      </clipPath>
      <text clip-path="url(#{uid}-clip-{i})" pointer-events="none">
        {#each lines as l, j}
          <tspan
            x="6"
            y="{1.2 + (j === lines.length - 1) * 1.2 + j * 1.6}em"
            class="line-{j}"
          >
            {l}
          </tspan>
        {/each}
      </text>
    </g>
  {/each}
</svg>
