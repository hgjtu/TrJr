import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/postPage.css';

const mockPosts = [
  {
    id: 1,
    title: "Невероятные виды Санторини",
    author: "Анна Петрова",
    date: "2023-05-15",
    location: "Санторини, Греция",
    description: "Потрясающие закаты, белоснежные дома и синее море - Санторини превзошел все мои ожидания! Мы провели здесь 7 незабываемых дней, исследуя остров. Особенно запомнилась деревня Ия с ее знаменитыми закатами - каждый вечер сотни людей собираются на смотровых площадках, чтобы увидеть, как солнце медленно погружается в Эгейское море. Красные, оранжевые и розовые оттенки неба создают поистине волшебную атмосферу. Еще рекомендую посетить пляжи с черным и красным песком - такого больше нигде не увидишь!",
    image: "https://example.com/santorini.jpg",
    likes: 245,
    isLiked: false,
    tags: ["пляжный отдых", "романтика", "острова"]
  },
  {
    id: 2,
    title: "Поход в Гималаи",
    author: "Иван Сидоров",
    date: "2023-04-22",
    location: "Непал",
    description: "14 дней треккинга к базовому лагерю Эвереста. Незабываемые впечатления и испытание себя!",
    likes: 189,
    isLiked: true,
  },
  {
    id: 3,
    title: "Гастрономический тур по Италии",
    author: "Мария Иванова",
    date: "2023-06-10",
    location: "Италия",
    description: "От пиццы в Неаполе до пасты в Болонье - вкусное путешествие по лучшим регионам Италии.",
    likes: 312,
    isLiked: false,
  },
  {
    id: 4,
    title: "Дорогами Исландии",
    author: "Дмитрий Козлов",
    date: "2023-03-05",
    location: "Исландия",
    description: "Кольцевая дорога Исландии за 10 дней: водопады, гейзеры, ледники и северное сияние!",
    image: "https://example.com/iceland.jpg",
    likes: 278,
    isLiked: false,
  }
];

// Предполагаем, что текущий пользователь - это "Анна Петрова"
const currentUser = "Анна Петрова";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({});

  useEffect(() => {
    const foundPost = mockPosts.find(p => p.id === parseInt(postId));
    setPost(foundPost);
    if (foundPost) {
      setEditedPost({ ...foundPost });
    }
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',') : value
    }));
  };

  const handleSave = () => {
    // В реальном приложении здесь был бы запрос к API для обновления поста
    setPost(editedPost);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // В реальном приложении здесь был бы запрос к API для удаления поста
    alert('Пост удален!');
    navigate('/');
  };

  if (!post) return <div className="loading">Загрузка...</div>;

  const isAuthor = post.author === currentUser;

  return (
    <div className="full-post">
      <Link to="/" className="back-button">← Назад к ленте</Link>
      
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
          
          <div className="form-group">
            <label>Теги (через запятую)</label>
            <input
              type="text"
              name="tags"
              value={editedPost.tags ? editedPost.tags.join(',') : ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-buttons">
            <button onClick={handleSave} className="save-button">Сохранить</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">Отмена</button>
          </div>
        </div>
      ) : (
        <>
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
            
            {post.tags && (
              <div className="full-post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            <div className="full-post-actions">
              <button className={`like-button ${post.isLiked ? 'liked' : ''}`}>
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