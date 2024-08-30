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
    const size = parseInt(req.headers.get('Size'));


    const communities = await db.collection('communities').find().sort({x:1}).limit(size).toArray();

    return new Response(JSON.stringify(communities), {
        headers: { 'Content-Type': 'application/json' }
    });
}
