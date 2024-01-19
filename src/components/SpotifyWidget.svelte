<!-- SpotifyWidget.svelte -->

<script>
  export let spotify;
</script>

<section class="section__spotify-widget">
  {#if spotify}
    <!-- Render each artist item -->
    {#each spotify.items as artist (artist.id)}
      <div class="artists__wrapper">
        <h2>{artist.name}</h2>
        <img src={artist.images[2].url} alt={artist.name} />
        <p>Genres: {artist.genres.join(", ")}</p>
      </div>
    {/each}
  {:else}
    <p>Loading Spotify data...</p>
  {/if}
</section>

<style></style>
