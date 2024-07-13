import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../Card/Toast';
import '../../App.css';
import { useAuth } from '../Auth/AuthGuardFunction';

function MovieCard({ data, prevPage, removeFromWatchlist }) {
  const [toastModal, setToastModal] = useState(false);
  const [toastData, setToastData] = useState({
    color: "",
    message: "" 
  });

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3030/profile/${user.id}`);
          const userProfile = response.data;
          const movieIndex = userProfile.watchHistory.findIndex(movie => movie.id === data.id);
          
          setIsInWatchlist(movieIndex !== -1);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
      user && console.log("new user data" + user.SubscriptionType);
    }
  }, [user, data.id]);

  const handleWatchList = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/profile/${user.id}`);
      const userProfile = response.data;
      const movieIndex = userProfile.watchHistory.findIndex(movie => movie.id === data.id);

      if (movieIndex === -1) {
        userProfile.watchHistory.push(data);
        await axios.put(`http://localhost:3030/profile/${user.id}`, userProfile)
        console.log('Movie added to watchlist successfully.');
        setToastData({ color: "green", message: "Movie Added to WatchList" });
        setToastModal(true);
        setTimeout(() => {
          setToastModal(false);
        }, 3000);
      } else {
        userProfile.watchHistory.splice(movieIndex, 1);
        await axios.put(`http://localhost:3030/profile/${user.id}`, userProfile);
        console.log('Movie removed from watchlist successfully.');
        setToastData({ color: "red", message: "Movie Removed from WatchList" });
        setToastModal(true);
        setTimeout(() => {
          setToastModal(false);
        }, 3000);
        if (prevPage === "watchlist") {
          removeFromWatchlist(data.id); // Call removeFromWatchlist function if prevPage is "watchlist"
        }
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const buttonExample = () => {
    if (user && user.SubscriptionType !== "" && data.plan === "free") {
      return <Link to={"/player"} state={{ data: data }} className='block mt-4 px-4 py-2 bg-red-700 text-white font-bold text-center rounded-md hover:bg-red-600'>Watch Now</Link>;
    } else if (user && user.SubscriptionType === "" && data.plan === "free") {
      return <Link to={"/player"} state={{ data: data }} className='block mt-4 px-4 py-2 bg-red-700 text-white font-bold text-center rounded-md hover:bg-red-600'>Watch Now</Link>;
    } else if (user && user.SubscriptionType === "" && data.plan === "paid") {
      return <Link to={"/Subscription"} className='block mt-4 px-4 py-2 bg-yellow-700 text-white font-bold text-center rounded-md hover:bg-yellow-600'>Subscribe to watch!</Link>;
    } else if (user && user.SubscriptionType !== "" && data.plan === "paid") {
      return <Link to={"/player"} state={{ data: data }} className='block mt-4 px-4 py-2 bg-red-700 text-white font-bold text-center rounded-md hover:bg-red-600'>Watch Now</Link>;
    } else {
      return <Link to={user ? "/Subscription" : "/login"} className='block mt-4 px-4 py-2 bg-yellow-700 text-white font-bold text-center rounded-md hover:bg-yellow-600'>{user ? "Subscribe to watch!" : "Login to watch"}</Link>;
    }
  };

  return (
    <div>
      {toastModal && <Toast data={toastData}></Toast>}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img src={data.img} alt="Featured Content" className="w-full h-64 object-cover" />
        <div className="p-4">
          <div className='flex justify-between'>
            <h3 className="text-xl font-bold mb-2 text-white">{data.title}</h3>
            {user && (
              <button
                title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                onClick={handleWatchList}
                className=' w-8 h-8 flex justify-center items-center'
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isInWatchlist ? "red" : "gray"}
                  viewBox="0 0 24 24"
                  stroke={isInWatchlist ? "red" : "gray"}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-gray-400 text-md mb-2 overflow-scroll desc-overflowed text-justify">{data.genre} &nbsp; {data.duration}</p>
          <p className="text-white text-md  h-32 overflow-scroll desc-overflowed text-left">{data.description}</p>
          {buttonExample()}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
