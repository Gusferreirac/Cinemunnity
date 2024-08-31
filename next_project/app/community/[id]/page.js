"use client";  // Adicione esta linha no topo do arquivo

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Post from '@/components/Post';
import Navbar from '@/components/Navbar';
import Loading from '@/components/LoadingScreen';
import { useCookies } from 'next-client-cookies';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import ButtonBlack from '@/components/ButtonBlack';

function Page({ params }) {
    const { id } = params;
    const userId = useCookies().get('userId');
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [community, setCommunity] = useState({});
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(''); // Valor de teste
    const [content, setContent] = useState(''); // Valor de teste
    const [tags, setTags] = useState([]);

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };
    
      const handleAddition = (tag) => {
        setTags((prevTags) => {
          return [...prevTags, tag];
        });
      };

    const joinCommunity = async () => {
        try {
            const response = await fetch(`/api/communities/${id}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if(response.status == 200){
                alert('You have joined the community!!');
                router.reload();
            } 

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    const handleCreatePost = async () => {
        console.log('Create Post');
        
        if (!title || !content || !tags) {
            alert('All fields are required.');
            return;
        }

        console.log(userId);

        try {
            const response = await fetch(`/api/communities/${id}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, tagsArray: tags, userId ,creation_date: new Date() }),
            });

            const data = await response.json().then((data) => {
                if(data.success){
                    alert('Post created successfully');
                    window.location.reload();
                } else {
                    alert('An error occurred. Please try again later.');
                }
            });

            console.log(data);

            
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    
    useEffect(() => {
        async function fetchCommunity() {
            try {
                const response = await fetch(`/api/communities/${id}`);
                
                const data = await response.json();
                console.log(data);

                data.timestamp = new Date(data.timestamp).toLocaleDateString();

                if('posts' in data){
                    const today = new Date();

                    data.posts.forEach(post => {
                        if(today.getDate() === new Date(post.timestamp).getDate()) {
                            post.timestamp = new Date(post.timestamp).toLocaleTimeString();
                        }else {
                            post.timestamp = new Date(post.timestamp).toLocaleDateString();
                        }
                    });
                }
                
                setCommunity(data);
                
                
            } catch (error) {
                console.error('Fetch user error:', error);
                setError(error.message);
            }
        }
        fetchCommunity();
    }, [id]);

    
    if(!community || !community.users) { return <Loading />; }
    

    return (
        <div>
            <Navbar />
            <div className='bg-gray-400 h-80'>
                <div className='flex flex-col space-y-4 justify-center items-center h-full'>
                    <h1 className='font-bold text-4xl text-white'>{community.name}</h1>
                    <h2 className='text-center text-white text-xl font-bold'>{community.users.length} members</h2>
                    <p className='text-center text-white'>{community.description}</p>
                    <span>Joined In: {community.timestamp}</span>
                </div>
            </div>

            {community.users.includes(userId) ? 
                <div className='w-[40%] mx-auto'>
                    <div className='flex flex-col mt-8'>
                        <h1 className='font-bold text-2xl mb-8'>Shares your thoughts</h1>
                        
                        <form className='flex flex-col gap-4 mb-8'>
                            <input 
                                className='border border-black px-3 py-1 focus:outline-none rounded-md'
                                placeholder='Title' 
                                type="text" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />

                            <textarea 
                                className='border border-black px-3 py-1 focus:outline-none rounded-md'
                                placeholder='Content' 
                                value={content} 
                                rows={8}
                                onChange={(e) => setContent(e.target.value)} 
                            />
                            <ReactTags
                                tags={tags}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}

                            />
                        </form>
                        <ButtonBlack title='Create Post' isDisabled={false} onClick={handleCreatePost}/>
                    </div>
                </div>
            : 
                <div className='w-[40%] mx-auto'>
                    <div className='flex flex-col mt-8'>
                        <h1 className='font-bold text-center text-2xl mb-4'>Join {community.name}</h1>
                        <span className='text-center text-lg mb-8'>Join the community to share your thoughts and connect with other members.</span>
                        <ButtonBlack title={'Join Community'} isDisabled={false} onClick={joinCommunity}/>
                    </div>
                </div>
            }

            <hr className='border-gray-400 w-2/3 mx-auto my-8'/>

            <h1 className='text-center font-bold text-black text-3xl my-8'>Posts</h1>
            {'posts' in community ?
                <>
                {community.posts.length === 0  ? 
                    <p className='text-center text-lg mb-8'>No posts yet.</p>
                :
                    <div className='space-y-12 max-w-[40%] mx-auto'> 
                        {community.posts.map(post => (
                            <Post key={post._id} post={post} username={post.user_name}/>
                        ))}
                    </div>
                }
                </>
            : <p className='text-center text-lg mb-8'>No posts yet.</p>}
        </div>
    );
}

export default Page;
