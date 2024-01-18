import axios from 'axios';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CALLBACK_CODE,
  SPOTIFY_REFRESH_TOKEN,
} from '$lib/env';

const basicAuth = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).trim();
const baseSpotifyUrl = 'https://api.spotify.com/v1';
const redirectUri = 'http://localhost:5173/callback';

export const fetchClientCredentials = async () => {
  try {
    const url = 'https://accounts.spotify.com/api/token';
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      redirect_uri: redirectUri,
    });

    const response = await axios.post(url, params, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.error(new Error('Error fetching token: ' + error.message));
  }
};

export const fetchAuthorizationCode = async () => {
  try {
    const url = 'https://accounts.spotify.com/authorize';
    const params = new URLSearchParams({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: 'user-top-read',
    });

    const response = await axios.get(`${url}?${params.toString()}`);

    return response.data;
  } catch (error) {
    console.error(new Error('Error fetching token: ' + error.message));
  }
};

// ... (similar refactoring for other functions)
export const fetchAccessToken = async () => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code: SPOTIFY_CALLBACK_CODE,
      redirect_uri: redirectUri,
    });

    const response = await axios.post(url, params, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.log(new Error("Error fetching token: " + error.message));
  }
};

export const refreshAccessToken = async () => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    })

    const response = await axios.post(url, params, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.log(new Error("Error refreshing token: " + error.message));
  }
};

export const fetchTopArtists = async () => {
  console.log('Fetching top artists...');
  console.log(SPOTIFY_REFRESH_TOKEN);

  try {
    const url = `${baseSpotifyUrl}/me/top/artists`;
    const accessToken = SPOTIFY_REFRESH_TOKEN;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error(new Error('Error fetching top artists: ' + error.message));
  }
};