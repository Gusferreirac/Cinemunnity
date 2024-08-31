import { MongoClient } from "mongodb";

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db(process.env.MONGODB_DB);
}


export async function GET(req) {
    const db = await connectToDatabase();

    const movies = await db.collection('movies').aggregate([{ $match: { poster: { $exists: true } } }, {$sort: { 'year': -1} },{ $sample: { size: 2 } }]).toArray();
    console.log(movies);

    return new Response(JSON.stringify(movies), {
        headers: { 'Content-Type': 'application/json' }
    });
}