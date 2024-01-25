import { error, type NumericRange } from '@sveltejs/kit';
import 'dotenv/config';
import axios from 'axios';

// {
//   spotifyAuth: {
//     access_token: 'BQCJMUh2DJ_NYYNLg0E4l1rYSfxH7kOEgAaZFh5Re0mvirZxPweiPk95yKZSYA6MFjZe54PUrvjvLP563RNbWTU7MH_JWjTxfCxG-r5Ksp37EkTCcm-0yLQUjEhWsoLVjaAKONbKKNo1IvjmWhUvW50Kt-cBRQ-W0YNG5VHzGHxn8u8DG4d8SCxWX2eFdOmaeN0nK3c33ggmtg',
//     token_type: 'Bearer',
//     expires_in: 3600,
//     scope: 'user-top-read'
//   }
// }

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
  try {
    const baseUrl = 'https://api.spotify.com/v1/me/top/artists';
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer BQCJMUh2DJ_NYYNLg0E4l1rYSfxH7kOEgAaZFh5Re0mvirZxPweiPk95yKZSYA6MFjZe54PUrvjvLP563RNbWTU7MH_JWjTxfCxG-r5Ksp37EkTCcm-0yLQUjEhWsoLVjaAKONbKKNo1IvjmWhUvW50Kt-cBRQ-W0YNG5VHzGHxn8u8DG4d8SCxWX2eFdOmaeN0nK3c33ggmtg`,
      },
    });

    if (response.status === 200) {
      // Return the data as a JSON response using the json module
      return new Response(JSON.stringify(response.data), { status: 200 });
    } else {
      // If the request was not successful, use the error module
      error(response.status as NumericRange<400, 599>, 'Failed to fetch data from the external API.');
    }
  } catch (err) {
    console.log(err);
  }
}