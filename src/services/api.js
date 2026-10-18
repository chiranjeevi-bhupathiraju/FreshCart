import { adaptProduct } from "../utils/productAdapter";
import { getMockProductById } from "../data/mockProducts";
const base = "https://dummyjson.com/products";
async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Could not load products (${res.status})`);
  return res.json();
}
export async function getProducts(limit = 30, skip = 0, signal) {
  const d = await request(`${base}?limit=${limit}&skip=${skip}`, signal);
  return {
    products: (d.products || []).map(adaptProduct),
    total: d.total || 0,
  };
}
export async function getProductById(id, signal) {
  const mockProduct = getMockProductById(String(id));
  if (mockProduct) return mockProduct;
  return adaptProduct(
    await request(`${base}/${encodeURIComponent(id)}`, signal),
  );
}
export async function searchProducts(q, signal) {
  const d = await request(`${base}/search?q=${encodeURIComponent(q)}`, signal);
  return (d.products || []).map(adaptProduct);
}
export async function getCategories(signal) {
  return request(`${base}/categories`, signal);
}
export async function getProductsByCategory(category, signal) {
  const groceryLabels = [
    "fruits & vegetables",
    "dairy & eggs",
    "bakery",
    "meat & seafood",
    "snacks",
    "beverages",
    "grains & pulses",
  ];
  const normalized = groceryLabels.includes(category.toLowerCase())
    ? "groceries"
    : category.toLowerCase() === "household"
      ? "home-decoration"
      : category;
  const d = await request(
    `${base}/category/${encodeURIComponent(normalized)}`,
    signal,
  );
  return (d.products || []).map(adaptProduct);
}
export async function getProductsByPage(skip, limit = 12, signal) {
  return getProducts(limit, skip, signal);
}
