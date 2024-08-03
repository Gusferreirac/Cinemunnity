// app/api/list-databases/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const admin = client.db().admin();

    // Listar todos os bancos de dados
    const databasesList = await admin.listDatabases();
    const databases = databasesList.databases;

    // Listar coleções para cada banco de dados
    const databasesWithCollections = await Promise.all(databases.map(async (db) => {
      const database = client.db(db.name);
      const collections = await database.listCollections().toArray();
      return {
        name: db.name,
        collections: collections.map(col => col.name)
      };
    }));

    return NextResponse.json({ success: true, databases: databasesWithCollections });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
