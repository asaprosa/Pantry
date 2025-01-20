import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET(request: Request) {
  console.log('GET request received at /api/bookmarked-recipes');

  try {
    console.log('Attempting to connect to database');
    const client = await pool.connect();
    console.log('Connected to database');
    
    try {
      // First, get all user IDs from the bookmarked_recipes table
      const userIdResult = await client.query('SELECT DISTINCT user_id FROM bookmarked_recipes');
      const userIds = userIdResult.rows.map(row => row.user_id);
      console.log('Found user IDs:', userIds);

      if (userIds.length === 0) {
        console.log('No users found with bookmarked recipes');
        return NextResponse.json({ bookmarkedRecipes: [] });
      }

      // Use the first user ID found (you might want to modify this logic based on your needs)
      const userId = userIds[0];
      console.log('Using user ID:', userId);

      const result = await client.query(
        'SELECT * FROM bookmarked_recipes WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      console.log(`Found ${result.rows.length} bookmarked recipes for user ${userId}`);

      return NextResponse.json({ bookmarkedRecipes: result.rows, userId: userId });
    } finally {
      client.release();
      console.log('Database connection released');
    }
  } catch (error: any) {
    console.error('Detailed error fetching bookmarked recipes:', error);
    return NextResponse.json({ error: 'Error fetching bookmarked recipes', details: error.message }, { status: 500 });
  }
}