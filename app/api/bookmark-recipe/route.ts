import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST(req: Request) {
  try {
    const { recipe, userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const client = await pool.connect();

    try {
      await client.query(
        'INSERT INTO bookmarked_recipes (user_id, recipe) VALUES ($1, $2)',
        [userId, recipe]
      );

      return NextResponse.json({ message: 'Recipe bookmarked successfully' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error bookmarking recipe:', error);
    return NextResponse.json({ error: 'Error bookmarking recipe' }, { status: 500 });
  }
}
