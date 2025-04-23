import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import defaultProfileIcon from '../assets/default-user-img.png';
import { FiEdit, FiLock, FiLogOut, FiSave, FiX, FiCamera, FiCheck } from 'react-icons/fi';
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
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await UserService.getUserData();
            setOriginalUser({
                username: response.data.username,
                email: response.data.email,
                profilePicture: response.data.image
            });
            setEditableUser({
                username: response.data.username,
                email: response.data.email,
                profilePicture: null
            });
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser({
            ...editableUser,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
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

    const validatePasswordForm = () => {
        const errors = {};
        
        if (!passwordData.currentPassword) {
            errors.currentPassword = 'Требуется текущий пароль';
        }
        
        if (!passwordData.newPassword) {
            errors.newPassword = 'Требуется новый пароль';
        } else if (passwordData.newPassword.length < 6) {
            errors.newPassword = 'Пароль должен быть не менее 6 символов';
        }
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
        }
        
        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangePassword = async () => {
        if (!validatePasswordForm()) return;
        
        setIsLoading(true);
        try {
            const response = await UserService.changePassword(
                passwordData.currentPassword,
                passwordData.newPassword
            );
            
            if (response.status === 200) {
                setSuccessMessage('Пароль успешно изменен!');
                setTimeout(() => {
                    setSuccessMessage('');
                    setShowPasswordForm(false);
                    setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                }, 2000);
            }
        } catch (error) {
            console.error('Ошибка при изменении пароля:', error);
            setPasswordErrors({
                ...passwordErrors,
                currentPassword: error.response?.data?.message || 'Неверный текущий пароль'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await AuthService.logout();
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
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await UserService.updateUserData(
                editableUser.username, 
                editableUser.email, 
                editableUser.profilePicture
            );
            if (response.status === 200) {
                setSuccessMessage('Данные успешно обновлены!');
                setTimeout(() => {
                    setSuccessMessage('');
                    setOriginalUser({
                        username: editableUser.username,
                        email: editableUser.email,
                        profilePicture: response.data.image
                    });
                    setPreviewImage(null);
                    setIsEditing(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
            setSuccessMessage('Произошла ошибка при обновлении профиля');
            setTimeout(() => setSuccessMessage(''), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
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
            <div className="profile-header">
                <h1>Мой профиль</h1>
                {!isEditing && (
                    <button 
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                        <FiEdit size={18} />
                        <span>Редактировать</span>
                    </button>
                )}
            </div>
            
            {isLoading && <div className="loading-overlay">Загрузка...</div>}
            
            {successMessage && (
                <div className="success-message">
                    <FiCheck size={20} />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="profile-content">
            <div className="profile-picture-section">
                <div 
                    className={`profile-picture-container ${isEditing ? 'editable' : ''}`}
                    onClick={isEditing ? triggerFileInput : null}
                >
                    <img 
                        src={previewImage || originalUser.profilePicture || defaultProfileIcon} 
                        alt="Фото профиля" 
                        className="profile-image"
                    />
                    {isEditing && (
                        <div className="photo-edit-overlay">
                            <FiCamera size={24} />
                            <span>Изменить фото</span>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>
                    
                    {isEditing && previewImage && (
                        <button 
                            className="remove-photo-button"
                            onClick={() => {
                                setPreviewImage(null);
                                setEditableUser({
                                    ...editableUser,
                                    profilePicture: null
                                });
                            }}
                        >
                            Удалить фото
                        </button>
                    )}
                </div>

                <div className="profile-details-section">
                    {isEditing ? (
                        <div className="edit-form">
                            <div className="form-group">
                                <label>Имя пользователя</label>
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
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editableUser.email}
                                    onChange={handleInputChange}
                                    placeholder="Введите ваш email"
                                />
                            </div>
                            <div className="form-actions">
                                <button 
                                    className="save-button"
                                    onClick={handleSave}
                                    disabled={isLoading}
                                >
                                    <FiSave size={18} />
                                    <span>Сохранить изменения</span>
                                </button>
                                <button 
                                    className="cancel-button"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    <FiX size={18} />
                                    <span>Отменить</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="view-mode">
                            <div className="user-info">
                                <div className="info-item">
                                    <span className="info-label">Имя пользователя</span>
                                    <span className="info-value">{originalUser.username}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email</span>
                                    <span className="info-value">{originalUser.email}</span>
                                </div>
                            </div>
                            <div className="action-buttons">
                                <button 
                                    className="change-password-button"
                                    onClick={() => setShowPasswordForm(true)}
                                >
                                    <FiLock size={18} />
                                    <span>Сменить пароль</span>
                                </button>
                                <button 
                                    className="logout-button"
                                    onClick={handleLogout}
                                >
                                    <FiLogOut size={18} />
                                    <span>Выйти</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showPasswordForm && (
                <div className="password-modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Смена пароля</h3>
                            <button 
                                className="close-button"
                                onClick={() => {
                                    setShowPasswordForm(false);
                                    setPasswordErrors({});
                                }}
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Текущий пароль</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Введите текущий пароль"
                                    className={passwordErrors.currentPassword ? 'error' : ''}
                                />
                                {passwordErrors.currentPassword && (
                                    <span className="error-message">{passwordErrors.currentPassword}</span>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Новый пароль</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Введите новый пароль"
                                    className={passwordErrors.newPassword ? 'error' : ''}
                                />
                                {passwordErrors.newPassword && (
                                    <span className="error-message">{passwordErrors.newPassword}</span>
                                )}
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Подтвердите пароль</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Повторите новый пароль"
                                    className={passwordErrors.confirmPassword ? 'error' : ''}
                                />
                                {passwordErrors.confirmPassword && (
                                    <span className="error-message">{passwordErrors.confirmPassword}</span>
                                )}
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <button 
                                className="confirm-button"
                                onClick={handleChangePassword}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;