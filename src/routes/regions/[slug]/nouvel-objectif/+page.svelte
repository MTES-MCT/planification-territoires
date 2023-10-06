<script lang="ts">
  import { page } from "$app/stores";

  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "../navigation-bar.svelte";

  export let data;

  let resultatsUrl = `/regions/${data.region}/resultats`;
</script>

<NavigationBar
  region={data.region}
  title="Votre nouvel objectif 2030 sur la base du diagnostic mené"
  backLabel="Visualiser le panorama des leviers actualisé"
  backUrl={resultatsUrl}
  step="4"
>
  <p class="mb-2">
    Voici le nouveau flux annuel de baisse des émissions de GES par rapport à
    2019 que vous devez atteindre en 2030.
  </p>

  <div class="mb-4 h-[75vh]">
    <MainTreemap data={data.regionData} substractCompleted />
  </div>

  <button
    class="fr-btn print:!hidden"
    on:click={() => {
      navigator.clipboard.writeText($page.url.href);
    }}
    >Copier le lien de partage
  </button>
</NavigationBar>
