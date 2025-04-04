import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import {Link} from "react-router-dom";
import '../styles/postPage.css'
import PostsService from "../services/PostsService";
import NotFound from './Errors';

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
  
const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      // В реальном приложении здесь был бы запрос к API
      const foundPost = mockPosts.find(p => p.id === parseInt(postId));
      setPost(foundPost);
    }, [postId]);
  
    if (!post) return <div className="loading">Загрузка...</div>;
  
    return (
      <div className="full-post">
        <Link to="/" className="back-button">← Назад к ленте</Link>
        
        <div className="full-post-image-container">
          <img src={post.image} alt={post.title} />
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
          
          <div className="full-post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          
          <div className="full-post-actions">
            <button className={`like-button ${post.isLiked ? 'liked' : ''}`}>
              ❤️ {post.likes}
            </button>
          </div>
        </div>
      </div>
    );
  };
export default React.memo(PostPage);