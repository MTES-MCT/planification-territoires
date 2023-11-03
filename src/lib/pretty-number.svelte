<script lang="ts">
  export let number: number;

  export let withUnitCO2 = true;
  export let negate = false;
  export let forceSign = false;
  export let round = true;

  $: formattedNumber = Number(number * (negate ? -1 : 1)).toLocaleString(
    "fr-FR",
    {
      maximumFractionDigits: round ? 0 : 1,
      signDisplay: forceSign ? "exceptZero" : "auto",
    }
  );
</script>

<span class="tracking-normal">{formattedNumber}</span
>{#if withUnitCO2}{" "}ktCO₂e{/if}
