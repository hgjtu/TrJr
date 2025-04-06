import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/postPage.css';
import PostService from "../services/PostService";

const CreatePostPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const [newPost, setNewPost] = useState({
      title: '',
      location: '',
      description: '',
      // image: '',
    //   tags: [],
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewPost(prev => ({
        ...prev,
        [name]: name === 'tags' ? value.split(',') : value
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const response = await PostService.createPost(newPost.title, newPost.location, newPost.description);
        console.log("ДА БЛЯТЬ");
        alert('Пост создан!');
        navigate('/');
      } catch (error) {
        console.error('Ошибка при создании поста:', error);
      }
    };
  
    return (
      <div className="create-post-page">
        <Link to="/" className="back-button">← Назад к ленте</Link>
        
        <h1>Создать новый пост</h1>
        
        <form className="create-post-form">
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
          
          {/* <div className="form-group">
            <label>Изображение (URL)</label>
            <input
              type="text"
              name="image"
              value={newPost.image}
              onChange={handleInputChange}
            />
          </div> */}
          
          {/* <div className="form-group">
            <label>Теги (через запятую)</label>
            <input
              type="text"
              name="tags"
              value={newPost.tags.join(',')}
              onChange={handleInputChange}
            />
          </div> */}
          
          <button onClick={handleSubmit} className="submit-button">Опубликовать</button>
        </form>
      </div>
    );
  };
export default React.memo(CreatePostPage); 
