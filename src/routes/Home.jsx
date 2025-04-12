import React from 'react';
import { useState, useEffect, useRef } from 'react';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import PostService from "../services/PostService";
import '../styles/home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  const elementRef = useRef(null);
  
  // Функция для загрузки постов из API
  const fetchPosts = async (page = 1, sort = 'latest') => {
    setIsLoading(true);
    try {
      const response = await PostService.getPostsData(page - 1, postsPerPage, sort, searchQuery);
      if (response.status != 200) {
        throw new Error('Не удалось загрузить посты');
      }
      
      const data = await response.data;
      setPosts(data.content);
      setFilteredPosts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  // Загрузка постов при монтировании и изменении параметров
  useEffect(() => {
    fetchPosts(currentPage, activeTab);
  }, [activeTab, searchQuery]);

  // Обработчик поиска
  const handleSearch = (query) => {
    const searchParams = [];
    if (query.title) searchParams.push(`title=${encodeURIComponent(query.title)}`);
    if (query.author) searchParams.push(`author=${encodeURIComponent(query.author)}`);
    if (query.date) searchParams.push(`date=${encodeURIComponent(query.date)}`);
    
    setSearchQuery(searchParams.join('&'));
    setCurrentPage(1); // Сброс пагинации при новом поиске
  };

  // Обработчик смены страницы
  const handlePageChange = (page) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrentPage(page);
    fetchPosts(page, activeTab);
  };

  // Рекомендуемые посты
  const recommendedPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="travel-feed-container">
      <div className="hero-section">
        <h1>Откройте для себя мир</h1>
        <p>Вдохновляющие истории путешествий со всего света</p>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div ref={elementRef}></div>
      <div className="main-content-wrapper">
        <div className="main-content">
          <div className="feed-section">
            <div className="tabs-container">
              <div className="tabs">
                <button 
                  className={`tab-button ${activeTab === 'latest' ? 'active' : ''}`}
                  onClick={() => setActiveTab('latest')}
                >
                  Последние
                </button>
                {/* <button 
                  className={`tab-button ${activeTab === 'subscriptions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('subscriptions')}
                >
                  Подписки
                </button> */}
                <button 
                  className={`tab-button ${activeTab === 'my-posts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('my-posts')}
                >
                  Мои записи
                </button>
              </div>
              {/* <div className="results-count">
                {filteredPosts.length} из {posts.length} записей
              </div> */}
            </div>

            {isLoading ? (
              <div className="loading-container">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                <div className="posts-grid">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <PostCard key={post.id} post={post}/>
                    ))
                  ) : (
                    <div className="no-results">
                      <h3>Ничего не найдено</h3>
                      <p>Попробуйте изменить критерии поиска</p>
                    </div>
                  )}
                </div>

                {filteredPosts.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>

          <aside className="sidebar">
            <div className="recommendations-card">
              <h3 className="sidebar-title">Рекомендуем посетить</h3>
              <div className="recommended-posts">
                {recommendedPosts.map(post => (
                  <div key={post.id} className="recommended-post">
                    <div className="recommended-post-image" 
                         style={{ backgroundImage: `url(${post.image})` }}>
                      <div className="recommended-post-overlay">
                        <h4>{post.title}</h4>
                        <p className="location">{post.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;