<script lang="ts">
  export let width: number;
  export let height: number;
  export let title: string;
  export let value: string;
</script>

<foreignObject {width} {height}>
  <div class="h-full pl-2 pr-1 pt-2 font-medium tracking-tighter">
    {#if height > 60 && width > 80}
      <div class="mb-1 hyphens-auto text-base leading-[1.2]">
        {title}
      </div>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="truncate text-sm font-normal">{@html value}</div>
    {:else if height > 40 && width > 40}
      <div class="mb-0.5 truncate text-sm leading-none">
        {title}
      </div>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <div class="truncate text-xs font-normal">{@html value}</div>
    {:else if height > 16 && width > 50}
      <div class="-mt-[3px] truncate text-xs leading-tight">
        {title}
      </div>
    {/if}
  </div>
</foreignObject>
