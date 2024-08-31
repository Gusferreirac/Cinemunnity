'use client';

import { useState, useEffect } from 'react';
import ButtonBlack from '@/components/ButtonBlack';
import Post from '@/components/Post';
import { useCookies } from 'next-client-cookies';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import Navbar from '@/components/Navbar';
import Loading from '@/components/LoadingScreen';
import Card from '@/components/CommunityCard';

function Posts(){
    const [title, setTitle] = useState(''); // Valor de teste
    const [content, setContent] = useState(''); // Valor de teste
    const [tags, setTags] = useState([]);
    const [movies, setMovies] = useState(null);
    const [communities, setCommunities] = useState(null);
    const [posts, setPosts] = useState(null);
    const userId = useCookies().get('userId');

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };
    
      const handleAddition = (tag) => {
        setTags((prevTags) => {
          return [...prevTags, tag];
        });
      };

    //Get movies
    useEffect(() => {
        async function getMovies() {
            try {
                const response = await fetch('/api/movies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Size': 10
                    },
                });
                
                if (!response) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMovies(data);

                

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
        
        getMovies();
    }, []);

    //Get communities
    useEffect(() => {
        async function getCommunities() {
            try {
                const response = await fetch('/api/communities', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Size': 10
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setCommunities(data);

                

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
        
        getCommunities();
    }, []);

    //Get posts
    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch('/api/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const today = new Date();
                data.forEach(post => {
                    if(today.getDate() === new Date(post.timestamp).getDate()) {
                        post.timestamp = new Date(post.timestamp).toLocaleTimeString();
                    }else {
                        post.timestamp = new Date(post.timestamp).toLocaleDateString();
                    }
                });
                setPosts(data);

                

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
        
        getPosts();
    }, []);

    const handleCreatePost = async () => {
        console.log('Create Post');
        
        if (!title || !content || !tags) {
            alert('All fields are required.');
            return;
        }

        console.log(userId);

        try {
            const response = await fetch(`/api/user/${userId}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, tagsArray: tags, creation_date: new Date() }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                router.push(`/feed`);
            } else {
                alert(data.message); // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    if (!posts || !movies || !communities) return <Loading />;

    return (
        <>
            <Navbar />
            <div className='w-full grid grid-cols-3 gap-8'>
                <div className='bg-gray-200 h-full'>
                    <h1 className='font-bold text-center mt-8 mb-8 text-2xl'>Movies</h1>
                    <div className='grid grid-flow-row gap-8'>
                        { movies ?
                            movies.map((movie) => (
                                <div key={movie._id} className='flex flex-col gap-4'>
                                    <h1 className='font-bold text-center'>{movie.title}</h1>
                                    <p className='text-center'>{movie.year}</p>
                                    <p className='text-justify text-gray-600 p-6'>{movie.plot}</p>
                                    <img src={movie.poster} alt={movie.title} className='w-full h-64 object-contain mb-4'/>
                                    <hr className='border-gray-300'/>
                                </div>
                            ))
                        : <span className='text-center font-bold text-gray-400'>Loading...</span> }
                    </div>
                </div>
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
                <hr className='border-gray-400 mt-8'/>
                <div className='mt-8 space-y-8'>
                    { posts ? 
                        posts.map((post) => (
                            <Post key={post._id} post={post} username={post.user_name}/>
                        ))
                    : <span className='text-center font-bold text-gray-400'>Loading...</span> }
                </div>
                </div>
                <div className='bg-gray-200 h-full'>
                <h1 className='font-bold text-center mt-8 mb-8 text-2xl'>Communities</h1>
                    <div className='grid grid-flow-row gap-8 p-8'>
                        { communities ?
                            communities.map((community) => (
                               <Card key={community._id} community={community}/>
                            ))
                        : <span className='text-center font-bold text-gray-400'>Loading...</span> }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Posts;