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
  import { setClient, restore, query } from "svelte-apollo";

  export let cache;

  restore(client, EVERYTHING, cache.data);

  const parameter = query(client, { query: EVERYTHING });
</script>

{#await $parameter}
  Loading...
{:then result}
  <ul>
    {#each result.data.tank[0].parameters as test (test.id)}
      <li>
        <h1>{test.name}</h1>
        <h2>{test.value}</h2>
        <h3>{new Date(test.date_tested).toLocaleDateString()}</h3>
      </li>
    {/each}
  </ul>

{:catch error}
  <h2>{error}</h2>
{/await}
