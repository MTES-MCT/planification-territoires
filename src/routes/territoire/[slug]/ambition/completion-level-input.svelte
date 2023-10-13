<script lang="ts">
  import ObjectiveForm from "$lib/objective-form.svelte";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let valuePhys: number;
  export let onUpdate: (newValuePhys: number, action: Action) => void;
</script>

<ObjectiveForm
  {action}
  inputLabel="Objectif estimé comme atteignable en 2030"
  {valuePhys}
  {onUpdate}
/>
