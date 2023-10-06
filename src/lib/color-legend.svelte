<script lang="ts">
  export let items: { label: string; color: string }[];
</script>

<div class="mb-1 flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
  {#each items as item}
    <div class="flex gap-1">
      <svg
        width="28"
        height="14"
        stroke-width="2"
        stroke="#555"
        fill={item.color}
      >
        <rect width="100%" height="100%"></rect>
      </svg>
      <div class="text-xs uppercase tracking-tight">
        {item.label}
      </div>
    </div>
  {/each}
</div>
