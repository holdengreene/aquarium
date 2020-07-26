<script>
  export let name;
  export let value;
  export let date;

  const formattedDate = new Date(date).toLocaleDateString();
</script>

<style>
  h2 {
    font-weight: 600;
  }
</style>

<h2>{name}</h2>
<p>{value}</p>
<p>{formattedDate}</p>
