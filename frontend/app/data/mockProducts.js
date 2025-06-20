
export async function getMockProducts() {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data;
}

