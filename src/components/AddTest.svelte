<script>
  import client from "../lib/apollo";
  import { INSERT_PARAMETER } from "../graphql/mutations";
  import { createEventDispatcher } from "svelte";

  import Loader from "../components/Loader.svelte";

  export let tankData;

  const dispatch = createEventDispatcher();
  let { availableTests } = tankData[0];
  let parameterName;
  let parameterNameText;
  let parameterValue;
  let submitting;

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

  .parameter-submit {
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
        {#if availableTests.length > 0}
          <select
            class="parameter-select"
            name="parameterName"
            id="p-name"
            bind:value={parameterName}>
            {#each availableTests as parameter (parameter.id)}
              <option value={parameter.parameter}>{parameter.parameter}</option>
            {/each}
          </select>
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

      <button class="parameter-submit" type="submit">Add Test</button>
    </div>
  </fieldset>

  {#if submitting}
    <Loader loading={submitting} />
  {/if}
</form>
