<script lang="ts">
  import { markdownToHtml } from "$lib/utils";

  import etapesCopImg from "$lib/assets/imgs/etapes-cop.png";
  import couvSynthImg from "$lib/assets/imgs/couverture-synthese.png";
  import content from "./content.md?raw";
</script>

<nav class="fr-breadcrumb !mb-3 !mt-0" aria-label="vous êtes ici :">
  <button
    class="fr-breadcrumb__button"
    aria-expanded="false"
    aria-controls="breadcrumb-1"
    >Voir le fil d’Ariane
  </button>
  <div class="fr-collapse" id="breadcrumb-1">
    <ol class="fr-breadcrumb__list">
      <li>
        <a class="fr-breadcrumb__link" href="/">Accueil</a>
      </li>
      <li>
        <span class="fr-breadcrumb__link" aria-current="page">À propos</span>
      </li>
    </ol>
  </div>
</nav>

<h1 class="mb-8 mt-4">À propos</h1>

<div class="markdown max-w-3xl">
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
