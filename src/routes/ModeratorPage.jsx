import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import PostService from "../services/PostService";
import '../styles/moderatorPage.css';

const ModeratorPage = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [decision, setDecision] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const { postId } = useParams();

  // Загрузка постов, ожидающих модерации
  const fetchPendingPosts = async () => {
    setIsLoading(true);
    try {
      const response = await PostService.getPostsData(0, 6, "moderator", search);
      if (response.status !== 200) {
        throw new Error('Не удалось загрузить посты для модерации');
      }
      setPendingPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка конкретного поста для модерации
  const fetchPostForModeration = async (id) => {
    setIsLoading(true);
    try {
      const response = await PostService.getPostForModeration(id);
      if (response.status !== 200) {
        throw new Error('Не удалось загрузить пост для модерации');
      }
      setSelectedPost(response.data);
    } catch (error) {
      console.error(error);
      navigate('/moderator');
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик решения модератора
  const handleModerationDecision = async () => {
    if (!decision) return;
    
    try {
      await PostService.moderatePost(selectedPost.id, decision, feedback);
      // После принятия решения обновляем список постов
      fetchPendingPosts();
      navigate('/moderator');
    } catch (error) {
      console.error('Ошибка при отправке решения модератора:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostForModeration(postId);
    } else {
      fetchPendingPosts();
    }
  }, [postId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="moderator-container">
      <h1 className="moderator-title">Панель модератора</h1>
      
      {postId && selectedPost ? (
        <div className="moderation-post-view">
          <div className="moderation-post-content">
            <h2>{selectedPost.title}</h2>
            <div className="post-meta">
              <span>Автор: {selectedPost.author}</span>
              <span>Дата: {new Date(selectedPost.date).toLocaleDateString()}</span>
            </div>
            
            <div className="post-image-wrapper">
              {selectedPost.image && <img src={selectedPost.image} alt={selectedPost.title} />}
              <div className="post-location">{selectedPost.location}</div>
            </div>
            
            <div className="post-text">
              {selectedPost.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="moderation-decision-panel">
            <h3>Принятие решения</h3>
            
            <div className="decision-options">
              <label className="decision-option">
                <input
                  type="radio"
                  name="decision"
                  value="approved"
                  checked={decision === 'approved'}
                  onChange={() => setDecision('approved')}
                />
                <span className="decision-label approved">Одобрить</span>
              </label>
              
              <label className="decision-option">
                <input
                  type="radio"
                  name="decision"
                  value="rejected"
                  checked={decision === 'rejected'}
                  onChange={() => setDecision('rejected')}
                />
                <span className="decision-label rejected">Отклонить</span>
              </label>
            </div>
            
            {decision === 'rejected' && (
              <div className="feedback-section">
                <label htmlFor="feedback">Причина отклонения:</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Укажите причину отклонения поста..."
                  rows={4}
                />
              </div>
            )}
            
            <div className="moderation-buttons">
              <button
                onClick={() => navigate('/moderator')}
                className="moderation-button cancel-button"
              >
                Назад
              </button>
              
              <button
                onClick={handleModerationDecision}
                disabled={!decision || (decision === 'rejected' && !feedback)}
                className={`moderation-button ${decision === 'approved' ? 'approve-button' : 'reject-button'}`}
              >
                {decision === 'approved' ? 'Подтвердить одобрение' : 'Подтвердить отклонение'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="moderation-stats">
            <p>Постов на модерации: <strong>{pendingPosts.length}</strong></p>
          </div>
          
          {pendingPosts.length > 0 ? (
            <div className="pending-posts-grid">
              {pendingPosts.map(post => (
                <div key={post.id} className="pending-post-card">
                  <PostCard post={post} />
                  <Link 
                    to={`/moderator/${post.id}`} 
                    className="moderate-button"
                  >
                    Проверить пост
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-pending-posts">
              <p>Нет постов, ожидающих модерации</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ModeratorPage;