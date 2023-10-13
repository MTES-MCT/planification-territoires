<script lang="ts">
  export let width: number | undefined = undefined;
  export let height: number;
  export let progress: number | undefined = undefined;
  export let fill: string;
</script>

<rect {fill} width={width ?? "100%"} {height} />
{#if progress !== undefined}
  <rect
    fill="url(#diagonalHatch)"
    x={0}
    width={width ? width * progress : `${progress * 100}%`}
    {height}
  />
{/if}
