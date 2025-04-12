import React, { useState } from "react";
import "../styles/searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = {
      author: author.trim(),
      title: title.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim()
    };
    onSearch(searchQuery);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-fields">
        <div className="text-fields">
          <div className="search-field">
            <label htmlFor="title">Автор</label>
            <input
              id="title"
              type="text"
              placeholder="Поиск по автору..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="search-field">
            <label htmlFor="author">Место</label>
            <input
              id="author"
              type="text"
              placeholder="Поиск по месту..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>
        
        <div className="date-range-fields">
          <div className="search-field">
            <label htmlFor="startDate">Дата от</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="search-field">
            <label htmlFor="endDate">Дата до</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>
      </div>
      
      <button type="submit" className="search-button">
        Найти
      </button>
    </form>
  );
};

export default React.memo(SearchBar);