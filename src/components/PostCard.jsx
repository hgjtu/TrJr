import React from 'react';
import { Link } from 'react-router';

// Компонент карточки поста
const PostCard = ({ post, onLike }) => {
  const shortDescription = post.description.length > 100 
    ? post.description.substring(0, 100) + '...' 
    : post.description;

  return (
    <div className="post-card">
      <Link to={`/posts/${post.id}`} className="post-link">
        <div className="post-image-container">
          <img src={post.image} alt={post.title} className="post-image" />
          <div className="post-location">{post.location}</div>
        </div>
        <div className="post-content">
          <h3>{post.title}</h3>
          <div className="post-meta">
            <span className="post-author">{post.author}</span>
            <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <p className="post-description">{shortDescription}</p>
          {/* <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div> */}
        </div>
      </Link>
      <div className="post-actions">
        <button 
          className={`like-button ${post.isLiked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(post.id);
          }}
        >
          ❤️ {post.likes}
        </button>
      </div>
    </div>
  );
};
export default React.memo(PostCard);