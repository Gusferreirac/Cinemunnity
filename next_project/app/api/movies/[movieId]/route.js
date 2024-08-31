import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db(process.env.MONGODB_DB);
}

export async function GET(request, {params}) {
    console.log('params:', params);
    console.log('====================================');
    console.log();
    console.log('====================================');

    if(!params.movieId) {
        return new Response('Movie ID is required', {
            status: 400,
            statusText: 'Movie ID is required',
            headers: { 'Content-Type': 'text/plain' }
        });
    }

    const db = await connectToDatabase();
    const id = params.movieId;


    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify(movie), {
        status: 200,
        statusText: 'Movie found',
        headers: { 'Content-Type': 'application/json' }
    });
}
