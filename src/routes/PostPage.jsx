import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/postPage.css';
import "../styles/createPostPage.css";
import PostService from "../services/PostService";
import LoadingSpinner from '../components/LoadingSpinner';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isResubmitting, setIsResubmitting] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      const response = await PostService.getPostData(postId);
      const foundPost = response.data;
      setPost(foundPost);
      if (foundPost) {
        setEditedPost({ ...foundPost });
        setImagePreview(foundPost.image);
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных поста:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',') : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await PostService.updatePostData(
        editedPost.id, 
        editedPost.title,
        editedPost.location,
        editedPost.description,
        selectedImage
      );
      setPost(response.data);
      setIsEditing(false);
      setSelectedImage(null);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await PostService.deletePost(postId);
      setShowDeleteModal(false);
      alert('Пост удален!');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleLike = async () => {
    try {
      const response = await PostService.likePost(postId);
      setPost(post => ({
        ...post,
        isLiked: !post.isLiked,
        likes: response.data,
      }));
    } catch (error) {
      console.error('Ошибка при попытке лайка поста:', error);
    }
  };

  const handleResubmit = async () => {
    try {
      setIsResubmitting(true);
      await PostService.resubmitPost(postId);
      alert('Пост отправлен на повторную модерацию!');
      fetchPostData();
    } catch (error) {
      console.error('Ошибка при повторной отправке поста:', error);
      alert('Не удалось отправить пост на модерацию');
    } finally {
      setIsResubmitting(false);
    }
  };

  if (!post) return <LoadingSpinner />;

  const isAuthor = user && user.username && post && post.author === user.username;
  const isDenied = post.status === 'STATUS_DENIED';

  return (
    <div className="post-container">
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Подтверждение удаления</h3>
            <p>Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.</p>
            <div className="modal-buttons">
              <button 
                onClick={handleDeleteCancel}
                className="modal-button cancel-button"
              >
                Отмена
              </button>
              <button 
                onClick={handleDeleteConfirm}
                className="modal-button delete-button"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {isDenied && (
        <div className="denied-banner">
          <div className="denied-content">
            <span className="denied-text">Пост отклонен модератором</span>
            {isAuthor && (
              <button 
                onClick={handleResubmit} 
                className="resubmit-button"
                disabled={isResubmitting}
              >
                {isResubmitting ? 'Отправка...' : 'Отправить повторно'}
              </button>
            )}
          </div>
        </div>
      )}

      {isAuthor && !isEditing && (
        <div className="post-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">Редактировать</button>
          <button onClick={handleDeleteClick} className="btn-delete">Удалить</button>
        </div>
      )}
      
      {isEditing ? (
        <div className="create-post-wrapper">
          <div className="create-post-container">
            <h2 className="create-post-title">Редактировать пост</h2>
            
            <div className="create-post-content">
              <div className="create-post-form">
                <input
                  className="create-post-input"
                  name="title"
                  value={editedPost.title}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Заголовок*"
                  required
                />
                
                <input
                  className="create-post-input"
                  name="location"
                  value={editedPost.location}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Местоположение*"
                  required
                />
                
                <textarea
                  className="create-post-textarea"
                  name="description"
                  value={editedPost.description}
                  onChange={handleInputChange}
                  placeholder="Описание*"
                  rows={5}
                  required
                />
                
                <div className="image-upload-container">
                  <label className="image-upload-label">
                    Загрузить новое изображение
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-upload-input"
                    />
                  </label>
                </div>
                
                <div className="form-buttons" style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="create-post-button" 
                    onClick={handleSave}
                    disabled={!editedPost.title || !editedPost.location || !editedPost.description}
                    style={{ flex: 1 }}
                  >
                    Сохранить
                  </button>
                  
                  <button 
                    className="create-post-button" 
                    onClick={() => setIsEditing(false)}
                    style={{ 
                      flex: 1,
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </div>
              
              <div className="image-preview-section">
                <h3 className="preview-title">Предпросмотр изображения</h3>
                <div className="image-preview-container">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Предпросмотр" className="preview-image" />
                  ) : (
                    <div className="no-image-placeholder">
                      Изображение не выбрано
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => navigate(-1)} className="back-link">← Назад</button>
          
          <div className="post-image-wrapper">
            {post.image && <img src={post.image} alt={post.title} className={isDenied ? 'denied-image' : ''} />}
            <div className="post-location">{post.location}</div>
          </div>
          
          <div className="post-content">
            <h1>{post.title}</h1>
            
            <div className="post-meta">
              <span>Автор: {post.author}</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            
            <div className="post-text">
              {post.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            
            <div className="post-footer">
              <button 
                onClick={handleLike} 
                className={`btn-like ${post.isLiked ? 'active' : ''}`}
                disabled={isDenied}
              >
                Нравится ({post.likes})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(PostPage);