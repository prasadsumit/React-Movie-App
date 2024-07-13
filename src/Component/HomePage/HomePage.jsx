import React, { useEffect, useState } from 'react';

import axios from 'axios';
import GenreCard from '../Card/GenreCard'
import { useAuth } from '../Auth/AuthGuardFunction';
import MovieCard from '../Card/MovieCard';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {user} = useAuth()
  useEffect(() => {
    axios.get("http://localhost:3030/Channel")
      .then(res => {
        let filteredData = res.data;

        // Filter by selected genre
        if (selectedGenre !== "All") {
          filteredData = filteredData.filter(movie =>
            movie.genre.toLowerCase() === selectedGenre.toLowerCase()
          );
        }

        // Filter by search query
        if (searchQuery) {
          filteredData = filteredData.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setFilteredMovies(filteredData);
        setLoading(false);
        

      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [searchQuery, selectedGenre , user]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };
  const genreList = [
    "Comedy",
    "Sci-Fi",
    "Crime",
    "Drama",
    "Animation",
    "Action",
    "Adventure",
    "Fantasy",
    "Horror"
  ]
  ;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Genre selection */}
        <div className="mb-4 flex gap-4 flex-wrap">
          <GenreCard key="All" setGenre={handleGenreChange} name="All" selectedGenre={selectedGenre} />
          {genreList.map(gen => (
            <GenreCard key={gen} setGenre={handleGenreChange} name={gen} selectedGenre={selectedGenre} />
          ))}
        </div>

        {/* Movie display */}
        {loading ? (
          <p className="text-xl">Loading...</p>
        ) : error ? (
          <p className="text-xl">Error: {error.message}</p>
        ) : (
          filteredMovies.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} data={movie}/>
              ))}
            </div>
          ) : <p className="text-xl text-red-500 text-center">No movies found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
