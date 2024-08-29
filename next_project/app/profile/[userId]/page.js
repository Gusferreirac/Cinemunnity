"use client";  // Adicione esta linha no topo do arquivo

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Post from '@/components/Post';

function Page({ params }) {
    const { userId } = params;
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('User data:', data);
                data.user.timestamp = new Date(data.user.timestamp).toLocaleDateString();
                setUser(data.user);
            } catch (error) {
                console.error('Fetch user error:', error);
                setError(error.message);
            }
        }
        fetchUser();
    }, [userId]);

    async function fetchUserPosts() {
        try {
            const response = await fetch(`/api/user/${userId}/posts`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log('User posts:', data);
            const today = new Date();
            data.forEach(post => {
                if(today.getDate() === new Date(post.timestamp).getDate()) {
                    post.timestamp = new Date(post.timestamp).toLocaleTimeString();
                }else {
                    post.timestamp = new Date(post.timestamp).toLocaleDateString();
                }
            });
            // Process the posts data here
            setUserPosts(data);
        } catch (error) {
            console.error('Fetch user posts error:', error);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchUserPosts();
    }, [userId]);
    

    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <div className='bg-gray-400 h-80'>
                <div className='flex flex-col space-y-4 justify-center items-center h-full'>
                    <h1 className='font-bold text-4xl text-white'>{user.name}</h1>
                    <div className='space-x-4'>
                        {user.tags.map(tag => (
                            <span className='bg-gray-300 p-2 rounded-lg' key={tag}>{tag}</span>
                        ))}
                    </div>
                    <span>Joined In: {user.timestamp}</span>
                    <button  className='bg-blue-600 hover:bg-blue-500 text-white font-bold p-2 w-80 rounded-lg'> Follow </button>
                </div>
            </div>

            <h1 className='text-center font-bold text-black text-3xl my-8'>Posts</h1>
            <div className='space-y-12'> 
                {userPosts.map(post => (
                    <Post key={post._id} post={post} username={user.name}/>
                ))}
            </div>
        </div>
    );
}

export default Page;
