import PropTypes from 'prop-types';
import React from 'react';
import './styles/icon.css';

const Icon = (props) => {
  const { icon, theme } = props;
  return <i className={`icon-box fas ${icon} ${theme}`} />;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

Icon.defaultProps = {
  theme: 'light',
};

export default Icon;
