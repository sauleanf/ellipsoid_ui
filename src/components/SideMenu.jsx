import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Article } from '../schemas';
import {
  Modal,
  PaginatedMenu,
  SpinningIcon,
} from '../blocks';
import ArticlePost from './ArticlePost';
import './style/side-menu.css';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newspaperInView: {},
    };
  }

  renderArticles() {
    const {
      articles,
      isLoading,
    } = this.props;

    if (isLoading) {
      return <SpinningIcon />;
    }

    const articlesByNewsPaper = _.groupBy(articles, 'newspaper.id');
    return _.map(articlesByNewsPaper, (articleGroup) => {
      const groupElement = _.map(
        articleGroup,
        (article) => <ArticlePost key={article.id} article={article} />,
      );

      const { newspaper } = articleGroup[0];

      return (
        <div
          key={newspaper.id}
          className="article-group-container"
        >
          <button
            type="button"
            className="newspaper-name"
            onClick={() => this.setState({ newspaperInView: newspaper })}
          >
            {newspaper.name}
          </button>
          {groupElement}
        </div>
      );
    });
  }

  renderModal() {
    const { newspaperInView } = this.state;
    const isOpen = !_.isEmpty(newspaperInView);
    return (
      <Modal isOpen={isOpen} onClose={() => this.setState({ newspaperInView: {} })}>
        <div>
          <h2 className="newspaper-modal-name">
            {newspaperInView.name}
          </h2>
          <p className="newspaper-modal-description">
            {newspaperInView.description}
          </p>
        </div>
      </Modal>
    );
  }

  render() {
    const {
      articles,
      page,
      pages,
      onPageChange,
    } = this.props;

    return (
      <div>
        <PaginatedMenu
          isOpen={!_.isEmpty(articles)}
          page={page}
          pages={pages}
          onPageChange={onPageChange}
        >
          {this.renderArticles()}
        </PaginatedMenu>
        {this.renderModal()}
      </div>
    );
  }
}

SideMenu.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape(Article.propType)),
  onPageChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

SideMenu.defaultProps = {
  articles: [],
  onPageChange: () => null,
  isLoading: false,
};

const mapStateToProps = (state) => ({
  page: state.articles.page,
  pages: state.articles.pages,
  articles: state.articles.items,
  fetching: state.articles.fetching,
});

export default connect(mapStateToProps)(SideMenu);
