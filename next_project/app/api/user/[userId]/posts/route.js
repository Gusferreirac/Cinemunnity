import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
    await client.connect();
    return client.db(dbName);
}


export async function POST(request, { params }) {
    const { user_id } = params;
    const db = await connectToDatabase();
    const collection = db.collection('user_posts');
    const userCollection = db.collection('users');

    const user_name = await userCollection.findOne({ _id: new ObjectId(userId) });
    const { title, content, tags, creation_date } = await request.json();

    try {
        const result = await collection.insertOne(
            { user_id, user_name,title, content, tags, creation_date }
        );
    
        return new NextResponse(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    }catch (error) {
        console.error(`Error creating post: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(request, { params }) {
    const { userId } = params;
    const db = await connectToDatabase();
    const collection = db.collection('user_posts');

    try {
        const result = await collection.find({ user_id : new ObjectId(params.userId)}).toArray();
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