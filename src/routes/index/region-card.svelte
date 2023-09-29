<script lang="ts">
  import vizImg from "@gouvfr/dsfr/dist/artwork/pictograms/digital/data-visualization.svg";

  export let region: string;
</script>

<div class="fr-col-md-3 fr-col-12">
  <div
    class="fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link"
    id="tile-6661"
  >
    <div class="fr-tile__body">
      <div class="fr-tile__content">
        <h3 class="fr-tile__title">
          <a href="/regions/{region}/">{region}</a>
        </h3>
      </div>
    </div>
    <div class="fr-tile__header">
      <div class="fr-tile__pictogram">
        <img src={vizImg} alt="" />
      </div>
    </div>
  </div>
</div>
