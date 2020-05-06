<style>
  .graphs-grid {
    --graphs-columns: repeat(auto-fit, minmax(250px, 1fr));
    display: grid;
    grid-template-columns: var(--graphs-columns);
    gap: 25px;
  }

  .card {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.12),
      0 0.0625rem 0.125rem rgba(15, 14, 14, 0.24);
    color: #000;
    padding: 25px;
  }

  .main-graph {
    grid-column: 1 / -1;
    margin-top: 50px;
  }
</style>

<svelte:head>
  <title>Aquarium</title>
</svelte:head>

<div class="graphs-grid">
  <div class="main-graph card">Hello there</div>

  <div class="parameter card">Of Course</div>
  <div class="parameter card">Of Course</div>
  <div class="parameter card">Of Course</div>
  <div class="parameter card">Of Course</div>
</div>
