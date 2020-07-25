<script>
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";
  import { createEventDispatcher } from "svelte";

  import Loader from "../components/Loader.svelte";

  let parameterName;
  let parameterValue;
  let submitting;
  const dispatch = createEventDispatcher();

  const INSERT_PARAMETER = gql`
    mutation Insert_Parameter(
      $parameterName: String!
      $parameterValue: String!
    ) {
      insert_parameter_one(
        object: { name: $parameterName, tank_id: 1, value: $parameterValue }
      ) {
        name
        tank_id
        value
      }
    }
  `;

  async function insertParameter() {
    try {
      submitting = true;
      await client.mutate({
        mutation: INSERT_PARAMETER,
        variables: { parameterName, parameterValue },
      });

      dispatch("refetch");

      submitting = false;
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style>
  .parameter-fieldset {
    border: none;
  }

  .fields-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .input-wrap {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  label {
    font-size: 20px;
  }

  input {
    padding: 10px;
    font-size: 18px;
  }

  .parameter-submit {
    background-color: #5cdb95;
    border: none;
    justify-self: flex-start;
    font-size: 30px;
    padding: 5px 45px;
  }
</style>

<form action="#" method="post" on:submit|preventDefault={insertParameter}>
  <fieldset class="parameter-fieldset" disabled={submitting}>
    <div class="fields-grid">
      <div class="input-wrap">
        <label for="p-name">Parameter Name</label>
        <input
          type="text"
          name="parameterName"
          id="p-name"
          bind:value={parameterName} />
      </div>

      <div class="input-wrap">
        <label for="p-value">Parameter Value</label>
        <input
          type="text"
          name="parameterValue"
          id="p-value"
          bind:value={parameterValue} />
      </div>

      <button class="parameter-submit" type="submit">Add Parameter</button>
    </div>
  </fieldset>

  {#if submitting}
    <Loader loading={submitting} />
  {/if}
</form>
