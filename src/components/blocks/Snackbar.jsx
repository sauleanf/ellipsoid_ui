import React from 'react';
import PropTypes from 'prop-types';
import './styles/snackbar.css';
import Icon from './Icon';

const Snackbar = (props) => {
  const {
    isOpen,
    children,
    onDismiss,
  } = props;

  const containerClass = isOpen ? 'snackbar-container-open' : 'snackbar-container-close';
  return (
    <div className={`snackbar-container ${containerClass}`}>
      <button
        type="button"
        className="snackbar-container-btn"
        onClick={() => onDismiss()}
      >
        <Icon color="white" icon="fa-times" theme="dark" />
      </button>
      {children}
    </div>
  );
};

Snackbar.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onDismiss: PropTypes.func,
};

Snackbar.defaultProps = {
  isOpen: false,
  children: null,
  onDismiss: () => null,
};

export default Snackbar;
