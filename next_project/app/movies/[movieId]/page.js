"use client";  // Adicione esta linha no topo do arquivo

import Loading from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input';
import ButtonBlack from '@/components/ButtonBlack';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import Post from '@/components/Post';

function Page({params}) {
    const { movieId } = params;
    const [movie, setMovie] = useState(null);
    const [title, setTitle] = useState(''); // Valor de teste
    const [content, setContent] = useState(''); // Valor de teste
    const [tags, setTags] = useState([]);
    const [review, setReview] = useState(null);
    const userId = useCookies().get('userId');
    const router = useRouter();

    console.log('Movie ID:', movieId);

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
      };
    
      const handleAddition = (tag) => {
        setTags((prevTags) => {
          return [...prevTags, tag];
        });
      };

    useEffect(() => {
        async function fetchReview() {
            if(userId === undefined || userId === null) {
                setReview(null);
                return;
            }

            try {
                const response = await fetch(`/api/user/${userId}/reviews/${movieId}`);
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
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
                console.log('Review data:', data);
                setReview(data);
                console.log('Review:', review);
            } catch (error) {
                console.error('Fetch review error:', error);
            }
        }
        fetchReview();
    }, [userId, movieId]);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(`/api/movies/${movieId}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                
                console.log('Movie data:', data);
                setMovie(data);
                console.log('Movie:', movie);
            } catch (error) {
                console.error('Fetch movie error:', error);
            }
        }
        fetchMovie();
    }
    , [movieId]);

    const handleReviewCreate = async () => {
        console.log('Creating review');
        if (!title || !content || !tags) {
            alert('All fields are required.');
            return;
        }

        console.log(userId);

        try {
            const response = await fetch(`/api/user/${userId}/reviews/${movieId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, tagsArray: tags}),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                window.location.reload();
            } else {
                alert(data.message); // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    if(review === null) {
        return <Loading />;
    }

    if (!movie === 0) {
        return <Loading />;
    }

  return (
    <div>
      <Navbar />
      <div className='flex w-full bg-gray-700 text-white p-8'>
        <div className='w-[40%] mx-auto mt-8 '>
            <div className='grid grid-cols-2'>
                <img className='max-w-[80%]' src={movie?.poster} alt={movie?.title} />
                <div className='content-center'>
                    <h1 className='font-bold text-5xl mb-4'>{movie?.title}</h1>
                    <span className='font-bold'>{movie?.year}</span>
                    <p className='mt-8 mb-4'>{movie?.plot}</p>
                    <p className='mb-2'><span className='font-bold'>Genres</span>: 
                        {movie?.genres.map((genre) => (
                            <span key={genre} className='ml-2'>{genre}</span>
                        ))}
                    </p>
                    <p className='mb-8'><span className='font-bold'>Directors</span>: 
                        {movie?.directors.map((director) => (
                            <span key={director} className='ml-2'>{director}</span>
                        ))}
                    </p>
                    <div className='grid grid-flow-col'>
                        
                        {
                            movie && 'tomatoes' in movie && 'critic' in movie.tomatoes && (
                                <p>
                                    <p className='font-bold text-xl mb-4'>Critics</p>
                                    <span className='font-bold text-4xl'>
                                        {movie?.tomatoes.critic.rating} 
                                        {movie?.tomatoes.critic.rating > 6.0 ? ' 🍅' : ' 🤢'}
                                    </span>
                                    <p>({movie?.tomatoes.critic.numReviews} reviews)</p>
                                </p>
                            )
                        }


                        {
                            movie && 'tomatoes' in movie && 'viewer' in movie.tomatoes && (
                                <p>
                                    <p className='font-bold text-xl mb-4'>Viewers</p>
                                    <span className='font-bold text-4xl'>
                                        {movie?.tomatoes.viewer.rating} 
                                        {movie?.tomatoes.viewer.rating > 6.0 ? ' 🍅' : ' 🤢'}
                                    </span>
                                    <p>({movie?.tomatoes.viewer.numReviews} reviews)</p>
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
      {userId && 
        <div className='flex flex-col mt-8 w-2/5 mx-auto mb-20'>
                <h1 className='font-bold text-2xl mb-8'>Write Review</h1>
                
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
            <ButtonBlack title='Create Post' isDisabled={false} onClick={handleReviewCreate}/>
        </div>
        }
        {review.length > 0 &&
            <div className='w-1/5 mt-8  mx-auto mb-20'>
                <h1 className='font-bold text-2xl mb-8 text-center'>Your reviews for this movie</h1>
               {review.map((review) => (
                    <Post key={review._id} post={review} username={review.user_name} />
                ))}
            </div>
        }
    </div>
  );
}

export default Page;