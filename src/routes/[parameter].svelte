<script context="module">
  import client from "../lib/apollo";
  import { PARAMETER_TESTS } from "../graphql/queries";

  export async function preload(page) {
    const { parameter } = page.params;

    return {
      cache: await client.query({
        query: PARAMETER_TESTS,
        variables: {
          parameter,
        },
      }),
    };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { popup } from "../lib/store";
  import { restore, query } from "svelte-apollo";

  import Loader from "../components/Loader.svelte";
  import Popup from "../components/Popup.svelte";
  import DeleteParameter from "../components/DeleteParameter.svelte";
  import Icon from "../components/Icon.svelte";
  import Icons from "../components/Icons.svelte";

  export let cache;
  let deleting;
  let editing;
  let testId;

  restore(client, PARAMETER_TESTS, cache.data);

  const { page } = stores();
  const { parameter: parameterName } = $page.params;

  const parameter = query(client, {
    query: PARAMETER_TESTS,
    variables: {
      parameter: parameterName,
    },
  });

  function beginDelete(passedTestId) {
    popup.open();
    deleting = true;
    testId = `${passedTestId}`;
  }

  function beginEditing(passedTestId) {
    popup.open();
    editing = true;
    testId = `${passedTestId}`;
  }

  function closePopup() {
    popup.close();
  }

  function refetch() {
    parameter.refetch();
    popup.close();
  }
</script>

<style>
  .p-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  table {
    width: 100%;
    background-color: #fff;
    border-collapse: collapse;
    grid-column: span 2;
  }

  td,
  th {
    position: relative;
    border: 1px solid #000;
    padding: 5px;
  }

  th {
    text-align: left;
  }

  .editing {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modification-station {
    position: absolute;
    right: 10px;
  }

  .modification-station button {
    background-color: transparent;
    padding-right: 1px;
  }
</style>

<svelte:head>
  <title>{parameterName} Tests</title>
</svelte:head>

<Icons />

<div class="p-grid">
  <h1>{parameterName} Test Results</h1>

  {#await $parameter}
    <Loader loading />
  {:then result}

    <table>
      <thead>
        <tr>
          <th>Value</th>
          <th>Date Tested</th>
        </tr>
      </thead>

      <tbody>
        {#each result.data.tank[0].tests as test (test.id)}
          <tr>
            <td>{test.value}</td>
            <td>
              <div class="editing">
                {new Date(test.date_tested).toLocaleDateString()}
                <div class="modification-station">
                  <button>
                    <Icon name="pencil" />
                  </button>
                  <button on:click={() => beginDelete(test.id)}>
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <Popup>
      {#if deleting}
        <DeleteParameter {testId} on:refetch={refetch} on:cancel={closePopup} />
      {/if}
    </Popup>

  {:catch error}
    <h2>{error}</h2>
  {/await}

</div>
