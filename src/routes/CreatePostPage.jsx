import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/postPage.css';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState({
      title: '',
      location: '',
      description: '',
      image: '',
    //   tags: [],
      author: currentUser,
      date: new Date().toISOString(),
      likes: 0,
      isLiked: false
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPost(prev => ({
        ...prev,
        [name]: name === 'tags' ? value.split(',') : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // В реальном приложении здесь был бы запрос к API для создания поста
      alert('Пост создан!');
      navigate('/');
    };
  
    return (
      <div className="create-post-page">
        <Link to="/" className="back-button">← Назад к ленте</Link>
        
        <h1>Создать новый пост</h1>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label>Заголовок*</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Местоположение*</label>
            <input
              type="text"
              name="location"
              value={newPost.location}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Описание*</label>
            <textarea
              name="description"
              value={newPost.description}
              onChange={handleInputChange}
              rows="5"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Изображение (URL)</label>
            <input
              type="text"
              name="image"
              value={newPost.image}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Теги (через запятую)</label>
            <input
              type="text"
              name="tags"
              value={newPost.tags.join(',')}
              onChange={handleInputChange}
            />
          </div>
          
          <button type="submit" className="submit-button">Опубликовать</button>
        </form>
      </div>
    );
  };
export default React.memo(CreatePostPage); 
