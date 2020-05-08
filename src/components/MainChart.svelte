<script>
  export let tankData;
</script>

{#if tankData[0].parameters}
  <ul>
    {#each tankData[0].parameters as parameter}
      <li>{parameter.name}: {parameter.value}</li>
    {/each}
  </ul>
{/if}
