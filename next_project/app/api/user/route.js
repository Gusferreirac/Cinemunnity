// app/api/user/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('Cinemmunity');
  const movies = await db.collection('movies').find({}).toArray();

  return NextResponse.json(movies);
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('myFirstDatabase');
  const movie = await req.json();
  await db.collection('movies').insertOne(movie);

  return NextResponse.json(movie, { status: 201 });
}
