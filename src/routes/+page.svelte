<script context="module">
  import SpotifyWidget from '../components/SpotifyWidget.svelte';
</script>

<script>
  export let data;
  const { spotify } = data.props;
  console.log(spotify);
</script>

<SpotifyWidget { spotify } />