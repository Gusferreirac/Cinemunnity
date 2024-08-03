// app/api/test-db/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    console.log(`Connected to database: ${process.env.MONGODB_DB}`);
    console.log(`Using collection: movies`);

    const movies = await db.collection('movies').find({}).toArray();

    console.log(`Movies found: ${movies.length}`);
    console.log(movies);

    return NextResponse.json({ success: true, moviesCount: movies.length, movies });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
