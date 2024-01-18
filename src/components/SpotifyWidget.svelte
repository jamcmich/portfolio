<!-- SpotifyWidget.svelte -->

<script>
  import { onMount } from 'svelte';
  import { fetchTopArtists } from '$lib/spotify_web_api.js';

  export let artists;

  onMount(async () => {
    console.log('Fetching Spotify data on client side...');
    artists = await fetchTopArtists();
  });
</script>

<section class="section__spotify-widget">
  {#if artists}
    <!-- Render each artist item -->
    {#each artists as artist (artist.id)}
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
