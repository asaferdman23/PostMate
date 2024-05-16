import React from 'react';
import SearchIcon from '@mui/icons-material/Search'; // Assuming you are using Material-UI
import InputBase from '@mui/material/InputBase';
import '../assets/css/index.css';


function SearchBar({ searchText }) {
  return (
    <div className="search">
      <SearchIcon />
      <InputBase
        placeholder="Search mail"
        value={searchText}
        // onChange={handleSearchTextChange}
        classes={{ root: 'search-input' }} // Apply additional specific styles if needed
      />
    </div>
  );
}

export default SearchBar;
