<script lang="ts">
  import { PUBLIC_INTERNAL_COP } from "$env/static/public";
</script>

<header class="fr-header print:!hidden">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">
                République
                <br />Française
              </p>
            </div>
            <div class="fr-header__navbar">
              <button
                class="fr-btn--menu fr-btn"
                data-fr-opened="false"
                aria-controls="fermer-modal"
                aria-haspopup="menu"
                id="button-menu"
                title="Menu"
              >
                Menu
              </button>
            </div>
          </div>
          <div class="fr-header__service">
            <a href="/" title="Accueil - Simulateur territorial">
              <p class="fr-header__service-title">
                Simulateur territorial <span
                  class="fr-badge fr-badge--error fr-badge--sm fr-badge--no-icon"
                  >Version Beta{#if PUBLIC_INTERNAL_COP === "true"}
                    - Ne pas diffuser{/if}</span
                >
              </p>
            </a>

            <p class="fr-header__service-tagline">
              Un outil de simulation des objectifs territoriaux
            </p>
          </div>
        </div>
        <div class="fr-header__tools">
          <div class="fr-header__tools-links">
            <ul class="fr-btns-group">
              <li>
                <a class="fr-btn" href="/a-propos">À propos </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fr-header__menu fr-modal"
    id="fermer-modal"
    aria-labelledby="button-menu"
  >
    <div class="fr-container">
      <button
        class="fr-btn--close fr-btn"
        aria-controls="fermer-modal"
        title="Fermer"
      >
        Fermer
      </button>
      <div class="fr-header__menu-links"></div>
    </div>
  </div>
</header>
