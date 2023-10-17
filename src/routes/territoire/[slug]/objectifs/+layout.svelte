<script lang="ts">
  import { onMount } from "svelte";

  import { completionLevels, newTargets } from "$lib/stores";

  import type { Action } from "$lib/types";

  export let data;

  onMount(() => {
    const regionSlug = data.regionSlug;
    // Mise à jour des nouveaux objectifs à partir des objectifs initiaux
    data.regionData.forEach((action: Action) => {
      if ($newTargets[regionSlug][action.id] == null) {
        newTargets.update((targets) => ({
          ...targets,
          [regionSlug]: {
            ...targets[regionSlug],
            // Si le realisé est déjà supérieur à l’objectif initial, on ne veut
            // pas proposer un chiffre négatif comme objectif futur !
            [action.id]: Math.max(
              0,
              action.objPhys - $completionLevels[regionSlug][action.id]
            ),
          },
        }));
      }
    });
  });
</script>

<slot />
