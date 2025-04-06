import React from 'react';
import '../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Определяем диапазон отображаемых страниц
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Максимальное количество видимых номеров страниц
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = endPage - maxVisiblePages + 1;
      }
      
      // Всегда показываем первую страницу
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      // Основной диапазон
      for (let i = startPage; i <= endPage; i++) {
        if (i >= 1 && i <= totalPages) {
          pages.push(i);
        }
      }
      
      // Всегда показываем последнюю страницу
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <button
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      
      {pageNumbers.map((number, index) => (
        <React.Fragment key={index}>
          {number === '...' ? (
            <span className="pagination-ellipsis">...</span>
          ) : (
            <button
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          )}
        </React.Fragment>
      ))}
      
      <button
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;