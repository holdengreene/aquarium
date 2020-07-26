<script context="module">
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  const EVERYTHING = gql`
    {
      tank {
        id
        tests(order_by: { date_tested: asc }) {
          id
          parameter
          value
          date_tested
        }
        availableTests: tests(
          distinct_on: parameter
          order_by: { parameter: desc, date_tested: desc }
        ) {
          id
          parameter
          value
          date_tested
        }
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: EVERYTHING,
      }),
    };
  }
</script>

<script>
  import Card from "../components/Card.svelte";
  import Parameter from "../components/Parameter.svelte";
  import MainChart from "../components/MainChart.svelte";
  import Popup from "../components/Popup.svelte";
  import CreateParameter from "../components/CreateParameter.svelte";
  import Loader from "../components/Loader.svelte";

  import { restore, query } from "svelte-apollo";

  export let cache;
  let open;

  restore(client, EVERYTHING, cache.data);

  const tank = query(client, { query: EVERYTHING });

  function refetch() {
    tank.refetch();
  }
</script>

<style>
  .graphs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
    margin-top: 25px;
  }

  .parameter-link {
    text-decoration: none;
  }
</style>

<svelte:head>
  <title>Aquarium</title>
</svelte:head>

<button class="create-parameter" on:click={() => (open = true)}>
  Create Parameter
</button>

<div class="graphs-grid">

  {#await $tank}
    <Loader loading />

  {:then result}
    <Popup {open} on:close={() => (open = false)}>
      <CreateParameter on:refetch={refetch} tankData={result.data.tank} />
    </Popup>

    <Card fullSize>
      <MainChart tankData={result.data.tank} />
    </Card>

    {#each result.data.tank[0].availableTests as parameter (parameter.id)}
      <a class="parameter-link" rel="prefetch" href={`/${parameter.parameter}`}>
        <Card>
          <Parameter
            name={parameter.parameter}
            value={parameter.value}
            date={parameter.date_tested} />
        </Card>
      </a>
    {/each}

  {:catch error}
    Error: {error}
  {/await}

</div>
