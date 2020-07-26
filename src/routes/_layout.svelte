<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-areas: ". content .";
    color: var(--font-color);
    background-color: var(--primary-background);
    min-height: 100vh;
    padding: 50px 0;
  }

  .content {
    grid-area: content;
  }
</style>

<Nav {segment} />
<main>
  <div class="content">
    <slot />
  </div>
</main>
