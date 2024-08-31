"use client";  // Adicione esta linha no topo do arquivo

import Loading from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

function Page({params}) {
    const { movieId } = params;
    const [movie, setMovie] = useState(null);

    console.log('Movie ID:', movieId);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(`/api/movies/${movieId}`);
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

    if (!movie) {
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
                    {
                        movie && 'tomatoes' in movie && 'critic' in movie.tomatoes && (
                            <p>
                                <span className='font-bold text-4xl'>
                                    {movie?.tomatoes.critic.rating} 
                                    {movie?.tomatoes.critic.rating > 6.0 ? ' 🍅' : ' 🤢'}
                                </span>
                                <p>({movie?.tomatoes.critic.numReviews} reviews)</p>
                            </p>
                        )
                    }
                    
                </div>
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default Page;