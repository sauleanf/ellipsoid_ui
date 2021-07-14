import React from 'react';
import PropTypes from 'prop-types';
import './styles/click-pulse.css';

const ClickPulse = (props) => {
  const { x, y } = props;
  const styles = {
    left: x,
    top: y,
  };

  return <div className="click-pulse" style={styles} />;
};

ClickPulse.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

ClickPulse.defaultProps = {
  x: 0,
  y: 0,
};

export default ClickPulse;
