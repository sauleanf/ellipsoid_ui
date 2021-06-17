import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ErrorsActions } from '../actions';
import { InputField, Snackbar, Button } from '../blocks';
import './style/form.css';

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
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  renderInputs() {
    const { fields, errors } = this.props;
    return _.map(fields, (field) => {
      const { label, name, icon } = field;
      const isProtected = _.get(field, 'protected', false);
      const errorKeys = _.keys(errors);
      const isErrored = errorKeys.includes(name) || errorKeys.includes('_all');
      const { state } = this;
      return (
        <InputField
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
      <div>
        <h1>
          {title}
        </h1>
        <div className="form-description">
          {description}
        </div>
      </div>
    );
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        {this.renderNotification()}
        {this.renderTitle()}
        <div className="form-input-container">
          {this.renderInputs()}
        </div>
        <div className="form-btn-container">
          <Button
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
  title: PropTypes.string,
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
  title: null,
  description: null,
  fields: [],
  onSubmit: () => null,
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(ErrorsActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
