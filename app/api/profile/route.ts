import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function GET() {
  console.log('GET request received for /api/profile');
  try {
    const client = await pool.connect();
    try {
      console.log('Querying database for latest user');
      const result = await client.query('SELECT * FROM users ORDER BY id DESC LIMIT 1');
      
      console.log('Query result:', result.rows);
      
      if (result.rows.length > 0) {
        console.log('User found, returning data');
        return NextResponse.json({ user: result.rows[0] });
      } else {
        console.log('No users found');
        return NextResponse.json({ error: 'No users found' }, { status: 404 });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await pool.connect();
    try {
      const { name, age, weight, height, gender, chronicDiseases, allergies } = await request.json();

      const result = await client.query(
        'INSERT INTO users (name, age, weight, height, gender, chronic_diseases, allergies) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, age, weight, height, gender, chronicDiseases, allergies]
      );

      if (result.rows.length > 0) {
        return NextResponse.json({ user: result.rows[0] });
      } else {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}