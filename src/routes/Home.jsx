import React from 'react';
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import '../styles/home.css'

// Моковые данные для постов о путешествиях
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

const Home = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  // Фильтрация постов при изменении поискового запроса или активной вкладки
  useEffect(() => {
    let result = [...posts];
    
    // Применяем поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    )}
    
    // Сортируем по активной вкладке
    if (activeTab === 'popular') {
      result.sort((a, b) => b.likes - a.likes);
    } else {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    setFilteredPosts(result);
  }, [searchQuery, activeTab, posts]);

  // Обработчик лайков
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Обработчик поиска
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Получаем рекомендуемые посты (просто берем 3 самых популярных)
  const recommendedPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="travel-feed">
      <SearchBar onSearch={handleSearch} /> 

      <div className="main-content">
        <div className="feed-section">
          <div className="tabs">
            <button 
              className={activeTab === 'latest' ? 'active' : ''}
              onClick={() => setActiveTab('latest')}
            >
              Последние
            </button>
            <button 
              className={activeTab === 'popular' ? 'active' : ''}
              onClick={() => setActiveTab('popular')}
            >
              Популярные
            </button>
          </div>

          <div className="posts-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
              ))
            ) : (
              <div className="no-results">Ничего не найдено. Попробуйте изменить критерии поиска.</div>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="recommendations">
            <h3>Рекомендуем посетить</h3>
            {recommendedPosts.map(post => (
              <div key={post.id} className="recommended-post">
                <img src={post.image} alt={post.title} />
                <div>
                  <h4>{post.title}</h4>
                  <p>{post.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="popular-tags">
            <h3>Популярные теги</h3>
            <div className="tags-container">
              {['пляжный отдых', 'горы', 'городской туризм', 'роуд-трип', 'гастрономия', 'приключения'].map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;