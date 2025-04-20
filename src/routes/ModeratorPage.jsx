import React from 'react';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import PostService from "../services/PostService";
import '../styles/moderatorPage.css';

const ModeratorPage = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const postsPerPage = 6;

  // Загрузка постов, ожидающих модерации
  const fetchPendingPosts = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await PostService.getModeratorData("");
      if (response.status !== 200) {
        throw new Error('Не удалось загрузить посты для модерации');
      }
      
      const data = await response.data;
      setPendingPosts(prev => [...prev, ...data.content]);
      setHasMorePosts(!data.last);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик решения модератора
  const handleModerationDecision = async (postId, decision, feedback = '') => {
    try {
      await PostService.moderatePost(postId, decision, feedback);
      // Удаляем пост из списка после модерации
      setPendingPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Ошибка при отправке решения модератора:', error);
    }
  };

  // Загрузка дополнительных постов
  const loadMorePosts = () => {
    fetchPendingPosts(currentPage + 1);
  };

  useEffect(() => {
    fetchPendingPosts(0);
  }, []);

  if (isLoading && pendingPosts.length === 0) return <LoadingSpinner />;

  return (
    <div className="moderator-container">
      <h1 className="moderator-title">Панель модератора</h1>
      
      <div className="moderation-stats">
        <p>Постов на модерации: <strong>{pendingPosts.length}</strong></p>
      </div>
      
      {pendingPosts.length > 0 ? (
        <>
          <div className="pending-posts-grid">
            {pendingPosts.map(post => (
              <div key={post.id} className="pending-post-card">
                <PostCard post={post} />
                
                <div className="moderation-actions">
                  <button
                    onClick={() => handleModerationDecision(post.id, 'approved')}
                    className="moderation-button approve-button"
                  >
                    Одобрить
                  </button>
                  
                  <button
                    onClick={() => {
                      const feedback = prompt('Укажите причину отклонения:');
                      if (feedback !== null) {
                        handleModerationDecision(post.id, 'rejected', feedback);
                      }
                    }}
                    className="moderation-button reject-button"
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {hasMorePosts && (
            <div className="load-more-container">
              <button
                onClick={loadMorePosts}
                disabled={isLoading}
                className="load-more-button"
              >
                {isLoading ? 'Загрузка...' : 'Загрузить еще'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-pending-posts">
          <p>Нет постов, ожидающих модерации</p>
          <button
            onClick={() => fetchPendingPosts(0)}
            className="load-more-button"
          >
            Проверить снова
          </button>
        </div>
      )}
    </div>
  );
};

export default ModeratorPage;