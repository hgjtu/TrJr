import React from 'react';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import PostService from "../services/PostService";
import '../styles/moderatorPage.css';

const ModeratorPage = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка постов, ожидающих модерации
  const fetchPendingPosts = async () => {
    setIsLoading(true);
    try {
      const response = await PostService.getModeratorData("");
      if (response.status !== 200) {
        throw new Error('Не удалось загрузить посты для модерации');
      }

      setPendingPosts(response.data.content);
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

  useEffect(() => {
    fetchPendingPosts();
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
        </>
      ) : (
        <div className="no-pending-posts">
          <p>Нет постов, ожидающих модерации</p>
          <button
            onClick={() => fetchPendingPosts(0)}
            className="load-more-button"
          >
            Проверить наличие постов для модерации
          </button>
        </div>
      )}
    </div>
  );
};

export default ModeratorPage;