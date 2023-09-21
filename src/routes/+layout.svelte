<script lang="ts">
  import "../app.postcss";
  import Header from "./layout/header.svelte";
  import Footer from "./layout/footer.svelte";
</script>

<Header />

<hr />

<main class="mx-8 my-4">
  <slot />
</main>

<Footer />
