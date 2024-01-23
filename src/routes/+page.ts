export const load = async ({ fetch }) => {
  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data.products;
  }

  return {
    products: await fetchProducts(),
  }
}