import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db(process.env.MONGODB_DB);
}

export async function POST(request) {
    const { email, login, password } = await request.json();
    const db = await connectToDatabase();
    const collection = db.collection('users'); // Substitua pelo nome da sua coleção

    console.log('email', email);
    console.log('login', login);

    const user = await collection.findOne({ email, login, password });

    if (user) {
        return new NextResponse(JSON.stringify({ success: true, userId: user._id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new NextResponse(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
