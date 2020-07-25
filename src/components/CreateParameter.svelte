<script>
  import client from "../lib/apollo";
  import { gql } from "apollo-boost";
  import { createEventDispatcher } from "svelte";

  let parameterName;
  let parameterValue;

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
      await client.mutate({
        mutation: INSERT_PARAMETER,
        variables: { parameterName, parameterValue },
      });

      refetch();
    } catch (error) {
      console.error(error);
    }
  }

  const dispatch = createEventDispatcher();

  function refetch() {
    dispatch("refetch");
  }
</script>

<form action="#" method="post" on:submit|preventDefault={insertParameter}>
  <fieldset>
    <label for="p-name">Parameter Name</label>
    <input
      type="text"
      name="parameterName"
      id="p-name"
      bind:value={parameterName} />

    <label for="p-value">Parameter Value</label>
    <input
      type="text"
      name="parameterValue"
      id="p-value"
      bind:value={parameterValue} />
  </fieldset>

  <button type="submit">Create</button>
</form>
