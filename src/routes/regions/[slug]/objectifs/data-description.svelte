<script lang="ts">
  import { prettyNum } from "$lib/utils";

  export let value: number;
  export let unit: string;
</script>

<div class="flex-1">
  <div class="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
    {prettyNum(value, true)}
  </div>
  <div class="text-xs font-medium text-gray-600">{unit}</div>
</div>
