import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PagesActions } from '../actions';
import { InputField, Snackbar, Button } from './blocks';
import './styles/form.css';

class Form extends React.Component {
  constructor(props) {
    const { fields } = props;
    super(props);
    this.state = {};
    _.each(fields, (field) => {
      this.state[field.name] = '';
    });
  }

  onFormSubmit() {
    const { clearErrors, onSubmit } = this.props;
    clearErrors();
    onSubmit(this.state);
  }

  renderInputs() {
    const { fields, errors } = this.props;
    return _.map(fields, (field) => {
      const { label, name, icon } = field;
      const isProtected = _.get(field, 'protected', false);

      const errorKeys = _.keys(errors);
      const isErrored = errorKeys.includes(name) || errorKeys.includes('all');

      const { state } = this;

      const testId = `${_.kebabCase(name)}-form-input-field`;

      return (
        <InputField
          data-testid={testId}
          id={`form-input-field-${_.snakeCase(name)}`}
          key={name}
          icon={icon}
          label={label}
          value={state[name]}
          mode="outlined"
          error={isErrored}
          type={isProtected ? 'password' : 'text'}
          onChange={(e) => this.setState({ [name]: e.target.value })}
        />
      );
    });
  }

  renderNotification() {
    const { errors, clearErrors } = this.props;
    let message = errors;
    if (_.isObject(errors)) message = errors[_.keys(errors)[0]];

    return (
      <Snackbar
        isOpen={!_.isEmpty(errors)}
        onDismiss={() => clearErrors()}
      >
        {message}
      </Snackbar>
    );
  }

  renderTitle() {
    const { title, description } = this.props;
    if (!title) return null;

    return (
      <div className="form-text-container">
        <h1 className="form-title">
          {title}
        </h1>
        <div className="form-description">
          {description}
        </div>
      </div>
    );
  }

  render() {
    const { title, text } = this.props;
    const testId = `${_.kebabCase(title)}-form-submit-btn`;
    return (
      <div>
        {this.renderNotification()}
        {this.renderTitle()}
        <div className="form-input-container">
          {this.renderInputs()}
        </div>
        <div className="form-btn-container">
          <Button
            data-testid={testId}
            onClick={() => this.onFormSubmit()}
          >
            {text}
          </Button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  errors: PropTypes.shape({}).isRequired,
  clearErrors: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    protected: PropTypes.bool,
  })),
};

Form.defaultProps = {
  text: 'Submit',
  description: null,
  fields: [],
  onSubmit: () => null,
};

const mapStateToProps = (state) => ({
  errors: state.pages.errors,
});

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(PagesActions.clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
