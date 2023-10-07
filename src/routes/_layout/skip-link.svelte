<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="fr-skiplinks">
  <nav class="fr-container" role="navigation" aria-label="Accès rapide">
    <ul class="fr-skiplinks__list">
      <li>
        <a class="fr-link" href="#contenu">Contenu</a>
      </li>
      {#if $page.data.hasNavigation}
        <li>
          <a class="fr-link" href="#navigation">Navigation</a>
        </li>
      {/if}
      <li>
        <a class="fr-link" href="/a-propos">À propos</a>
      </li>
      <li>
        <a class="fr-link" href="#footer">Pied de page</a>
      </li>
      <li>
        <a class="fr-link" href="/accessibilite">Déclaration d’accessibilité</a>
      </li>
    </ul>
  </nav>
</div>
