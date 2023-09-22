<script lang="ts">
  import "../app.postcss";
  import "$lib/dsfr.css";
  import Header from "./layout/header.svelte";
  import Footer from "./layout/footer.svelte";
</script>

<Header />

<hr />

<main class="fr-container">
  <slot />
</main>

<Footer />
