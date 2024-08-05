import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
    if (!client.isConnected()) await client.connect();
    return client.db(dbName);
}

// Handle POST request to update user data
export async function POST(request, { params }) {
    const { userId } = params;
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const { email, login, password, name, bio, tags, genre, timestamp } = await request.json();

    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { email, login, password, name, bio, tags, genre, timestamp } }
        );

        if (result.matchedCount === 0) {
            return new NextResponse(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
