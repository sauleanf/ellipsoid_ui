import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './styles/form.css';

const Form = (props) => {
  const {
    children,
    onSubmit,
    formTitle,
    submitText,
  } = props;
  return (
    <form onSubmit={(e) => e.preventDefault()} className="form-container">
      <div className="form-title">
        <h2>
          {formTitle}
        </h2>
      </div>
      <div className="input-container">
        {children}
      </div>
      <Button type="submit" onClick={() => onSubmit()}>
        {submitText}
      </Button>
    </form>
  );
};

Form.propTypes = {
  submitText: PropTypes.string,
  formTitle: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

Form.defaultProps = {
  submitText: 'Submit',
  formTitle: null,
  onSubmit: () => {},
  children: null,
};

export default Form;
