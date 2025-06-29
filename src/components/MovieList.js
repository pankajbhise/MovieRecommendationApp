import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onMovieClick, onFavorite }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center'
    }}>
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} onClick={onMovieClick} onFavorite={onFavorite} />
      ))}
    </div>
  );
};

export default MovieList;
