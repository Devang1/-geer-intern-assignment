// app/api/products/route.js
import pool from '../../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    return Response.json(result.rows);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return new Response('Failed to fetch products', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      price,
      originalPrice,
      shape,
      collection,
      carat,
      image,
      discount,
      date
    } = body;

    const result = await pool.query(
      `INSERT INTO products
        (name, price, originalPrice, shape, collection, carat, image, discount, date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, price, originalPrice, shape, collection, carat, image, discount, date]
    );

    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return new Response('Failed to add product', { status: 500 });
  }
}
