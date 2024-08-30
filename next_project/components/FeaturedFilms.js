import React from "react";
import { useState, useEffect } from "react";

function FeaturedFilms() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/api/movies/featured")
        .then((response) => response.json())
        .then((data) => setMovies(data))
    }, []);

return (
    <div className="grid grid-cols-3 mb-12 gap-x-4 p-8">
            <div className="flex">
                    <h1 className="my-auto font-bold text-3xl"> Featured Films </h1>
            </div>
            
            {movies.map((movie) => (
                    <div key={movie._id} className="grid grid-rows-1">
                            <div>
                                <img className="mb-2  h-40 w-28  ml-auto mr-auto" src={movie.poster} alt={movie.title} />
                                <h1 className="font-bold text-xl text-center mx-auto">{movie.title}</h1>
                                <p className="mt-4 text-center mx-auto">{movie.year}</p>
                                <p>{movie.plot}</p>
                            </div>
                    </div>
            ))}
    </div>
);
}

export default FeaturedFilms;