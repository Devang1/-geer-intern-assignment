
import pool from '../../../../lib/db';

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return new Response('Product not found', { status: 404 });
    }

    return Response.json({ message: 'Product deleted', product: result.rows[0] });
  } catch (error) {
    console.error('DELETE /api/products/:id error:', error);
    return new Response('Failed to delete product', { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;

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
      `
      UPDATE products
      SET name = $1,
          price = $2,
          originalprice = $3,
          shape = $4,
          collection = $5,
          carat = $6,
          image = $7,
          discount = $8,
          date = $9
      WHERE id = $10
      RETURNING *
      `,
      [
        name,
        price,
        originalPrice,
        shape,
        collection,
        carat,
        image,
        discount,
        date,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      message: 'Product updated successfully',
      updatedProduct: result.rows[0],
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('PUT /api/products/:id error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

