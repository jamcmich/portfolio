<script>
  export let data;
  export let artists = data.spotify.artists.items;

  console.log(data);
</script>

<div>
  {#if artists && artists.length > 0}
    {#each artists as artist}
      <div class="artist">
        <img alt="" src="{artist.images[2].url}">
        <h3>{artist.name}</h3>
        <p>{artist.genres}</p>
      </div>
    {/each}
  {/if}
</div>
