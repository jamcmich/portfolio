<!-- SpotifyWidget.svelte -->

<script context="module">
  import {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    SPOTIFY_CALLBACK_CODE,
    SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_USER_ID,
  } from "$lib/env";

  const clientId = SPOTIFY_CLIENT_ID;
  const clientSecret = SPOTIFY_CLIENT_SECRET;
  const callbackCode = SPOTIFY_CALLBACK_CODE;

  const redirectUri = "http://localhost:5173/callback";
  const basicAuth = btoa(`${clientId}:${clientSecret}`).trim();

  export const fetchClientCredentials = async () => {
    try {
      const baseUrl = "https://accounts.spotify.com/api/token";

      const bodyParams = new URLSearchParams({
        grant_type: "client_credentials",
        redirect_uri: redirectUri,
      });

      const fullUrl = `${baseUrl}?${bodyParams.toString()}`;
      console.log(fullUrl);

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(new Error("Error fetching token: " + error.message));
    }
  };

  export const fetchAuthorizationCode = async () => {
    try {
      const baseUrl = "https://accounts.spotify.com/authorize";

      const queryParams = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: "user-top-read",
      });

      const fullUrl = `${baseUrl}?${queryParams.toString()}`;

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(new Error("Error fetching token: " + error.message));
    }
  };

  export const fetchAccessToken = async () => {
    try {
      const baseUrl = "https://accounts.spotify.com/api/token";

      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "authorization_code");
      bodyParams.append("code", callbackCode);
      bodyParams.append("redirect_uri", redirectUri);

      const fullUrl = baseUrl;

      console.log("Request Details:", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(new Error("Error fetching token: " + error.message));
    }
  };

  export const refreshAccessToken = async () => {
    try {
      const baseUrl = "https://accounts.spotify.com/api/token";

      const bodyParams = new URLSearchParams();
      bodyParams.append("grant_type", "refresh_token");
      bodyParams.append("refresh_token", SPOTIFY_REFRESH_TOKEN);

      const fullUrl = baseUrl;

      console.log("Request Details:", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyParams.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(new Error("Error refreshing token: " + error.message));
    }
  };

  export const fetchTopItems = async (item = "tracks") => {
    try {
      const baseUrl = `https://api.spotify.com/v1/me/top/${item}`;
      const accessToken = ""; // TODO: Get access token

      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(new Error("Error fetching top tracks: " + error.message));
    }
  };

  // console.log(await fetchClientCredentials());
  // console.log(await fetchAuthorizationCode());
  // console.log(await refreshAccessToken());
  // console.log(await fetchTopItems("artists"));

  import spotifyTopArtists from "../data/top_artists.json";
  
  export let artists = spotifyTopArtists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    images: artist.images,
    genres: artist.genres,
  }));
</script>

<section class="section__spotify-widget">
  <!-- Render each artist item -->
  {#each artists as artist (artist.id)}
    <div class="artists__wrapper">
      <h2>{artist.name}</h2>
      <img src={artist.images[2].url} alt={artist.name} />
      <p>Genres: {artist.genres.join(', ')}</p>
    </div>
  {/each}
</section>

<style></style>
