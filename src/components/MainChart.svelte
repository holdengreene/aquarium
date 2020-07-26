<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
  import "frappe-charts/dist/frappe-charts.min.css";

  export let tankData;

  let { availableTests } = tankData[0];
  let selectedParameter = availableTests[0].parameter;
  let chart;
  let chartRef;
  let data = {};

  const { tests } = tankData[0];

  $: if (tests) {
    const selectedParameterValue = tests
      .filter((test) => test.parameter === selectedParameter)
      .map((test) => test.value);

    const selectedParameterDate = tests
      .filter((test) => test.parameter === selectedParameter)
      .map((test) => new Date(test.date_tested).toLocaleDateString());

    data = {
      labels: [...selectedParameterDate],
      datasets: [
        {
          name: "Nitrate",
          type: "line",
          values: [...selectedParameterValue],
        },
      ],
    };
  }

  onMount(() => {
    chart = new Chart(chartRef, {
      title: "",
      data,
      type: "axis-mixed",
      height: 500,
      color: ["#743ee2"],
    });
  });

  afterUpdate(() => chart && chart.update(data));

  onDestroy(() => (chart = null));
</script>

<style>
  h2 {
    font-size: 34px;
  }

  .chart {
    width: 100%;
  }

  .chart-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .parameter-selector {
    font-size: 20px;
    padding: 5px 30px;
    border: none;
    border-bottom: 2px solid #5d5d5d;
  }
</style>

{#if availableTests}
  <div class="chart-top">
    <h2>{selectedParameter}</h2>

    <select
      class="parameter-selector"
      name="parameter"
      id="parameter"
      bind:value={selectedParameter}>
      {#each availableTests as parameter (parameter.id)}
        <option value={parameter.parameter}>{parameter.parameter}</option>
      {/each}
    </select>

  </div>
{/if}

<div class="chart" bind:this={chartRef} />
