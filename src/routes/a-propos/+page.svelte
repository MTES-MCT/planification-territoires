<script lang="ts">
  import { markdownToHtml } from "$lib/utils";
  import Breadcrumbs from "$lib/breadcrumbs.svelte";
  import etapesCopImg from "$lib/assets/imgs/etapes-cop.png";
  import couvSynthImg from "$lib/assets/imgs/couverture-synthese.png";
  import content from "./content.md?raw";
</script>

<Breadcrumbs>
  <li>
    <span class="fr-breadcrumb__link" aria-current="page">À propos</span>
  </li>
</Breadcrumbs>

<div id="contenu" class="markdown mt-4 max-w-3xl">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html markdownToHtml(
    content
      .replace(
        "https://storage.gra.cloud.ovh.net/v1/AUTH_0f20d409cb2a4c9786c769e2edec0e06/padnumerique/uploads/91db9cb2-a5f1-4a2c-9f7d-d1b8e8becd59.PNG",
        etapesCopImg
      )
      .replace(
        "https://storage.gra.cloud.ovh.net/v1/AUTH_0f20d409cb2a4c9786c769e2edec0e06/padnumerique/uploads/76912b67-0879-47cd-9d79-08a56e2b87c3.png",
        couvSynthImg
      )
  )}
</div>

<style lang="postcss">
  .markdown :global(p) {
    @apply max-w-3xl;
  }

  .markdown :global(table) {
    @apply mb-4 max-w-3xl;
  }

  .markdown :global(table th) {
    @apply font-bold;
  }

  .markdown :global(table th),
  .markdown :global(table td) {
    @apply border px-3 py-2 text-left;
  }

  .markdown :global(table tr:nth-child(2n)) {
    background-color: #f8f8f8;
  }
</style>
