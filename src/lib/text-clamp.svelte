<script lang="ts">
  export let htmlText = "";

  const id = `text-clamp-${crypto.randomUUID()}`;

  let showAll = false;

  function handleToggle() {
    showAll = !showAll;
  }

  let textIsTooLong, height;

  $: textIsTooLong = height > 192;
  $: label = showAll ? "Réduire" : "Lire la suite";
</script>

<div class="hidden print:inline">
  <div class="markdown mb-4">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html htmlText}
  </div>
</div>
<div class="print:hidden">
  <div {id} class:h-48={!showAll} class="relative overflow-hidden">
    <div class="markdown" bind:clientHeight={height}>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html htmlText}
    </div>
    <div class:gradient={!showAll && textIsTooLong} />
  </div>

  {#if textIsTooLong}
    <button
      aria-expanded={showAll}
      aria-controls={id}
      on:click|preventDefault={handleToggle}
      class="text-xs text-gray-700 underline">{label}</button
    >
  {/if}
</div>

<style lang="postcss">
  .gradient {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 40px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  .markdown :global(h4) {
    @apply text-base font-semibold leading-tight text-gray-700;
  }

  .markdown :global(p) {
    @apply text-xs leading-tight text-gray-500 md:text-sm;
  }

  .markdown > :global(p:last-of-type) {
    @apply mb-0;
  }

  .markdown :global(li) {
    @apply text-xs leading-tight text-gray-500 md:text-sm;
  }
</style>
