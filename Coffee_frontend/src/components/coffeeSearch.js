import React from "react";

const CoffeeSearch = ({
  searchOptions,
  selectedOption,
  setSearchOption,
  searchName,
  setSearchName,
}) => {
  return (
    <div>
      <label htmlFor="search">Search:</label>
      <select
        id="search"
        value={selectedOption}
        onChange={(e) => setSearchOption(e.target.value)}
      >
        {searchOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={() => setSearchName("")}>Clear</button>
    </div>
  );
};

export default CoffeeSearch;
