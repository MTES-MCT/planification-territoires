<script lang="ts">
  import "@gouvfr/dsfr/dist/dsfr.module.min.js";
  import "../app.postcss";
  import "$lib/assets/dsfr.css";

  import Header from "./layout/header.svelte";
  import Footer from "./layout/footer.svelte";
</script>

<Header />

<hr />

<main class="fr-container">
  <slot />
</main>

<Footer />
