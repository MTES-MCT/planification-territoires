<script lang="ts">
  import { clamp } from "$lib/utils";

  export let width: number | undefined = undefined;
  export let height: number;
  export let progress: number;
  export let fill: string;
</script>

<rect {fill} width={width ?? "100%"} {height} />
<rect
  fill="url(#diagonalHatch)"
  fill-opacity={0.1}
  x={0}
  width={width ? width * clamp(progress, 0, 1) : `${progress * 100}%`}
  {height}
/>
