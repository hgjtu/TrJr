import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/postPage.css';
import PostService from "../services/PostService";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      const response = await PostService.getPostData(postId);
      var foundPost = response.data;

      setPost(foundPost);
      if (foundPost) {
        setEditedPost({ ...foundPost });
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

  const handleSave = async () => {
    try {
      const response = await PostService.updatePostData(editedPost.id, editedPost.title,
        editedPost.location, editedPost.description);
      setPost(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await PostService.deletePost(postId);
      alert('Пост удален!');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await PostService.likePost(postId);
      setPost(post => {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: response.data,
          };
      });
    } catch (error) {
      console.error('Ошибка при попытке лайка поста:', error);
    }
  };

  if (!post) return <div className="loading">Загрузка...</div>;

  const isAuthor = post.author === user.username;

  return (
    <div className="full-post">      
      {isAuthor && !isEditing && (
        <div className="post-actions">
          <button onClick={() => setIsEditing(true)} className="edit-button">Редактировать</button>
          <button onClick={handleDelete} className="delete-button">Удалить</button>
        </div>
      )}
      
      {isEditing ? (
        <div className="edit-post-form">
          <div className="form-group">
            <label>Заголовок</label>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Местоположение</label>
            <input
              type="text"
              name="location"
              value={editedPost.location}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={editedPost.description}
              onChange={handleInputChange}
              rows="5"
            />
          </div>
          
          <div className="form-group">
            <label>Изображение (URL)</label>
            <input
              type="text"
              name="image"
              value={editedPost.image || ''}
              onChange={handleInputChange}
            />
          </div>
          
          {/* <div className="form-group">
            <label>Теги (через запятую)</label>
            <input
              type="text"
              name="tags"
              value={editedPost.tags ? editedPost.tags.join(',') : ''}
              onChange={handleInputChange}
            />
          </div> */}
          
          <div className="form-buttons">
            <button onClick={handleSave} className="save-button">Сохранить</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Отмена</button>
          </div>
        </div>
      ) : (
        <>
          <Link to="/" className="back-button">← Назад к ленте</Link>
          <div className="full-post-image-container">
            {post.image && <img src={post.image} alt={post.title} />}
            <div className="full-post-location">{post.location}</div>
          </div>
          
          <div className="full-post-content">
            <h1>{post.title}</h1>
            <div className="full-post-meta">
              <span className="author">{post.author}</span>
              <span className="date">{new Date(post.date).toLocaleDateString()}</span>
            </div>
            
            <div className="full-post-text">
              {post.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            
            {/* {post.tags && (
              <div className="full-post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )} */}
            
            <div className="full-post-actions">
              <button onClick={handleLike} className={`like-button ${post.isLiked ? 'liked' : ''}`}>
                ❤️ {post.likes}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(PostPage);