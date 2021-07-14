import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import './styles/fab.css';

const FAB = (props) => {
  const { onClick, text, icon } = props;
  return (
    <div className="fab-container">
      <button
        id="fab"
        type="button"
        className="fab-btn"
        onClick={() => onClick()}
      >
        <Icon icon={icon} theme="dark" />
        <h3 className="fab-text">
          {text}
        </h3>
      </button>
    </div>
  );
};

FAB.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default FAB;
