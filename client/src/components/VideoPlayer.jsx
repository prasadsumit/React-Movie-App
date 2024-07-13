import React from 'react';
import { useLocation } from 'react-router-dom';

const VideoPlayer = () => {
  const location = useLocation();
  const data = location.state || {};
  const netflixLink = data.netflixLink || ''; // Default to empty string if netflixLink is undefined

  const handleGoBack = () => {
    window.history.back(); // Use window.history to navigate back
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-white">{data.data.title}</h1>
        <p className="text-lg text-gray-300 mt-2">{data.data.description}</p>
        <img src={data.data.img} alt="Featured Content" className="w-full h-64 object-cover" />
        
          <div className="mt-6 aspect-w-16 aspect-h-50">
            <iframe width="800" height="500" src="https://www.youtube.com/embed/GV3HUDMQ-F8?si=4uHXmKfAkpBYsE_Z" title="YouTube video player" frameborder="0" allow="autoplay; " referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
       
       
        <button
          onClick={handleGoBack}
          className="mt-6 px-4 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
