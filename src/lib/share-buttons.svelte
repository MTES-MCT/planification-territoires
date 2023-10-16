<script lang="ts">
  import { page } from "$app/stores";
</script>

<slot />
<button
  class="fr-btn fr-btn--secondary mt-4 print:!hidden"
  on:click={() => {
    navigator.clipboard.writeText($page.url.href);
  }}
  >Copier le lien de partage
</button>
<button
  class="fr-btn fr-btn--secondary mb-12 mt-2 print:!hidden"
  on:click={() => print()}
  >Imprimer ou enregistrer en PDF
</button>
