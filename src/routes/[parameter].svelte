<script context="module">
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  let EVERYTHING;

  export async function preload(page, session) {
    const { parameter } = page.params;

    EVERYTHING = gql`
      {
        tank {
          id
          parameters(where: { name: { _eq: "${parameter}" } }) {
            id
            name
            value
            date_tested
          }
        }
      }
    `;

    return {
      cache: await client.query({
        query: EVERYTHING
      })
    };
  }
</script>

<script>
  import { stores } from "@sapper/app";

  import { setClient, restore, query } from "svelte-apollo";

  export let cache;

  restore(client, EVERYTHING, cache.data);

  const parameter = query(client, { query: EVERYTHING });

  const { page } = stores();
  const { parameter: parameterName } = $page.params;
</script>

<style>
  h1 {
  }

  table {
    width: 100%;
    background-color: #fff;
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #000;
    padding: 5px;
  }

  th {
    text-align: left;
  }
</style>

<h1>{parameterName} Test Results</h1>

{#await $parameter}
  Loading...
{:then result}

  <table>
    <thead>
      <tr>
        <th>Value</th>
        <th>Date Tested</th>
      </tr>
    </thead>

    <tbody>
      {#each result.data.tank[0].parameters as test (test.id)}
        <tr>
          <td>{test.value}</td>
          <td>{new Date(test.date_tested).toLocaleDateString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>

{:catch error}
  <h2>{error}</h2>
{/await}
