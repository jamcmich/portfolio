<script lang="ts">
  export let artists: any;
</script>

{#if artists && artists.length > 0}
  {#each artists as artist}
    <div class="artist">
      <img alt="{artist.name}" src="{artist.images[2].url}">
      <h3>{artist.name}</h3>
      <p>{artist.genres}</p>
    </div>
  {/each}
{/if}
