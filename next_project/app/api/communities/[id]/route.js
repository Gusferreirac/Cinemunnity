import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
    await client.connect();
    return client.db(dbName);
}

export async function GET(request, { params }) {
    const db = await connectToDatabase();
    const collection = db.collection('communities');

    try {
        const result = await collection.findOne({ _id : new ObjectId(params.id) });
        return new NextResponse(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(`Error getting posts: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}