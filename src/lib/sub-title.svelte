<script lang="ts">
  export let label: string;
  export let muted = false;
</script>

<h4
  class="!mb-0 flex-1 text-base font-semibold leading-tight"
  class:text-gray-700={muted}
  class:text-gray-900={!muted}
>
  {label}
</h4>
