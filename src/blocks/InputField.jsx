import React from 'react';
import PropTypes from 'prop-types';
import './style/input-field.css';

const InputField = (props) => {
  const {
    name,
    icon,
    onChange,
    type,
    value,
    label,
  } = props;
  return (
    <div className="input-box">
      <i className={`fas ${icon}`} />
      <input
        name={name}
        type={type}
        placeholder={label}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
};

InputField.defaultProps = {
  name: '',
  onChange: () => {},
  type: 'text',
  value: '',
  label: '',
  icon: '',
};

export default InputField;
