<script lang="ts">
  import { markdownToHtml } from "$lib/utils";

  export let data: { msg: string };
</script>

<div class="markdown rounded border border-gray-300 bg-white px-4 py-2 text-sm">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html markdownToHtml(data.msg)}
</div>

<style lang="postcss">
  .markdown > :global(p:last-of-type) {
    @apply mb-0;
  }
</style>
