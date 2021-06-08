import React from 'react';
import PropTypes from 'prop-types';
import './style/button.css';

const Button = (props) => {
  const { children, onClick } = props;
  return (
    <button
      type="button"
      className="button"
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  onClick: () => null,
};

export default Button;
