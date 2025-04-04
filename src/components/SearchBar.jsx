import React, { useState } from "react";

// Компонент поиска
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Поиск по местам, тегам или авторам..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Найти</button>
    </form>
  );
};
export default React.memo(SearchBar);