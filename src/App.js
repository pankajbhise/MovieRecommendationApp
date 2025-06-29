import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import 'bootstrap/dist/css/bootstrap.min.css';


const API_KEY = '614baa27'; // replace with your OMDb API key

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  

useEffect(() => {
  fetchMovies(searchTerm, currentPage);
}, [searchTerm, currentPage]);


const fetchMovies = async (query, page = 1) => {
  setLoading(true);
  setError('');
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'True') {
      const results = data.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image',
      }));
      setMovies(results);
      setTotalResults(parseInt(data.totalResults)); // save total results
    } else {
      setMovies([]);
      setError('No movies found. Try another search!');
      setTotalResults(0);
    }
  } catch (err) {
    setError('Something went wrong. Please try again later.');
    setMovies([]);
    setTotalResults(0);
  }
  setLoading(false);
};


  const fetchMovieDetails = async (id) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === 'True') {
      setSelectedMovie(data);
    }
  };

  const handleMovieClick = (id) => {
    fetchMovieDetails(id);
  };

  const handleCloseModal = () => setSelectedMovie(null);

  const handleFavorite = (movie) => {
    const isAlreadyFavorite = favorites.find((fav) => fav.id === movie.id);
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleSearchTermChange = (term) => {
  setSearchTerm(term);
  setCurrentPage(1); // reset to first page on new search
};


  return (
    <div className="App">
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">
            🎬 Movie Recommendation App
          </a>
        </div>
      </nav>

      <div className="container">
      <SearchBar onSearch={handleSearchTermChange} />



  {loading && (
    <div className="text-center my-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )}

  {error && (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  )}

  <h2 className="my-4">Search Results</h2>
  {!loading && movies.length > 0 && (
  <nav className="my-4">
    <ul className="pagination justify-content-center">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      <li className="page-item disabled">
        <span className="page-link">
          Page {currentPage} of {Math.ceil(totalResults / 10)}
        </span>
      </li>
      <li className={`page-item ${currentPage >= Math.ceil(totalResults / 10) ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= Math.ceil(totalResults / 10)}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
)}

  <MovieList movies={movies} onMovieClick={handleMovieClick} onFavorite={handleFavorite} />

  <h2 className="my-4 d-flex align-items-center justify-content-between">
  My Favorites
  {favorites.length > 0 && (
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => {
        setFavorites([]);
        localStorage.removeItem('favorites');
      }}
    >
      Clear Favorites
    </button>
  )}
</h2>

  
  {favorites.length > 0 ? (
    <MovieList movies={favorites} onMovieClick={handleMovieClick} onFavorite={() => {}} />
  ) : (
    <p>No favorites yet. Click ❤️ on a movie to add!</p>
  )}
</div>


      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
