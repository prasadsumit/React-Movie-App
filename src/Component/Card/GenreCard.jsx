import React from 'react';

const GenreCard = ({ name, setGenre, selectedGenre }) => {
  const handleClick = () => {
    setGenre(name);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2 mb-2  w-fit ${
        selectedGenre === name ? 'bg-red-700' : ''}`}
    >
      {name}
    </button>
  );
};

export default GenreCard;
