'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Loading from '@/components/LoadingScreen';
import { useRouter } from 'next/navigation'; // Não estava importado no seu código

function Page() {
    const [movies, setMovies] = useState(null);
    const router = useRouter(); // Adiciona o router

    //Get movies
    useEffect(() => {
        async function getMovies() {
            try {
                const response = await fetch('/api/movies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Size': 100
                    },
                });
                
                if (!response.ok) { // Verifica se a resposta é ok
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

    const goToMovie = (movieId) => () => {
        router.push(`/movies/${movieId}`);
    };

    if (!movies) return <Loading />;

    return(
        <div className='flex'>
            <div className='w-4/5 mx-auto'>
                <Navbar />
                <h1 className='font-bold text-center mt-8 mb-8 text-2xl'>Movies</h1>
                <div className='grid grid-cols-5 gap-8 '> {/* Define 5 colunas */}
                    { movies.slice(0, 100).map(movie => (/* Ajuste o slice para mostrar mais filmes, se desejar */
                        <div key={movie._id} className='flex flex-col gap-4 mb-20'>
                            <img src={movie.poster ? movie.poster : 'poster404.jpg'} alt={movie.title} className='w-full h-64 object-contain mb-4 text-center'/>
                            <h1 className='font-bold text-center'>{movie.title}</h1>
                            <p className='text-center'>{movie.year}</p>
                            <p className='text-justify text-gray-600 p-6'>{movie.plot}</p>
                            <a onClick={goToMovie(movie._id)} className='text-center text-blue-500 font-bold hover:cursor-pointer hover:underline mt-auto'>See more</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;
