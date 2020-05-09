<script>
  // Cleanup everything

  import { onMount, beforeUpdate, onDestroy } from "svelte";
  import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
  import "frappe-charts/dist/frappe-charts.min.css";

  export let tankData;

  let selectedParameter = "Nitrate";
  let chart;
  let chartRef;
  let availableParameters = [];
  let data = {};

  const parameters = tankData[0].parameters;

  if (parameters) {
    availableParameters = [
      ...new Set(parameters.map(parameter => parameter.name))
    ];
  }

  $: if (parameters) {
    const selectedParameterValue = parameters
      .filter(parameter => parameter.name === selectedParameter)
      .map(parameter => parameter.value);

    const selectedParameterDate = parameters
      .filter(parameter => parameter.name === selectedParameter)
      .map(parameter => new Date(parameter.date_tested).toLocaleDateString())
      .sort();

    data = {
      labels: [...selectedParameterDate],
      datasets: [
        {
          name: "Nitrate",
          type: "line",
          values: [...selectedParameterValue]
        }
      ]
    };
  }

  onMount(() => {
    chart = new Chart(chartRef, {
      title: "Cool Chart",
      data,
      type: "axis-mixed",
      height: 500,
      color: ["#743ee2"]
    });
  });

  beforeUpdate(() => chart && chart.update(data));

  onDestroy(() => (chart = null));

  function changeParameter(parameterName) {
    selectedParameter = parameterName;
  }
</script>

<style>
  .chart {
    width: 100%;
  }
</style>

<div class="chart" bind:this={chartRef} />
{#if availableParameters}
  <p>Currently Selected: {selectedParameter}</p>
  {#each availableParameters as parameter}
    <button on:click={() => changeParameter(parameter)}>
      {parameter}
    </button>
  {/each}
{/if}
