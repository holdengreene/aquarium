<script context="module">
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  const EVERYTHING = gql`
    {
      tank {
        id
        parameters {
          id
          name
          value
          date_tested
        }
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: EVERYTHING
      })
    };
  }
</script>

<script>
  import Card from "../components/Card.svelte";
  import Parameter from "../components/Parameter.svelte";
  import MainChart from "../components/MainChart.svelte";
  
  import { setClient, restore, query } from "svelte-apollo";

  export let cache;

  restore(client, EVERYTHING, cache.data);

  const tank = query(client, { query: EVERYTHING });
</script>

<style>
  .graphs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-top: 25px;
  }
</style>

<svelte:head>
  <title>Aquarium</title>
</svelte:head>

<div class="graphs-grid">

  {#await $tank}
    <h1>Loading...</h1>

  {:then result}
    <Card fullSize>
      <MainChart tankData={result.data.tank} />
    </Card>

    {#each result.data.tank[0].parameters as parameter (parameter.id)}
      <Card>
        <Parameter
          name={parameter.name}
          value={parameter.value}
          date={parameter.date_tested} />
      </Card>
    {/each}

  {:catch error}
    Error: {error}
  {/await}

</div>
