import { json, error, type NumericRange } from '@sveltejs/kit';
import axios from 'axios';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
  try {
    // Make a secure GET request to the external API endpoint using Axios
    const apiUrl = 'https://dummyjson.com/products';
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Return the data as a JSON response using the json module
      return new Response(JSON.stringify(response.data), { status: 200 });
    } else {
      // If the request was not successful, use the error module
      error(response.status as NumericRange<400, 599>, 'Failed to fetch data from the external API.');
    }
  } catch (err) {
    error(500, 'Internal server error.');
  }
}

export const POST = async ({ request }) => {
  try {
    // Extract data from the request body
    const { body } = request;
    // Perform any necessary validation or processing of the data

    // Make an internal POST request using Axios
    const apiUrl = 'https://dummyjson.com/products/add';
    const axiosResponse = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Respond with the data from the internal API
    return json(axiosResponse.data);
  } catch (err) {
    // Handle errors
    console.error('Internal POST request error:', err);
    return error(500, 'Internal server error');
  }
}