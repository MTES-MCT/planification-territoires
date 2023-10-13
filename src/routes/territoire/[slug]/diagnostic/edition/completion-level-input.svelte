<script lang="ts">
  import ObjectiveForm from "$lib/objective-form.svelte";
  import { clamp } from "$lib/utils";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let valuePhys: number;
  export let onUpdate: (newValuePhys: number, action: Action) => void;
</script>

<ObjectiveForm
  {action}
  progress={action.objPhys ? clamp(valuePhys / action.objPhys, 0, 1) : 0}
  inputLabel="Action déjà menée ou contractualisée"
  {valuePhys}
  {onUpdate}
/>
