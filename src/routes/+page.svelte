<script context="module">
  import Spotify from "../components/+spotify.svelte";
</script>

<script lang="ts">
  export let data: any;
  export let artists = data.spotify.artists.items;

  console.log(data);
</script>

<div>
  <Spotify { artists } />
</div>
