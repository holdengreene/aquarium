<script context="module">
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  let EVERYTHING = gql`
    query TankQuery($parameter: String!) {
      tank {
        id
        tests(where: { parameter: { _eq: $parameter } }) {
          id
          parameter
          value
          date_tested
        }
      }
    }
  `;

  export async function preload(page) {
    const { parameter } = page.params;

    return {
      cache: await client.query({
        query: EVERYTHING,
        variables: {
          parameter,
        },
      }),
    };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { restore, query } from "svelte-apollo";

  import Loader from "../components/Loader.svelte";
  import Popup from "../components/Popup.svelte";
  import DeleteParameter from "../components/DeleteParameter.svelte";
  import Icon from "../components/Icon.svelte";
  import Icons from "../components/Icons.svelte";

  export let cache;
  let openDelete;
  let testId;

  restore(client, EVERYTHING, cache.data);

  const { page } = stores();
  const { parameter: parameterName } = $page.params;

  const parameter = query(client, {
    query: EVERYTHING,
    variables: {
      parameter: parameterName,
    },
  });

  function beginDelete(passedTestId) {
    openDelete = true;
    testId = `${passedTestId}`;
  }

  function closePopup() {
    openDelete = false;
  }

  function refetch() {
    parameter.refetch();
    openDelete = false;
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

    <Popup open={openDelete} on:close={closePopup}>
      {#if openDelete}
        <DeleteParameter {testId} on:refetch={refetch} on:cancel={closePopup} />
      {/if}
    </Popup>

  {:catch error}
    <h2>{error}</h2>
  {/await}

</div>
