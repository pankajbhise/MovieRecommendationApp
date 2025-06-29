import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      onSearch(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSearch(''); // Clear search results
  };

  return (
    <div className="d-flex mb-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search for movies..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="btn btn-primary me-2" onClick={handleSearch}>
        Search
      </button>
      <button className="btn btn-secondary" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
