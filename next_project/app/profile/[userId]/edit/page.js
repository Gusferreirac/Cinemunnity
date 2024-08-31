'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';
import Navbar from '@/components/Navbar';
import { WithContext as ReactTags, SEPARATORS,  } from 'react-tag-input';
import Loading from '@/components/LoadingScreen';

function Page({params}) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [name, setName] = useState(''); 
    const [bio, setBio] = useState(''); 
    const [tags, setTags] = useState([]);
    const userId = params.userId;

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/user/${userId}`);
                const data = await response.json();
                console.log('User data:', data);
                setUser(data.user);
                setName(data.user.name);
                setBio(data.user.bio);
                // setTags(data.user.tags);
            } catch (error) {
                console.error('Fetch user error:', error);
            }
        }
        fetchUser();
    }, [userId]);

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };
    
      const handleAddition = (tag) => {
        setTags((prevTags) => {
          return [...prevTags, tag];
        });
      };

    const handleUserChange = async () => {
        try{
            const response = await fetch(`/api/user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, bio, tagsArray: tags }),
            });

            if(response.status === 200) {
                router.push(`/profile/${userId}`);
            } else {
                console.error('Failed to complete profile');
            }
        }catch (error) {
            console.error('Failed to complete profile');
        }
    }

    if(!user) { return <Loading /> }

    return (
        <div>
            {user.name ? <Navbar /> : null}
            <div className='text-center flex flex-col h-screen'>
                <div className='my-auto'>
                    {user.name ? 
                        <>
                            <h1 className='mt-12 font-bold text-4xl mb-12'>Edit Profile</h1>
                        </>
                    :
                        <h1 className='mt-12 font-bold text-4xl mb-12'>Complete Profile</h1>
                    }
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
                            type="Bio"
                            placeholder="Bio"
                            rows={8}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <label className='mb-8' htmlFor="Bio">Biography</label>

                        <ReactTags
                                tags={tags}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}

                            />
                            <label className='mt-2'>Tags</label>
                    </form>

                    <div className='space-x-4 w-[60%] mx-auto'>
                        <button 
                        className='border border-black w-1/2 h-12 rounded-md mb-8 
                        hover:bg-black hover:text-white transition-colors'  
                        onClick={handleUserChange}>Complete Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
