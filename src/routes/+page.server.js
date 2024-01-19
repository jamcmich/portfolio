import "dotenv/config";
import { fetchTopArtists } from '$lib/spotify_web_api.js';

export const load = async () => {
  console.log('Fetching Spotify data on server side...');

	return {
    props: {
      spotify: await fetchTopArtists(),
    }
  };
}