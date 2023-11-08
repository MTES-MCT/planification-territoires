<script lang="ts">
  import PrettyNumber from "$lib/pretty-number.svelte";

  export let width: number;
  export let height: number;
  export let title: string;
  export let value: number;
</script>

<foreignObject {width} {height}>
  <div class="h-full pl-2 pr-1 pt-2 font-medium tracking-tighter">
    {#if height > 60 && width > 80}
      <div class="mb-1 hyphens-auto text-base leading-[1.2]">
        {title}
      </div>
      <div class="truncate text-sm font-normal">
        {#if typeof value === "string"}
          {value}
        {:else}
          <PrettyNumber number={value} negate forceSign />
        {/if}
      </div>
    {:else if height > 40 && width > 40}
      <div class="mb-0.5 truncate text-sm leading-none">
        {title}
      </div>
      <div class="truncate text-xs font-normal">
        {#if typeof value === "string"}
          {value}
        {:else}
          <PrettyNumber number={value} negate forceSign />
        {/if}
      </div>
    {:else if height > 16 && width > 50}
      <div class="-mt-[3px] truncate text-xs leading-tight">
        {title}
      </div>
    {/if}
  </div>
</foreignObject>
