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



export async function GET(req) {
    const db = await connectToDatabase();
    const size = parseInt(req.headers.get('Size'));


    const communities = await db.collection('communities').find().sort({x:1}).limit(size).toArray();

    return new Response(JSON.stringify(communities), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(req) {
    const db = await connectToDatabase();
    const body = await req.json();
    const { name, description, creation_date, creator } = body;

    const alreadyExists = await db.collection('communities').findOne({name});

    if(alreadyExists) {
        return new NextResponse(JSON.stringify({ success: false, message: 'Community already exists' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const users = [new ObjectId(creator)];
    const timestamp = new Date(creation_date)

    try{
        const community = await db.collection('communities').insertOne({ name, description, timestamp, users });

        if(community.insertedId) {
            return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error(`Error creating community: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
