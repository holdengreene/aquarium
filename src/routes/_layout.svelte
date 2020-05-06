<style>
  main {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
	grid-template-areas: '. content .';
	color: #f9f9f9;
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
