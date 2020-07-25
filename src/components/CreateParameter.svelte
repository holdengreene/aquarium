<script>
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";
  import { createEventDispatcher } from "svelte";

  import Loader from "../components/Loader.svelte";

  export let tankData;

  const dispatch = createEventDispatcher();
  let { availableParameters } = tankData[0];
  let parameterName;
  let parameterNameText;
  let parameterValue;
  let submitting;

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
        variables: {
          parameterName: parameterNameText ?? parameterName,
          parameterValue,
        },
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

  .parameter-select {
    font-size: 20px;
    padding: 5px 30px;
  }

  .parameter-text {
    margin-top: 20px;
  }

  label {
    font-size: 20px;
  }

  input {
    padding: 10px;
    font-size: 18px;
  }

  .parameter-submit {
    background-color: var(--splash-color);
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
        {#if availableParameters}
          <select
            class="parameter-select"
            name="parameterName"
            id="p-name"
            bind:value={parameterName}>
            {#each availableParameters as parameter (parameter.id)}
              <option value={parameter.name}>{parameter.name}</option>
            {/each}
            <option value="add-new">Add New</option>
          </select>
        {/if}

        {#if !availableParameters || parameterName === 'add-new'}
          <input
            type="text"
            class="parameter-text"
            name="parameterName"
            bind:value={parameterNameText} />
        {/if}
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
