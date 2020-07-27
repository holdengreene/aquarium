<script>
  import client from "../lib/apollo";
  import { createEventDispatcher } from "svelte";
  import { INSERT_PARAMETER } from "../graphql/mutations";

  import Loader from "../components/Loader.svelte";

  const dispatch = createEventDispatcher();
  let parameterName;
  let parameterValue;
  let submitting;

  async function insertParameter() {
    try {
      submitting = true;
      await client.mutate({
        mutation: INSERT_PARAMETER,
        variables: {
          parameterName: parameterName,
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

  .parameter-text {
    margin-top: 20px;
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

        <input
          type="text"
          class="parameter-text"
          name="parameterName"
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
