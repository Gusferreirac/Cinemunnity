import { MongoClient } from "mongodb";

let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
    }
    return client.db(process.env.MONGODB_DB);
}

export async function POST(req) {
    const { title, plot, fullplot, genres, cast, languages, directors, release, runtime, type } = await req.json();
    const db = await connectToDatabase();

    try{
        await db.collection('movies').insertOne({ title, plot, fullplot, genres, cast, languages, directors, release, runtime, type });
        
        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (e) {
        return new Response(JSON.stringify({ success: false }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}

export async function GET(req) {
    const db = await connectToDatabase();
    const size = parseInt(req.headers.get('Size'));

    const movies = await db.collection('movies').aggregate([
        {
            $match: { 
                'tomatoes.viewer.rating': { $exists: true }, 
                'tomatoes.critic.rating': { $exists: true } 
            } // Filtra os filmes que possuem as propriedades tomatoes.viewer.rating e tomatoes.critic.rating
        },
        {
            $sample: { size: size } // Seleciona aleatoriamente "size" documentos que atendem ao filtro
        }
    ]).toArray();
    

    console.log('====================================');
    console.log('Movies:', movies);
    console.log('====================================');

    return new Response(JSON.stringify(movies), {
        headers: { 'Content-Type': 'application/json' }
    });
}
