<script>
  export let data;
  console.log(data.spotify.topArtists.items);
</script>

<div>
  {#if data.spotify.topArtists.items.length > 0}
    {#each data.spotify.topArtists.items as artist}
      <div class="artist">
        <img src="{artist.images[2].url}">
        <h3>{artist.name}</h3>
        <p>{artist.genre}</p>
      </div>
    {/each}
  {/if}
</div>
