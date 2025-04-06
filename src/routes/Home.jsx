import React from 'react';
import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;

  // Функция для загрузки постов из API
  const fetchPosts = async (page = 0, sort = 'latest') => {
    setIsLoading(true);
    try {
      const response = await PostService.getPostsData(page, postsPerPage, sort, searchQuery);
      console.log(response);
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

  // Обработчик лайков
  const handleLike = async (postId) => {
    try {
      const response = await PostService.likePost(postId);
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
    } catch (err) {
      console.error('Ошибка при обновлении лайка:', err);
      // Откат изменений в случае ошибки
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
    }
  };

  // Обработчик поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0); // Сброс пагинации при новом поиске
  };

  // Обработчик смены страницы
  const handlePageChange = (page) => {
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
                <button 
                  className={`tab-button ${activeTab === 'popular' ? 'active' : ''}`}
                  onClick={() => setActiveTab('popular')}
                >
                  Популярные
                </button>
              </div>
              <div className="results-count">
                {filteredPosts.length} из {postsPerPage * totalPages} записей
              </div>
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
                      <PostCard key={post.id} post={post} onLike={handleLike} />
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
                         style={{ backgroundImage: `url(${post.image || 'https://via.placeholder.com/150'})` }}>
                      <div className="recommended-post-overlay">
                        <h4>{post.title}</h4>
                        <p className="location">{post.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="popular-tags-card">
              <h3 className="sidebar-title">Популярные теги</h3>
              <div className="tags-container">
                {['пляжный отдых', 'горы', 'городской туризм', 'роуд-трип', 'гастрономия', 'приключения', 'романтика', 'история'].map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="newsletter-card">
              <h3 className="sidebar-title">Подпишитесь на обновления</h3>
              <p>Получайте лучшие истории путешествий на почту</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Ваш email" required />
                <button type="submit">Подписаться</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;