import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb.js';
import { ObjectId } from 'mongodb';

export async function PUT(request, { params }) {
  const { userId } = params;

  if (!ObjectId.isValid(userId)) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Invalid userId format' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  let db;
  try {
    db = await connectToDatabase();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Database connection error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const collection = db.collection('users');

  try {
    const data = await request.json();
    console.log('Data received for update:', data);

    const objectId = new ObjectId(userId);
    console.log('Searching for document with ID:', objectId);

    const existingDocument = await collection.findOne({ _id: objectId });
    console.log('Existing document:', existingDocument);

    if (!existingDocument) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'User not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await collection.updateOne(
      { _id: objectId },
      { $set: data }
    );

    console.log('Update result:', result);

    if (result.matchedCount === 0) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'User not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating user:', error.message);
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
