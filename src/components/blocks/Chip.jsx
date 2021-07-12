import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import './styles/chip.css';

const Chip = (props) => {
  const { icon, text } = props;
  return (
    <div className="chip-box">
      {!_.isEmpty(icon) ? <Icon icon={icon} /> : null}
      {text}
    </div>
  );
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Chip.defaultProps = {
  icon: '',
};

export default Chip;
