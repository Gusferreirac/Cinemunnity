'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('sean_bean@gameofthron.es'); // Valor de teste
    const [login, setLogin] = useState('12345'); // Valor de teste
    const [password, setPassword] = useState('1234'); // Valor de teste
    

    const handleLogin = async () => {
        if (!email || !login || !password) {
            alert('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, login, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();

                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                router.push(`/profile/${data.userId}`);
            } else {
                alert(data.message); // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleCreateAccount = async () => {
        if (!email || !login || !password) {
            alert('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/create_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, login, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                router.push(`/profile/${data.userId}/edit`);
            } else {
                alert(data.message); // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className='text-center flex flex-col h-screen'>
            <div className='my-auto'>
                <h1 className='mt-12 font-bold text-4xl mb-12'>Log In to your Account</h1>
                <form className='grid max-w-[40%] mx-auto mb-8'>
                    
                    <input
                        className='border-b-2 border-black px-3 py-1 mb-2
                        focus:outline-none focus:border-blue-500'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    
                    <input
                        className='border-b-2 border-black px-3 py-1 mb-2
                        focus:outline-none focus:border-blue-500'
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <label htmlFor="login">Login</label>
                    
                    <input 
                        className='border-b-2 border-black px-3 py-1 mb-2
                        focus:outline-none focus:border-blue-500'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </form>

                <div className='space-x-4 max-w-[40%] flex mx-auto'>
                    <button 
                    className='border border-black w-1/2 h-12 rounded-md mb-8 
                    hover:bg-black hover:text-white transition-colors'  
                    onClick={handleLogin}>
                        Login
                    </button>
                    <button 
                    className='border border-black w-1/2 h-12 rounded-md mb-8 
                    hover:bg-black hover:text-white transition-colors'  
                    onClick={handleCreateAccount}>Create Account</button>
                </div>
            </div>
        </div>
    );
}

export default Page;
