<script lang="ts">
  export let items: { label: string; color: string }[];
</script>

<div class="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
  {#each items as item}
    <div class="flex flex-row items-center gap-2">
      <div
        style="background-color: {item.color}"
        class="h-4 w-6 border border-gray-200 p-0"
      ></div>
      <div class="text-sm" style="font-variant-caps: all-small-caps;">
        {item.label}
      </div>
    </div>
  {/each}
</div>
