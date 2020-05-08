<script context="module">
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  const EVERYTHING = gql`
    {
      parameter {
        id
        name
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: EVERYTHING
      })
    }
  }
</script>

<script>
  import Card from "../components/Card.svelte";

  import {setClient, restore, query} from 'svelte-apollo';

  export let cache;

  restore(client, EVERYTHING, cache.data);

  const parameters = query(client, {query: EVERYTHING});
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

{#await $parameters}
  Loading...
{:then result}
  {#each result.data.parameter as parameter}
    {parameter.name}
  {/each}
{:catch error}
  Error: {error}
{/await}

<div class="graphs-grid">
  <Card fullSize>Hello there</Card>

  <Card>Of Course</Card>
  <Card>Of Course</Card>
  <Card>Of Course</Card>
  <Card>Of Course</Card>
</div>
