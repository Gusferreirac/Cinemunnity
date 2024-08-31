'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import Navbar from '@/components/Navbar';

function Page() {
    const router = useRouter();
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState(''); 
    const userId = useCookies().get('userId');

    const handleCreateCommunity = async () => {
        if (!name || !description) {
            alert('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/communities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, creation_date: new Date().toISOString(), creator: userId}),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                router.push(`/community/${data.communityId}`);
            } else {
                alert(data.message); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <div className='text-center flex flex-col h-screen'>
            <Navbar />
            <div className='my-auto'>
                <h1 className='mt-12 font-bold text-4xl mb-12'>Create Community</h1>
                <form className='grid max-w-[40%] mx-auto mb-8'>
                    
                    <input
                        className='border-b-2 border-black px-3 py-1 mb-2
                        focus:outline-none focus:border-blue-500'
                        type="Name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="Name">Name</label>
                    
                    <textarea 
                        className='border-b-2 border-black px-3 py-1 mb-2
                        focus:outline-none focus:border-blue-500'
                        type="Description"
                        placeholder="Description"
                        rows={8}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="Description">Description</label>
                </form>

                <div className='space-x-4 w-[60%] mx-auto'>
                    <button 
                    className='border border-black w-1/2 h-12 rounded-md mb-8 
                    hover:bg-black hover:text-white transition-colors'  
                    onClick={handleCreateCommunity}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default Page;
