<script>
  export let territoryName;
  export let title;
  export let step;
  export let nextLabel = "";
  export let nextUrl = "";
  export let backLabel;
  export let backUrl;
  export let stickyFooter = false;
</script>

<nav
  class="fr-breadcrumb !mb-3 !mt-6 print:hidden"
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
      <li>
        <a class="fr-breadcrumb__link" href="/#territoires"
          >Choisir un territoire</a
        >
      </li>
      <li>
        <span class="fr-breadcrumb__link" aria-current="page"
          >{territoryName}</span
        >
      </li>
    </ol>
  </div>
</nav>

<h1 class="mb-1 hidden text-lg tracking-tight print:block">
  {territoryName} : {title}
</h1>

<div class="border-t border-gray-200 py-4 print:hidden" id="navigation">
  <div class="fr-stepper" style={nextLabel ? "" : "margin-bottom:64px"}>
    <h2 class="fr-stepper__title">
      <span class="fr-stepper__state">Étape {step} sur 3</span>
      {territoryName} : {title}
    </h2>
    <div
      class="fr-stepper__steps"
      data-fr-current-step={step}
      data-fr-steps="5"
    ></div>
    <p class="fr-stepper__details">
      <span class="fr-text--bold">Étape suivante : </span>{nextLabel}
    </p>
  </div>

  <ul
    class="fr-btns-group fr-btns-group--sm fr-btns-group--inline-sm fr-btns-group--icon-left flex justify-end"
  >
    <li>
      <a
        class="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-arrow-left-line fr-btn--icon-left"
        href={backUrl}>{backLabel}</a
      >
    </li>
    {#if nextLabel}
      <li>
        <a
          class="fr-btn fr-btn--tertiary fr-icon-arrow-right-line fr-btn--icon-right"
          href={nextUrl}>{nextLabel}</a
        >
      </li>
    {/if}
  </ul>
</div>
<div id="contenu">
  <slot name="no-sticky" />

  <div>
    <slot />
    <ul
      class="fr-btns-group fr-btns-group--inline-sm fr-btns-group--icon-left mb-16 flex justify-end print:!hidden"
      class:sticky-footer={stickyFooter}
    >
      <li>
        <a
          class="fr-btn fr-btn--tertiary fr-icon-arrow-left-line fr-btn--icon-left"
          href={backUrl}>{backLabel}</a
        >
      </li>
      {#if nextLabel}
        <li>
          <a
            class="fr-btn fr-btn--primary fr-icon-arrow-right-line fr-btn--icon-right"
            href={nextUrl}>{nextLabel}</a
          >
        </li>
      {/if}
    </ul>
  </div>
</div>

<style lang="postcss">
  .sticky-footer {
    @apply sticky bottom-0 border-t bg-white pt-4;
  }
</style>
