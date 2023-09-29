<script>
  export let region;
  export let title;
</script>

<div class="mb-2 flex w-full flex-wrap items-end justify-between">
  <h1 class="mb-0 mt-4 max-w-3xl">{title}</h1>
  <div>
    <div class="mb-0">{region}</div>
    <a class="fr-link text-normal" href="/">Retournez au choix du territoire</a>
  </div>
</div>
