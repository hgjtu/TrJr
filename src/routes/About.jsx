import React from 'react';
import { Link } from 'react-router-dom';
import { FiAirplay, FiMapPin, FiSunrise } from 'react-icons/fi';
import '../styles/home.css';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">Обо мне</h1>
          <p className="hero-subtitle">Ещё не уезжала, но мысли давно пересекли все границы</p>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <h2>Почему я создала этот сайт</h2>
            <p>
              Я всегда мечтала путешествовать, но обстоятельства пока не позволяют мне отправиться в путь. 
              Зато я могу наслаждаться чужими приключениями и делиться самыми вдохновляющими историями с такими же мечтателями, как я.
            </p>
            <p>
              Этот сайт - мое окно в мир. Здесь я собираю самые интересные рассказы, полезные советы и красивые места, 
              которые когда-нибудь обязательно увижу своими глазами.
            </p>
          </div>
          <div className="about-image mission-image"></div>
        </section>

        <section className="about-section reverse">
          <div className="about-text">
            <h2>Почему путешествия - это важно?</h2>
            <p>Даже не выходя из дома, через чужие рассказы и фотографии, мы можем:</p>
            <ul className="travel-benefits">
              <li>Расширять кругозор и узнавать новое о других культурах</li>
              <li>Находить вдохновение для собственных целей</li>
              <li>Планировать будущие поездки (ведь мечты должны сбываться!)</li>
              <li>Почувствовать себя частью большого и удивительного мира</li>
            </ul>
          </div>
          <div className="about-image travel-image"></div>
        </section>

        <section className="dream-section">
          <div className="dream-content">
            <h2>Мои мечты</h2>
            <div className="dream-item">
              <div className="dream-icon"><FiAirplay color="#4CAF50" size={32} /></div>
              <p>Когда-нибудь увидеть океан — почувствовать его запах, услышать шум волн</p>
            </div>
            <div className="dream-item">
              <div className="dream-icon"><FiMapPin color="#4CAF50" size={32} /></div>
              <p>Побродить по старинным европейским улочкам</p>
            </div>
            <div className="dream-item">
              <div className="dream-icon"><FiSunrise color="#4CAF50" size={32} /></div>
              <p>Встретить рассвет в горах</p>
            </div>
            <div className="dream-map">
              {/* <p>А пока я отмечаю на этой карте места, которые хочу посетить...</p> */}
              {/* <div className="map-placeholder"></div> */}
            </div>
          </div>
        </section>

        <section className="join-section">
          <h2>Давайте мечтать вместе!</h2>
          <p>
            Если вы тоже пока только мечтаете о путешествиях или уже побывали в удивительных местах — 
            присоединяйтесь! Давайте делиться историями и вдохновлять друг друга.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Присоединиться</Link>
            <Link to="/" className="cta-button secondary">Читать истории</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
