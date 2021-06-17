import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UsersActions } from '../actions';
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
  const { login } = props;
  return (
    <div className="login-menu-container">
      <Form
        fields={formFields}
        text="Login"
        title="Login User"
        description="Login with your username or password"
        onSubmit={(formData) => login(formData)}
      />
    </div>
  );
};

LoginMenu.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(UsersActions.login({ email, password })),
});

export default connect(null, mapDispatchToProps)(LoginMenu);
