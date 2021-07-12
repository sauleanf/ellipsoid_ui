import React from 'react';
import PropTypes from 'prop-types';
import { Article } from '../schemas';
import './styles/article-post.css';

const ArticlePost = (props) => {
  const { article } = props;
  return (
    <div
      className="article-container"
    >
      <a className="article-link" href={article.link}>
        {article.title}
      </a>
      <div className="article-date">
        {article.publishedAt.calendar()}
      </div>
      <div className="article-location">
        <i className="fas fa-map-marker-alt" />
        {article.location.name}
      </div>
    </div>
  );
};

ArticlePost.propTypes = {
  article: PropTypes.shape(Article.propType).isRequired,
};

export default ArticlePost;
