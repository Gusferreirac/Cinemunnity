import { MongoClient } from "mongodb";

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db(process.env.MONGODB_DB);
}

export async function POST(req) {
    const { title, plot, fullplot, genres, cast, languages, directors, release, runtime, type } = await req.json();
    const db = await connectToDatabase();

    try{
        await db.collection('movies').insertOne({ title, plot, fullplot, genres, cast, languages, directors, release, runtime, type });
        
        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (e) {
        return new Response(JSON.stringify({ success: false }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

export async function GET(req) {
    const db = await connectToDatabase();
    const movies = await db.collection('movies').find().toArray();

    return new Response(JSON.stringify(movies), {
        headers: { 'Content-Type': 'application/json' }
    });
}
