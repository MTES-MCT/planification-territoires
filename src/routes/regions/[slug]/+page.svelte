<script lang="ts">
  import MainTreemap from "$lib/main-treemap.svelte";
  import NavigationBar from "./navigation-bar.svelte";

  export let data;

  const editionLink = `/regions/${data.region}/objectifs`;
</script>

<NavigationBar
  region={data.region}
  title="Présentation de vos objectifs territoriaux pour 2030"
  nextLabel="Réaliser le diagnostic territorial"
  nextUrl={editionLink}
  backUrl="/#territoires"
  backLabel="Choisir un autre territoire"
  step="1"
>
  <p class="max-w-2xl text-lg">
    Voici le flux annuel de baisse des émissions de GES par rapport à 2019 que
    vous devez atteindre en 2030. A partir de ce tableau et grâce à l’outil
    suivant, réalisez votre diagnostic territorial.
  </p>

  <div class="my-8 block h-[75vh]">
    <MainTreemap data={data.regionData} />
  </div>
</NavigationBar>
