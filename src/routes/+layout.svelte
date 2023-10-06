<script lang="ts">
  import "@gouvfr/dsfr/dist/dsfr.module.min.js";
  import { page } from "$app/stores";
  import "$lib/assets/dsfr.css";
  import "../app.postcss";

  import Header from "./layout/header.svelte";
  import Footer from "./layout/footer.svelte";

  import { browser } from "$app/environment";
  function trackPageView() {
    if (browser && window._paq) {
      window._paq.push(["setCustomUrl", $page.url.pathname]);
      window._paq.push(["setDocumentTitle", $page.data.title]);
      window._paq.push(["trackPageView"]);
    }
  }
  $: $page.url.pathname, trackPageView();
</script>

<Header />

<hr />

<main class="fr-container">
  <slot />
</main>

<Footer />
