import React from "react";

const SearchBar = ({ setQuery }) => {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        placeholder="Search for a country"
        onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
      />
    </div>
  );
};

export default SearchBar;
