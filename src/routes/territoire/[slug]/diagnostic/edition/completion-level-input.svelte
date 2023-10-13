<script lang="ts">
  import ObjectiveForm from "$lib/objective-form.svelte";
  import { clamp } from "$lib/utils";
  import type { Action } from "$lib/types";

  export let action: Action;
  export let valuePhys: number;
  export let onUpdate: (newValuePhys: number, action: Action) => void;

  let valueCO2 = +(valuePhys / action.ratioCO2toPhys).toFixed(4);

  function handlePhysInputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const newValuePhys = Number(target.value) || 0;
    valueCO2 = +(newValuePhys / action.ratioCO2toPhys).toFixed(4);
    onUpdate(newValuePhys, action);
  }

  function handleCO2InputChanged(evt: Event) {
    const target = evt.target as HTMLInputElement;
    valueCO2 = Number(target.value) || 0;
    const newValuePhys = +(valueCO2 * action.ratioCO2toPhys).toFixed(4);
    onUpdate(newValuePhys, action);
  }
</script>

<ObjectiveForm
  {action}
  progress={action.objPhys ? clamp(valuePhys / action.objPhys, 0, 1) : 0}
  inputLabel="Action déjà menée ou contractualisée"
  {valuePhys}
  {valueCO2}
  {handlePhysInputChanged}
  {handleCO2InputChanged}
/>
