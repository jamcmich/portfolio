import 'dotenv/config';
import axios from 'axios';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_CALLBACK_CODE = process.env.SPOTIFY_CALLBACK_CODE;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

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

export const fetchAccessToken = async () => {
  console.log('Fetching access token...');

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
  console.log('Refreshing access token...');

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

  try {
    const url = `${baseSpotifyUrl}/me/top/artists`;
    const accessToken = SPOTIFY_REFRESH_TOKEN;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      console.error('Received 401 error.');
      
      const url = `${baseSpotifyUrl}/me/top/artists`;

      // Refresh the access token
      const refreshedToken = await refreshAccessToken();
      
      // Retry the original request with the new access token
      if (refreshedToken.access_token) {
        const retryResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${refreshedToken.access_token}`,
          },
        });

        return retryResponse.data;
      } else {
        // Handle other errors
        console.log('Refreshed access token:'+ refreshedToken);
        console.error('Error refreshing access token:'+ error.message);
      }
    } else {
      // Handle other errors
      console.error('Error fetching top artists: ' + error.message);
    }
  }
};