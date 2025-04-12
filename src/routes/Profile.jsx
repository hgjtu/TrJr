import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import defaultProfileIcon from '../assets/default-user-img.png';
import '../styles/profile.css';

function Profile() {
    const [originalUser, setOriginalUser] = useState({
        username: '',
        email: '',
        profilePicture: null,
    });
    const [editableUser, setEditableUser] = useState({
        username: '',
        email: '',
        profilePicture: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await UserService.getUserData();
            setOriginalUser({
                username: response.data.username,
                email: response.data.email,
                profilePicture: response.data.image
            });
            // Инициализируем редактируемые данные теми же значениями
            setEditableUser({
                username: response.data.username,
                email: response.data.email,
                profilePicture: null
            });
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser({
            ...editableUser,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditableUser({
                ...editableUser,
                profilePicture: file
            });
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // const handleDeletePhoto = () => {
    //     setEditableUser({
    //         ...editableUser,
    //         profilePicture: null
    //     });
    //     setPreviewImage(null);
    //     setDeleteImage(true);
    // };

    const handleLogout = async () => {
        setOriginalUser({
            username: "",
            email: "",
            profilePicture: null
        });
        setEditableUser({
            username: "",
            email: "",
            profilePicture: null
        });
        setPreviewImage(null);
        await AuthService.logout();
    };

    const handleSave = async () => {
        try {
            const response = await UserService.updateUserData(
                editableUser.username, 
                editableUser.email, 
                editableUser.profilePicture
            );
            if (response.status === 200) {
                alert('Данные успешно обновлены!');
                // Обновляем оригинальные данные после успешного сохранения
                setOriginalUser({
                    username: editableUser.username,
                    email: editableUser.email,
                    profilePicture: response.data.image
                });
                setPreviewImage(null);
                setIsEditing(false);
            } else {
                alert('Ошибка при обновлении данных');
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
            alert('Произошла ошибка при обновлении профиля');
        }
    };

    const handleCancel = () => {
        // Восстанавливаем значения из оригинальных данных
        setEditableUser({
            username: originalUser.username,
            email: originalUser.email,
            profilePicture: null
        });
        setPreviewImage(null);
        setIsEditing(false);
    };

    return (
        <div className="user-profile">
            <h1>Личный кабинет</h1>
            <div className="profile-info">
                <div className="profile-picture-container">
                    <div 
                      className={`profile-picture ${isEditing ? 'editable' : ''}`} 
                      onClick={isEditing ? triggerFileInput : null}
                    >
                      <img 
                          src={previewImage || originalUser.profilePicture || defaultProfileIcon} 
                          alt="Фото профиля" 
                      />
                      {isEditing && (
                        <div className="upload-overlay">
                            <span>Изменить фото</span>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        {/* {(!deleteImage) && (
                            <button 
                                className="delete-photo-button"
                                onClick={handleDeletePhoto}
                            >
                                Удалить фото
                            </button>
                        )} */}
                      </>
                    )}
                </div>
                
                {isEditing ? (
                    <form className="profile-form">
                        <div className="form-group">
                            <label>Логин:</label>
                            <input
                                type="text"
                                name="username"
                                value={editableUser.username}
                                readOnly
                                disabled
                                className="disabled-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editableUser.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="button-group">
                            <button type="button" className="button-primary" onClick={handleSave}>
                                Сохранить
                            </button>
                            <button type="button" className="button-secondary" onClick={handleCancel}>
                                Отмена
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <div className="detail-item">
                            <span className="detail-label">Логин:</span>
                            <span className="detail-value">{originalUser.username}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{originalUser.email}</span>
                        </div>
                        <div className="button-group">
                            <button type="button" className="button-primary" onClick={() => setIsEditing(true)}>
                                Редактировать
                            </button>
                            <button type="button" className="button-secondary" onClick={handleLogout}>
                                Выйти
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;