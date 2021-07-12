import React from 'react';
import PropTypes from 'prop-types';
import './styles/input-field.css';

const InputField = (props) => {
  const {
    name,
    icon,
    onChange,
    type,
    value,
    label,
    error,
  } = props;
  const errorClassName = error ? 'errored-input-box' : null;
  const inputClassName = `input-box ${errorClassName}`;
  return (
    <div className={inputClassName}>
      <div className="input-field-icon-container">
        <i className={`fas ${icon}`} />
      </div>
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
  error: PropTypes.bool,
};

InputField.defaultProps = {
  name: '',
  onChange: () => {},
  type: 'text',
  value: '',
  label: '',
  icon: '',
  error: false,
};

export default InputField;
