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
    const userCollection = db.collection('users');

    const { title, content, tagsArray, creation_date, userId } = await request.json();

    const timestamp = new Date(creation_date);

    const tags = tagsArray.map(function(tag) {
        return tag.text;
    });

    const user= await userCollection.findOne({ _id: new ObjectId(userId)});
    const user_name = user.name;

    const post = {
        user_id: new ObjectId(userId),
        user_name,
        title,
        content,
        tags,
        timestamp,
    };

    try {
        const result = await collection.updateOne(
            { _id : new ObjectId(params.id) },
            { $push: { posts: new Object(post) } }
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