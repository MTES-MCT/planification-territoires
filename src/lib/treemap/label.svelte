<script>
  export let width;
  export let height;
  export let lines;
</script>

<foreignObject {width} {height}>
  <div class="h-full pl-2 pr-1 pt-2 font-medium tracking-tighter">
    {#if height > 60 && width > 80}
      <div class="mb-1 hyphens-auto text-base leading-[1.2]">
        {lines[0]}
      </div>
      <div class="truncate text-sm font-normal">{lines[1]}</div>
    {:else if height > 40 && width > 40}
      <div class="mb-0.5 truncate text-sm leading-none">
        {lines[0]}
      </div>
      <div class="truncate text-xs font-normal">{lines[1]}</div>
    {:else if height > 16 && width > 50}
      <div class="-mt-[3px] truncate text-xs leading-tight">
        {lines[0]}
      </div>
    {/if}
  </div>
</foreignObject>
