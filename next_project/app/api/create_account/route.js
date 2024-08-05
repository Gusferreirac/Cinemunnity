import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export async function POST(req) {
    const { email, login, password } = await req.json();

    if (!email || !login || !password) {
        return new Response(JSON.stringify({ success: false, message: 'All fields are required.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
        });
    }

    try {
        await client.connect();
        const db = client.db('Cinemmunity');
        const usersCollection = db.collection('users');

        // Verificar se o email ou login já existe
        const existingUser = await usersCollection.findOne({ $or: [{ email }, { login }] });
        if (existingUser) {
            let message = '';
            if (existingUser.email === email && existingUser.login === login) {
                alert(`e-mail and login already been used`);
                message = 'Email and login already exist.';
            } else if (existingUser.email === email) {
                alert(`e-mail already been used`);
                message = 'Email already exists.';
            } else if (existingUser.login === login) {
                alert(`Login already been used`);
                message = 'Login already exists.';
            }
            return new Response(JSON.stringify({ success: false, message }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400
            });
        }

        // Inserir novo usuário
        const result = await usersCollection.insertOne({ email, login, password });
        const newUser = result.insertedId;

        console.log('User created:', newUser); // Adicione este log para depuração
        return new Response(JSON.stringify({ success: true, userId: newUser.toString() }), {
            headers: { 'Content-Type': 'application/json' },
            status: 201
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ success: false, message: 'An error occurred. Please try again later.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    } finally {
        await client.close();
    }
}
