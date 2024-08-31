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
    const collection = db.collection('user_reviews');
 
    try {
        const result = await collection.find({
            user_id: new ObjectId(params.userId),
            movie_id: new ObjectId(params.movieId),
        }).sort({ timestamp: -1 }).toArray();
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

export async function POST(request, { params }) {
    const user_id = new ObjectId(params.userId);
    const db = await connectToDatabase();
    const collection = db.collection('user_reviews');
    const userCollection = db.collection('users');
    const movieCollection = db.collection('movies');
    const movie = await movieCollection.findOne({ _id: new ObjectId(params.movieId) });

    const user= await userCollection.findOne({ _id: user_id});
    const user_name = user.name;
    const { title, content, tagsArray } = await request.json();

    const timestamp = new Date();

    const tags = tagsArray.map(function(tag) {
        return tag.text;
    });

    try {
        const result = await collection.insertOne(
            { user_id, user_name, title, content, tags, timestamp, movie_id: new ObjectId(params.movieId), movie_title: movie.title }
        );

        if(result.insertedId) {
            return new NextResponse(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    }catch (error) {
        console.error(`Error creating post: ${error.message}`);
        return new NextResponse(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}