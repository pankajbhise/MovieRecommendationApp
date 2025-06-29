import React from 'react';

const MovieCard = ({ movie, onClick, onFavorite }) => {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="card shadow-sm"
      style={{
        width: '200px',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="card-img-top"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body p-2">
        <h6 className="card-title mb-1">{movie.title}</h6>
        <p className="card-text mb-1"><small className="text-muted">Year: {movie.year}</small></p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite(movie);
        }}
        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
      >
        ❤️
      </button>
    </div>
  );
};

export default MovieCard;
