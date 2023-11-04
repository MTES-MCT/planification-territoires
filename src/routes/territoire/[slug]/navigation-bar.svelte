<script lang="ts">
  import Breadcrumbs from "$lib/breadcrumbs.svelte";
  export let territoryName: string;
  export let title: string;
  export let step: string;
  export let nextLabel = "";
  export let nextUrl = "";
  export let backLabel: string;
  export let backUrl: string;
  export let stickyFooter = false;

  let totalSteps = 5;
</script>

<Breadcrumbs>
  <li>
    <a class="fr-breadcrumb__link" href="/#territoires">Choisir un territoire</a
    >
  </li>
  <li>
    <span class="fr-breadcrumb__link" aria-current="page">{territoryName}</span>
  </li>
</Breadcrumbs>

<h1 class="mb-1 hidden text-lg tracking-tight print:block">
  {territoryName} : {title}
</h1>

<div class="border-t border-gray-200 py-4 print:hidden" id="navigation">
  <div class="fr-stepper" style={nextLabel ? "" : "margin-bottom:64px"}>
    <h2 class="fr-stepper__title">
      <span class="fr-stepper__state">Étape {step} sur {totalSteps}</span>
      {territoryName} : {title}
    </h2>
    <div
      class="fr-stepper__steps"
      data-fr-current-step={step}
      data-fr-steps={totalSteps}
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

    <div
      class:sticky-footer={stickyFooter}
      class="print:!static print:!border-0"
    >
      <slot name="sticky-top" />
      <ul
        class="fr-btns-group fr-btns-group--inline-sm fr-btns-group--icon-left mb-16 flex justify-end print:!hidden"
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
</div>

<style lang="postcss">
  .sticky-footer {
    @apply sticky bottom-0 border-t bg-white pt-4;
  }
</style>
