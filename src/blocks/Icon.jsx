import PropTypes from 'prop-types';
import React from 'react';
import './style/icon.css';

const Icon = (props) => {
  const { icon } = props;
  return <i className={`icon-box fas ${icon}`} />;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
