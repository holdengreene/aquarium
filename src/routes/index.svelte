<script>
import Card from '../components/Card.svelte';
</script>

<style>
  .graphs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }
</style>

<svelte:head>
  <title>Aquarium</title>
</svelte:head>

<div class="graphs-grid">
  <Card fullSize>Hello there</Card>

  <Card>Of Course</Card>
  <Card>Of Course</Card>
  <Card>Of Course</Card>
  <Card>Of Course</Card>
</div>
