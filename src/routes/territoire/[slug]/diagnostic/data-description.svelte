<script lang="ts">
  import { prettyNum } from "$lib/utils";

  export let value: number;
  export let unit: string;
</script>

<div class="flex flex-1 flex-col items-end justify-end border-r text-right">
  <div class="pr-4">
    <div
      class="-mt-1 text-base font-semibold leading-tight tracking-tight text-gray-900 md:text-lg"
    >
      {prettyNum(value, { roundBig: true, roundAll: false, unitCO2: false })}
    </div>
    <div class="text-xs leading-tight text-gray-800 md:text-sm">{unit}</div>
  </div>
</div>
