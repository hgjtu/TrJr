import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/postCard.css";

const PostCard = ({ post }) => {
  const shortDescription = post.description.length > 100 
    ? `${post.description.substring(0, 100)}...` 
    : post.description;

  return (
    <div className="post-card">
      <Link to={`/posts/${post.id}`} className="post-link">
        <div className="post-image-container">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              className="post-image" 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          )}
          <div className="post-location">{post.location}</div>
        </div>
        
        <div className="post-content">
          <h3 className="post-title">{post.title}</h3>
          
          <div className="post-meta">
            <span className="post-author">{post.author}</span>
            <span className="post-date">
              {new Date(post.date).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          
          <p className="post-description">{shortDescription}</p>
        </div>
      </Link>
      
      <div className="post-likes">
        <span className="likes-text">Понравилось:</span>
        <span className="likes-count">{post.likes || 0}</span>
      </div>
    </div>
  );
};

export default React.memo(PostCard);