import clientPromise from '../../../lib/mongodb'; // Certifique-se de que o caminho esteja correto

export async function POST(req) {
    const { email, login, password } = await req.json();

    const client = await clientPromise;
    const db = client.db('Cinemmunity'); // Use o nome do seu banco de dados

    // Verificar se o usuário já existe
    const existingUser = await db.collection('users').findOne({ login });

    if (existingUser) {
        // Usuário já existe, redirecionar para o perfil
        return new Response(JSON.stringify({ success: true, redirectTo: `/profile/${login}` }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } else {
        // Criar novo usuário
        await db.collection('users').insertOne({ email, login, password });
        return new Response(JSON.stringify({ success: true, redirectTo: `/profile/${login}` }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    }
}
