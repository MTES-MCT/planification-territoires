<script lang="ts">
  // Adapté de https://observablehq.com/@d3/treemap
  // Copyright 2021-2023 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/treemap

  import * as d3 from "d3";

  export let data: [];
  export let path; // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
  export let value; // given a node d, returns a quantitative value (for area encoding; null for count)
  export let sort = (a, b) => d3.descending(a.value, b.value); // how to sort nodes prior to layout
  export let label; // given a leaf node d, returns the name to display on the rectangle
  export let group; // given a leaf node d, returns a categorical value (for color encoding)
  export let title; // given a leaf node d, returns its hover text
  export let tile = d3.treemapBinary; // treemap strategy
  export let width = 640; // outer width, in pixels
  export let height = 400; // outer height, in pixels
  export let margin = 0; // shorthand for margins
  export let marginTop = margin; // top margin, in pixels
  export let marginRight = margin; // right margin, in pixels
  export let marginBottom = margin; // bottom margin, in pixels
  export let marginLeft = margin; // left margin, in pixels
  export let padding = 1; // shorthand for inner and outer padding
  export let paddingInner = padding; // to separate a node from its adjacent siblings
  export let paddingOuter = padding; // shorthand for top, right, bottom, and left padding
  export let paddingTop = paddingOuter; // to separate a node’s top edge from its children
  export let paddingRight = paddingOuter; // to separate a node’s right edge from its children
  export let paddingBottom = paddingOuter; // to separate a node’s bottom edge from its children
  export let paddingLeft = paddingOuter; // to separate a node’s left edge from its children
  export let round = true; // whether to round to exact pixels
  export let colors = d3.schemeTableau10; // array of colors
  export let zDomain; // array of values for the color scale
  export let fill = "#ccc"; // fill for node rects (if no group color encoding)
  export let fillOpacity = group == null ? null : 0.6; // fill opacity for node rects
  export let stroke; // stroke for node rects
  export let strokeWidth; // stroke width for node rects
  export let strokeOpacity; // stroke opacity for node rects
  export let strokeLinejoin; // stroke line join for node rects

  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.

  // We take special care of any node that has both a value and children, see
  // https://observablehq.com/@d3/treemap-parent-with-value.

  const stratify = (flatData) =>
    d3
      .stratify()
      .path(path)(flatData)
      .each((node) => {
        if (node.children?.length && node.data != null) {
          const child = new d3.Node(node.data);
          node.data = null;
          child.depth = node.depth + 1;
          child.height = 0;
          child.parent = node;
          child.id = node.id + "/";
          node.children.unshift(child);
        }
      });

  function updateTreemap(flatData, tile, width, height) {
    const root = stratify(flatData);

    // Compute the values of internal nodes by aggregating from the leaves.
    value == null
      ? root.count()
      : root.sum((d) => Math.max(0, d ? value(d) : null));

    // Prior to sorting, if a group channel is specified, construct an ordinal color scale.
    const leaves = root.leaves();
    const G = group == null ? null : leaves.map((d) => group(d.data, d));
    if (zDomain === undefined) zDomain = G;
    zDomain = new d3.InternSet(zDomain);
    const color = group == null ? null : d3.scaleOrdinal(zDomain, colors);

    // Compute labels and titles.
    const L = label == null ? null : leaves.map((d) => label(d.data, d));
    const T =
      title === undefined
        ? L
        : title == null
        ? null
        : leaves.map((d) => title(d.data, d));

    // Sort the leaves (typically by descending value for a pleasing layout).
    if (sort != null) root.sort(sort);

    // Compute the treemap layout.
    d3
      .treemap()
      .tile(tile)
      .size([
        width - marginLeft - marginRight,
        height - marginTop - marginBottom,
      ])
      .paddingInner(paddingInner)
      .paddingTop(paddingTop)
      .paddingRight(paddingRight)
      .paddingBottom(paddingBottom)
      .paddingLeft(paddingLeft)
      .round(round)(root);

    const uid = `O-${Math.random().toString(16).slice(2)}`;
    return { leaves, L, color, G, T, uid };
  }

  $: ({ leaves, L, color, G, T, uid } = updateTreemap(
    data,
    tile,
    width,
    height
  ));
</script>

{#if leaves}
  <svg
    viewBox="{-marginLeft} {-marginTop} {width} {height}"
    {width}
    {height}
    style="max-width: 100%; height: auto;"
    font-family="Marianne"
    font-size="10"
  >
    {#each leaves as d, i}
      {@const lines = L[i].split(/\n/g)}
      <g transform="translate({d.x0},{d.y0})">
        <rect
          fill={color ? color(G[i]) : fill}
          fill-opacity={fillOpacity}
          {stroke}
          stroke-width={strokeWidth}
          stroke-opacity={strokeOpacity}
          stroke-linejoin={strokeLinejoin}
          width={d.x1 - d.x0}
          height={d.y1 - d.y0}
        />
        <title>{T[i]}</title>
        <clipPath id="{uid}-clip-{i}">
          <rect width={d.x1 - d.x0} height={d.y1 - d.y0} />
        </clipPath>
        <text clip-path="url(#{uid}-clip-{i})">
          {#each lines as l, j}
            <tspan
              x="3"
              y="{(j === lines.length - 1) * 0.3 + 1.1 + j * 0.9}em"
              fill-opacity={j === lines.length - 1 ? 0.7 : null}
            >
              {l}
            </tspan>
          {/each}
        </text>
      </g>
    {/each}
  </svg>
{/if}
