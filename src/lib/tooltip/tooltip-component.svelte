<script lang="ts">
  import type { ComponentType } from "svelte";
  import clickOutside from "./click-anywhere-action";

  export let onClickAnywhere: () => void;
  export let innerComponent: ComponentType;
  export let data: object;

  export let x: number;
  export let y: number;

  let width: number;
  let height: number;
  let scrollY: number;

  $: leftStyle = `left: ${x + 5}px`;
  $: rightStyle = `right: ${width - x + 5}px`;
  $: topStyle = `top: ${y + 5}px`;
  $: bottomStyle = `bottom: ${height - y + 5}px`;
  $: xStyle = x > width / 2 ? rightStyle : leftStyle;
  $: yStyle = y - scrollY > height / 2 ? bottomStyle : topStyle;
  $: alignementStyle = `${yStyle}; ${xStyle}`;
  $: validValues =
    isFinite(x) &&
    isFinite(y) &&
    isFinite(width) &&
    isFinite(height) &&
    isFinite(scrollY);
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} bind:scrollY />
{#if validValues}
  <div
    class="absolute"
    style={alignementStyle}
    class:right={x > width / 2}
    class:left={x <= width / 2}
    use:clickOutside
    on:clickoutside={onClickAnywhere}
    on:clickinside={onClickAnywhere}
  >
    <svelte:component this={innerComponent} {data} />
  </div>
{/if}
