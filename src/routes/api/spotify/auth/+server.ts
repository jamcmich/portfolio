import { error } from '@sveltejs/kit';
import 'dotenv/config';
import axios from 'axios';

// GET callback code
// https://accounts.spotify.com/authorize?client_id=c4d0043763a945d89f3d9c57f678d604&response_type=code&redirect_uri=http://localhost:5173/callback&scope=user-top-read

/* POST request to fetch new access_token using refresh_token */
/** @type {import('./$types').RequestHandler} */
export const POST = async () => {
  try {
    const encodedIdAndSecret = btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);

    const baseUrl = `https://accounts.spotify.com/api/token`;
    const requestBody = `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`;

    const response = await axios.post(baseUrl, requestBody, {
      headers: {
        'Authorization': `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Refreshing token... ', response.status)

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (err) {
    // console.log(err);
    error(500, 'Internal server error.');
  }
}