import React from 'react';
import _ from 'lodash';

import PropType from 'prop-types';
import './styles/pagination.css';
import Icon from './Icon';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.page,
    };
  }

  componentDidUpdate(prevProps) {
    const prevPage = prevProps.page;
    const { page } = this.props;
    if (prevPage !== page) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        current: page,
      });
    }
  }

  onPageChangeConfirm(current) {
    const { pages, onChange } = this.props;
    const newPage = _.clamp(current, 0, pages);
    this.setState({
      current: newPage,
    });
    onChange(newPage);
  }

  onPageChange(newPage) {
    this.setState({
      current: newPage,
    });
  }

  render() {
    const { pages } = this.props;
    const { current } = this.state;

    const isAtFirstPage = current === 1;
    const isAtLastPage = current === pages;

    return (
      <div className="pagination-container">
        <button
          type="button"
          className={`pagination-btn ${isAtFirstPage ? 'disabled-pagination-btn' : null}`}
          onClick={() => this.onPageChangeConfirm(current - 1)}
          disabled={isAtFirstPage}
        >
          <Icon icon="fa-angle-left" theme="dark" />
          Prev
        </button>
        <div className="pagination-center-container">
          <input
            className="pagination-input"
            value={current}
            onChange={(e) => this.onPageChange(e.target.value)}
            onBlur={() => this.onPageChangeConfirm(current)}
          />
          <div className="pagination-page-count-container">
            {pages}
          </div>
        </div>
        <button
          type="button"
          className={`pagination-btn ${isAtLastPage ? 'disabled-pagination-btn' : null}`}
          onClick={() => this.onPageChangeConfirm(current + 1)}
          disabled={current === pages}
        >
          Next
          <Icon icon="fa-angle-right" theme="dark" />
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  page: PropType.number.isRequired,
  pages: PropType.number.isRequired,
  onChange: PropType.func.isRequired,
};

export default Pagination;
