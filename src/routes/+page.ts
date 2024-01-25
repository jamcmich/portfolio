export const load = async ({ fetch }) => {
  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data.products;
  }

  const fetchProduct = async () => {
    const response = await fetch('/api/product');
    const data = await response.json();
    return data;
  }

  const addProduct = async () => {
    const response = await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'New Title' }),
    });
    const data = await response.json();
    return data;
  }

  const spotifyAuth = async () => {
    const response = await fetch(`/api/spotify/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }

  const fetchTopArtists = async () => {
    const response = await fetch(`/api/spotify/top-artists`);
    const data = await response.json();
    return data;
  }

  // return {
  //   spotifyAuth: await spotifyAuth(),
  //   products: await fetchProducts(),
  //   product: await fetchProduct(),
  //   addedProducts: await addProduct(),
  // }

  return {
    spotify: {
      topArtists: await fetchTopArtists(),
    }
  }
}