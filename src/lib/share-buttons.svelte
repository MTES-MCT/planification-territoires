<script lang="ts">
  import { page } from "$app/stores";
  import { mtmEvent } from "$lib/utils";
</script>

<slot />
<button
  class="fr-btn fr-btn--secondary mt-4 print:!hidden"
  on:click={() => {
    navigator.clipboard.writeText($page.url.href);
    mtmEvent("Actions", "Partage", $page.url.pathname);
  }}
  >Copier le lien de partage
</button>
<button
  class="fr-btn fr-btn--secondary mb-12 mt-2 print:!hidden"
  on:click={() => {
    mtmEvent("Actions", "Impression", $page.url.pathname);
    print();
  }}
  >Imprimer ou enregistrer en PDF
</button>
