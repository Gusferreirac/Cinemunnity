export async function POST(req) {
    const { title, plot, fullplot, genres, cast, languages, directors, release, runtime, type } = await req.json();

    const client = await clientPromise;
    const db = client.db('Cinemmunity');

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