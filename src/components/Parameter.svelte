<script>
    export let name;
    export let value;
    export let date;

    const formattedDate = new Date(date);
</script>

<h2>{name}</h2>
<p>{value}</p>
<p>{formattedDate.toLocaleDateString()}</p>
