import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserActions } from '../actions';
import Form from './Form';
import './style/login-menu.css';

const formFields = [{
  name: 'email',
  label: 'Email',
  icon: 'fa-user',
}, {
  name: 'password',
  label: 'Password',
  icon: 'fa-lock',
  protected: true,
}];

const LoginMenu = (props) => {
  const { login, toggleRegistrationMenu } = props;
  return (
    <div>
      <Form
        fields={formFields}
        text="Login"
        title="Login User"
        description="Login with your username or password"
        onSubmit={(formData) => login(formData)}
      />
      <div className="register-btn-container">
        <button
          type="button"
          className="register-btn"
          onClick={() => toggleRegistrationMenu()}
        >
          Create new account
        </button>
      </div>
    </div>
  );
};

LoginMenu.propTypes = {
  login: PropTypes.func.isRequired,
  toggleRegistrationMenu: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(UserActions.login({ email, password })),
});

export default connect(null, mapDispatchToProps)(LoginMenu);
