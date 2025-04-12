import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/postPage.css';
import PostService from "../services/PostService";
import ImageService from "../services/ImageService";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchPostData();
  }, []);

  const fetchPostData = async () => {
    try {
      const response = await PostService.getPostData(postId);
      const foundPost = response.data;

      console.log();

      const image = await ImageService.getImage(foundPost.imageName);
      const url = URL.createObjectURL(image.data);

      console.log(image);

      setPost(foundPost);
      if (foundPost) {
        foundPost.imageUrl = url;
        setEditedPost({ ...foundPost });
        setImagePreview(url);
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

  const handleDelete = async () => {
    try {
      await PostService.deletePost(postId);
      alert('Пост удален!');
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
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

  if (!post) return <div className="loading">Загрузка...</div>;

  const isAuthor = post.author === user.username;
  console.log(post);

  return (
    <div className="post-container">
      {isAuthor && !isEditing && (
        <div className="post-actions">
          <button onClick={() => setIsEditing(true)} className="btn-edit">Редактировать</button>
          <button onClick={handleDelete} className="btn-delete">Удалить</button>
        </div>
      )}
      
      {isEditing ? (
        <div className="edit-container">
          <div className="edit-form">
            <h2>Редактировать пост</h2>
            
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
              <label>Изображение</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            
            <div className="form-buttons">
              <button onClick={handleSave} className="btn-save">Сохранить</button>
              <button onClick={() => setIsEditing(false)} className="btn-cancel">Отмена</button>
            </div>
          </div>
          
          <div className="image-preview-container">
            <h3>Предпросмотр изображения</h3>
            <div className="image-preview-wrapper">
              {imagePreview ? (
                <img src={imagePreview} alt="Предпросмотр" className="image-preview" />
              ) : (
                <div className="no-image">Нет изображения</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Link to="/" className="back-link">← Назад</Link>
          
          <div className="post-image-wrapper">
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
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