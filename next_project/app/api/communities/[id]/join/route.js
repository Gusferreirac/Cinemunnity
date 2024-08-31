import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
    await client.connect();
    return client.db(dbName);
}

export async function POST(request, {params}) {
    const db = await connectToDatabase();
    const collection = db.collection('communities');

    const { userId } = await request.json();

    try {
        const result = await collection.updateOne(
            { _id : new ObjectId(params.id) },
            { $push: { users: new ObjectId(userId) } }
        );

        if(result.modifiedCount > 0){
            return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
    } catch (error) {
        console.error(`Error getting posts: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}