<script lang="ts">
  import { prettifyNumberWithoutSuffix } from "$lib/utils";

  export let value: number;
  export let unit: string;
</script>

<div class="flex-1">
  <div class="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
    {prettifyNumberWithoutSuffix(value)}
  </div>
  <div class="text-xs font-medium text-gray-600">{unit}</div>
</div>
