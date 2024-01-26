import { type RequestHandler } from '@sveltejs/kit';
import 'dotenv/config';
import axios from 'axios';
import { handleError } from '$lib/server/api_utils';

export const GET: RequestHandler = async () => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    });

    return new Response(JSON.stringify(response.data), { status: response.status });
  } catch (error: any) {
    return new Response(handleError(error), { status: error.response.status });
  }
}