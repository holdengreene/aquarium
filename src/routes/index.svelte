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
  import AddTest from "../components/AddTest.svelte";
  import AddParameter from "../components/AddParameter.svelte";
  import Loader from "../components/Loader.svelte";
  import Icon from "../components/Icon.svelte";
  import Icons from "../components/Icons.svelte";

  import { popup } from "../lib/store";
  import { restore, query } from "svelte-apollo";

  export let cache;
  let addingState;

  restore(client, EVERYTHING, cache.data);

  const tank = query(client, { query: EVERYTHING });

  function refetch() {
    tank.refetch();
  }

  function addParameter() {
    addingState = "parameter";
    popup.open();
  }

  function addTest() {
    addingState = "test";
    popup.open();
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

  .add-parameter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--card-background);
    border-radius: 3px;
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.12),
      0 0.0625rem 0.125rem rgba(15, 14, 14, 0.24);
    padding: 25px;
    color: var(--font-color);
  }
</style>

<svelte:head>
  <title>Aquarium Overview</title>
</svelte:head>

<Icons />

<button on:click={addTest}>Add Test</button>

<div class="graphs-grid">

  {#await $tank}
    <Loader loading />

  {:then result}
    <Popup>
      {#if addingState === 'test'}
        <AddTest on:refetch={refetch} tankData={result.data.tank} />
      {:else if addingState === 'parameter'}
        <AddParameter on:refetch={refetch} tankData={result.data.tank} />
      {/if}
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

    <button class="add-parameter" on:click={addParameter}>
      <Icon name="plus" size="64" fill="currentColor" />
      Add Parameter
    </button>

  {:catch error}
    Error: {error}
  {/await}

</div>
