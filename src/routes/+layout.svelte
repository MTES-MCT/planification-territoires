<script lang="ts">
  import "@gouvfr/dsfr/dist/dsfr.module.min.js";

  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  import "../app.postcss";

  import "@gouvfr/dsfr/dist/dsfr.main.css";
  import "@gouvfr/dsfr/dist/utility/utility.main.css";

  import Header from "./_layout/header.svelte";
  import Footer from "./_layout/footer.svelte";

  let previousPathName = "";

  function trackPageView() {
    if (browser && window._paq) {
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
  {#key $page.data}
    {#if $page.data.title !== "Simulateur territoires"}
      <title>{$page.data.title} | Simulateur territoires</title>
    {:else}
      <title>{$page.data.title}</title>
    {/if}
  {/key}
</svelte:head>

<Header />

<main class="fr-container">
  <slot />
</main>

<Footer />
