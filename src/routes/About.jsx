import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Алексей Петров',
      role: 'Основатель',
      bio: 'Страстный путешественник с 15-летним опытом. Посетил 87 стран и готов поделиться своими знаниями.',
      image: '/images/team1.jpg'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      role: 'Главный редактор',
      bio: 'Фотограф и писатель. Специализируется на культурных особенностях разных стран.',
      image: '/images/team2.jpg'
    },
    {
      id: 3,
      name: 'Дмитрий Смирнов',
      role: 'Технический директор',
      bio: 'Обеспечивает бесперебойную работу платформы, чтобы вы могли делиться своими историями.',
      image: '/images/team3.jpg'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Пользователей' },
    { number: '25K+', label: 'Постов' },
    { number: '150+', label: 'Стран' },
    { number: '5', label: 'Языков' }
  ];

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">Наша история</h1>
          <p className="about-hero-subtitle">Откройте для себя мир через истории настоящих путешественников</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission-section">
        <div className="container">
          <div className="about-mission-content">
            <h2 className="about-mission-title">Наша миссия</h2>
            <p className="about-mission-statement">
              Мы верим, что путешествия меняют людей к лучшему...
            </p>
            <div className="about-mission-stats">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat-item">
                  <span className="about-stat-number">{stat.number}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <img src="/images/about-story.jpg" alt="Начало нашего путешествия" />
            </div>
            <div className="about-story-content">
              <h2 className="about-story-title">Как все начиналось</h2>
              <p className="about-story-text">...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="container">
          <h2 className="about-team-title">Наша команда</h2>
          <p className="about-team-subtitle">
            Знакомьтесь с людьми, которые делают этот проект возможным
          </p>
          <div className="about-team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="about-team-card">
                <div className="about-team-card-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="about-team-card-content">
                  <h3 className="about-team-card-name">{member.name}</h3>
                  <span className="about-team-card-role">{member.role}</span>
                  <p className="about-team-card-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <h2 className="about-cta-title">Присоединяйтесь к нашему сообществу</h2>
          <p className="about-cta-text">
            Начните делиться своими путешествиями или найдите вдохновение для следующего приключения
          </p>
          <div className="about-cta-buttons">
            <Link to="/register" className="about-cta-button about-cta-button-primary">Зарегистрироваться</Link>
            <Link to="/" className="about-cta-button about-cta-button-secondary">На главную</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;