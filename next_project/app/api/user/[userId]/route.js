import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
    await client.connect();
    return client.db(dbName);
}

export async function POST(request, { params }) {
    const db = await connectToDatabase();
    const collection = db.collection('users');

    const{userId} = params;
    const user_id = new ObjectId(userId);

    const { name, bio, tagsArray } = await request.json();
    const tags = tagsArray.map(function(tag) {
        return tag.text;
    });

    try {
        const user = await collection.updateOne({_id:user_id},
            { $set: { name, bio, tags } }
        );

        cookies().set('userId', user_id);
        cookies().set('name', name);
        return new NextResponse(JSON.stringify({ success: true, user }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}


export async function GET(request, { params }) {
    console.log('Params:', params);
    const db = await connectToDatabase();
    const collection = db.collection('users');

    try {
        const user = await collection.findOne({ _id: new ObjectId(params.userId) });

        if (user) {
            return new NextResponse(JSON.stringify({ success: true, user }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new NextResponse(JSON.stringify({ success: false, message: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
