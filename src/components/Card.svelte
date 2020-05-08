<script>
export let fullSize = false;
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    place-items: center;
    background-color: var(--card-background);
    border-radius: 3px;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.12),
      0 0.0625rem 0.125rem rgba(15, 14, 14, 0.24);
    padding: 25px;
    color: var(--font-color);
  }

  .fullSize {
      grid-column: 1 / -1;
  }
</style>

<div class:fullSize>
    <slot></slot>
</div>
