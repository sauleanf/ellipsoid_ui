import React from 'react';
import PropTypes from 'prop-types';
import './style/button.css';

const typeClasses = {
  outlined: 'outlined-btn',
  solid: 'solid-btn',
  transparent: 'transparent-btn',
};

const Button = (props) => {
  const {
    children,
    onClick,
    type,
    color,
  } = props;
  const typeClass = typeClasses[type];
  const colorClass = `${color}-color-btn`;
  const buttonClassName = `button ${typeClass} ${colorClass}`;

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={(e) => onClick(e)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  onClick: () => null,
  type: 'solid',
  color: 'light',
};

export default Button;
