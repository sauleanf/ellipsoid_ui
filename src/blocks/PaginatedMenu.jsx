import React from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import './style/paginated-menu.css';

class PaginatedMenu extends React.Component {
  renderPagination() {
    const { page, pages, onPageChange } = this.props;

    if (pages > 1) {
      return (
        <Pagination
          page={page}
          pages={pages}
          onChange={(newPage) => {
            onPageChange(newPage);
          }}
        />
      );
    }

    return null;
  }

  render() {
    const { children, isOpen } = this.props;

    const isOpenClass = isOpen ? 'paginated-menu-open' : 'paginated-menu-close';
    return (
      <div className={`paginated-menu-container ${isOpenClass}`}>
        <div className="paginated-menu-body-container">
          {children}
        </div>
        <div className="paginated-menu-pagination-btn-container">
          {this.renderPagination()}
        </div>
        <div />
      </div>
    );
  }
}

PaginatedMenu.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

PaginatedMenu.defaultProps = {
  children: null,
  isOpen: false,
  onPageChange: () => null,
};

export default PaginatedMenu;
