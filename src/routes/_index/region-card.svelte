<script lang="ts">
  import type { Region } from "$lib/types";
  import { tooltipAction } from "$lib/tooltip/tooltip-action";
  import RegionPopup from "./region-popup.svelte";
  export let regionSlug: string;
  export let region: Region;
</script>

<div class="fr-col-md-3 fr-col-12 break-inside-avoid">
  {#if region.regionEnabled}
    <div
      class="fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link z-0"
      id="tile-{region.regionName}"
    >
      <div class="fr-tile__body">
        <div class="fr-tile__content">
          <h3 class="fr-tile__title">
            <a href="/territoire/{regionSlug}/objectifs">{region.regionName}</a>
          </h3>
        </div>
      </div>
    </div>
  {:else}
    <div
      class="fr-tile fr-tile--sm fr-tile--horizontal relative z-0"
      id="tile-{region.regionName}"
      use:tooltipAction={{
        data: { msg: region.regionComment },
        innerComponent: RegionPopup,
      }}
    >
      <div class="fr-tile__body pointer-events-none">
        <div class="fr-tile__content">
          <h3 class="fr-tile__title">
            {region.regionName}
          </h3>
        </div>
      </div>
    </div>
  {/if}
</div>
