<script>
  export let data;
  console.log(data);
</script>

<div>
  {#each data.products as product}
    <div class="product">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  {/each}
</div>
