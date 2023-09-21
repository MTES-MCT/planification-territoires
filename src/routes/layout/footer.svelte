<script lang="ts">
  import LogoRepublique from "$lib/assets/logos/logo-rf.svg";
</script>

<hr class="my-8 border-t-2 border-title-blue-france" />

<footer class="mx-8 mb-8">
  <div class="flex flex-row gap-8">
    <div class="mb-8 w-1/2">
      <img
        class="inline"
        src={LogoRepublique}
        alt="République Française - Liberté, Égalité, Fraternité"
        width="124"
        height="110"
      />
    </div>
    <div class="w-1/2 leading-normal">
      <div class="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold">
        <a
          target="_blank"
          title="Ouverture dans une nouvelle fenêtre"
          rel="noopener"
          href="https://gouvernement.fr">gouvernement.fr</a
        >
        <a
          target="_blank"
          title="Ouverture dans une nouvelle fenêtre"
          rel="noopener"
          href="https://service-public.fr">service-public.fr</a
        >
        <a
          target="_blank"
          title="Ouverture dans une nouvelle fenêtre"
          rel="noopener"
          href="https://data.gouv.fr">data.gouv.fr</a
        >
      </div>
    </div>
  </div>

  <hr class="mb-4" />

  <nav class="flex flex-wrap gap-4 text-xs text-gray-500">
    <a class="block hover:underline" href="/mentions-legales"
      >Mentions légales</a
    >
    |
    <a class="block hover:underline" href="/politique-de-confidentialite"
      >Données personnelles</a
    >
    |
    <a class="block hover:underline" href="/accessibilite"
      >Accessibilité : non conforme</a
    >
  </nav>
</footer>

<style lang="postcss">
  a {
    @apply block hover:underline;
  }
</style>
