<script lang="ts">
</script>

<nav
  class="fr-breadcrumb !mb-4 !mt-6 print:hidden"
  aria-label="vous êtes ici :"
>
  <button
    class="fr-breadcrumb__button"
    aria-expanded="false"
    aria-controls="breadcrumb-1"
    >Voir le fil d’Ariane
  </button>
  <div class="fr-collapse" id="breadcrumb-1">
    <ol class="fr-breadcrumb__list">
      <li>
        <a class="fr-breadcrumb__link" href="/">Accueil</a>
      </li>
      <slot />
    </ol>
  </div>
</nav>
