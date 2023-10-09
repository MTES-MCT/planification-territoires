<script lang="ts">
  import "@gouvfr/dsfr/dist/dsfr.module.min.js";

  import {
    PUBLIC_ENVIRONMENT,
    PUBLIC_ALLOW_INDEXING,
  } from "$env/static/public";
  import { page } from "$app/stores";

  import "../app.postcss";

  import "@gouvfr/dsfr/dist/dsfr.main.css";
  import "@gouvfr/dsfr/dist/utility/utility.main.css";

  import SkipLink from "./_layout/skip-link.svelte";
  import Header from "./_layout/header.svelte";
  import Footer from "./_layout/footer.svelte";

  let previousPathName = "";

  function trackPageView() {
    if (window._paq) {
      window._paq.push(["setCustomUrl", $page.url.pathname]);
      window._paq.push(["setDocumentTitle", $page.data.title]);
      window._paq.push(["trackPageView"]);
    }
  }
  $: {
    if (previousPathName !== $page.url.pathname) {
      trackPageView();
      previousPathName = $page.url.pathname;
    }
  }
</script>

<svelte:head>
  {#if PUBLIC_ENVIRONMENT !== "production" || PUBLIC_ALLOW_INDEXING !== "true"}
    <meta name="robots" content="noindex,nofollow" />
  {/if}

  {#key $page.data}
    {#if $page.data.title !== "Simulateur territoires"}
      <title>{$page.data.title} | Simulateur territoires</title>
    {:else}
      <title>{$page.data.title}</title>
    {/if}
  {/key}
</svelte:head>

<SkipLink />
<Header />

<main
  class="fr-container"
  id={$page.data.hasNavigation ? undefined : "contenu"}
>
  <slot />
</main>

<Footer />
