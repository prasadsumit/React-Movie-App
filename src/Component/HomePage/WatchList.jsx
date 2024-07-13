import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthGuardFunction';
import MovieCard from '../Card/MovieCard';

function WatchList() {
  const [watchlist, setWatchList] = useState([]);
  const { user } = useAuth();
  const userId = user.id;

  useEffect(() => {
    axios.get(`http://localhost:3030/profile/${userId}`).then(res => {
      setWatchList(res.data.watchHistory);
    });
  }, [user]);

  const removeFromWatchlist = (movieId) => {
    // Filter out the movie with the given id from the watchlist
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchList(updatedWatchlist);
  };

  return (
    <div className="bg-gray-900 py-12 min-h-screen p-10">
      <h2 className="text-white text-3xl font-bold mb-6">Binge Your Favorite Shows Now!</h2>
      {watchlist && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie, index) => (
            <MovieCard
              key={index}
              data={movie}
              prevPage="watchlist"
              removeFromWatchlist={removeFromWatchlist} // Pass the removal function to MovieCard
            />
          ))}
        </div>
      )}
      {!watchlist.length && (
        <p className="text-white text-2xl text-center mt-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">You haven't added any movies or shows to your watchlist yet.</p>
      )}
    </div>
  );
}

export default WatchList;
