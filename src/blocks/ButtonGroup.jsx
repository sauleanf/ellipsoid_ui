import React from 'react';
import PropTypes from 'prop-types';
import './style/button-group.css';

const ButtonGroup = (props) => {
  const { children } = props;
  return (
    <div className="button-group-container">
      {children}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node,
};

ButtonGroup.defaultProps = {
  children: null,
};

export default ButtonGroup;
