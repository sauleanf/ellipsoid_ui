/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './style/click-pulse.css';

class ClickPulse extends React.Component {
  render() {
    const styles = {
      'left': this.props.x,
      'top': this.props.y
    };

    return <div className="click-pulse" style={styles} />
  }
}

ClickPulse.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
}

ClickPulse.defaultProps = {
  x: 0,
  y: 0,
}

export default ClickPulse;
