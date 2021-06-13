import React from 'react';
import PropTypes from 'prop-types';
import './style/modal.css';
import Icon from './Icon';

const Modal = (props) => {
  const {
    isOpen,
    children,
    onClose,
  } = props;

  if (!isOpen) return null;

  return (
    <div className="modal-container fade-in modal-open">
      <div className="modal-box">
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => onClose()}
        >
          <Icon icon="fa-window-close" />
        </button>
        <div className="modal-body-container">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  isOpen: false,
  children: null,
  onClose: () => null,
};

export default Modal;
