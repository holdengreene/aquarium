<style>
  main {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
	grid-template-areas: '. content .';
	color: var(--font-color);
	background-color: var(--primary-background);
	min-height: 100vh;
  }

  .content {
	  grid-area: content;
  }
</style>

<main>
  <div class="content">
    <slot />
  </div>
</main>
