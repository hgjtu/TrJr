import React, { useState } from "react";
import "../styles/searchBar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = ({ onSearch }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = {
      author: author.trim(),
      title: title.trim(),
      location: location.trim(),
      startDate: startDate ? startDate.toISOString().split('T')[0] : '',
      endDate: endDate ? endDate.toISOString().split('T')[0] : ''
    };
    onSearch(searchQuery);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-grid">
        <div className="search-field">
          <label htmlFor="author">Автор</label>
          <input
            id="author"
            type="text"
            placeholder="Поиск по автору..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        
        <div className="search-field">
          <label htmlFor="title">Название</label>
          <input
            id="title"
            type="text"
            placeholder="Поиск по названию..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="search-field">
          <label htmlFor="location">Место</label>
          <input
            id="location"
            type="text"
            placeholder="Поиск по месту..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="search-field date-range-field">
          <label>Дата публикации (от - до)</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            placeholderText="Выберите диапазон дат"
            dateFormat="dd.MM.yyyy"
            maxDate={new Date()}
            className="date-picker-input"
          />
        </div>
      </div>
      
      <button type="submit" className="search-button">
        Найти
      </button>
    </form>
  );
};

export default React.memo(SearchBar);