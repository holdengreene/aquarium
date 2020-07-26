<script>
  import { createEventDispatcher } from "svelte";
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";

  export let testId;

  const dispatch = createEventDispatcher();

  const DELETE_TEST = gql`
    mutation DeleteTest($testId: bigint!) {
      delete_test(where: { id: { _eq: $testId } }) {
        affected_rows
      }
    }
  `;

  async function deleteTest() {
    try {
      await client.mutate({
        mutation: DELETE_TEST,
        variables: {
          testId,
        },
      });

      dispatch("refetch");
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style>
  h2 {
    font-size: 34px;
    text-align: center;
  }

  button {
    cursor: pointer;
    border: none;
    padding: 5px 20px;
    font-size: 18px;
  }

  .delete {
    background-color: red;
    border: none;
    padding: 5px 20px;
  }

  .cancel {
    background-color: #5d5d5d;
    color: #fff;
  }
</style>

<div class="delete-confirmation">
  <h2>Confirm Delete</h2>

  <div class="button-flex">
    <button class="delete" on:click={deleteTest}>Delete Test</button>
    <button class="cancel" on:click={() => dispatch('cancel')}>Cancel</button>
  </div>
</div>
