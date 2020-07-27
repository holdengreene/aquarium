<script>
  export let segment;
</script>

<style>
  nav {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    background-color: var(--splash-color);
    padding: 25px 0;
  }

  a {
    grid-column: 2;
  }
</style>

<nav data-segment={segment}>
  <a href="/">Aquarium</a>
</nav>
