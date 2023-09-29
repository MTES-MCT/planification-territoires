<script lang="ts">
  import { prettifyNumberWithoutSuffix } from "$lib/utils";

  export let value: number;
  export let unit: string;
</script>

<div class="flex flex-1 items-end">
  <span class="text-2xl font-semibold tracking-tight text-gray-900">
    {prettifyNumberWithoutSuffix(value)}
  </span>
  <span class="ml-2 pb-1 text-xs font-medium text-gray-600">{unit}</span>
</div>
