import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import PostService from "../services/PostService";
import "../styles/createPostPage.css";

const CreatePostPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const [newPost, setNewPost] = useState({
        title: '',
        location: '',
        description: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: value
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

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            formData.append('title', newPost.title);
            formData.append('location', newPost.location);
            formData.append('description', newPost.description);
            if (selectedImage) {
                formData.append('image', selectedImage);
            }

            await PostService.createPost(formData);
            alert('Пост успешно создан!');
            navigate('/');
        } catch (error) {
            console.error('Ошибка при создании поста:', error);
            alert('Произошла ошибка при создании поста');
        }
    };

    return (
        <div className="create-post-wrapper">
            <div className="create-post-container">
                <h2 className="create-post-title">Создать новый пост</h2>
                
                <div className="create-post-content">
                    <div className="create-post-form">
                        <input
                            className="create-post-input"
                            name="title"
                            value={newPost.title}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Заголовок*"
                            required
                        />
                        
                        <input
                            className="create-post-input"
                            name="location"
                            value={newPost.location}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Местоположение*"
                            required
                        />
                        
                        <textarea
                            className="create-post-textarea"
                            name="description"
                            value={newPost.description}
                            onChange={handleInputChange}
                            placeholder="Описание*"
                            rows={5}
                            required
                        />
                        
                        <div className="image-upload-container">
                            <label className="image-upload-label">
                                Загрузить изображение
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="image-upload-input"
                                />
                            </label>
                        </div>
                        
                        <button 
                            className="create-post-button" 
                            onClick={handleCreate}
                            disabled={!newPost.title || !newPost.location || !newPost.description}
                        >
                            Опубликовать
                        </button>
                        
                        <Link className="back-link" to="/">← Вернуться к ленте</Link>
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
    );
};

export default React.memo(CreatePostPage);