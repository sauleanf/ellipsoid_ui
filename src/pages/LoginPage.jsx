import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { UsersActions, PagesActions } from '../actions';
import { Button } from '../blocks';
import Form from '../components/Form';
import Page from './Page';

import './styles/login-page.css';

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

const LoginPage = (props) => {
  const { login, visitRegistrationPage } = props;
  return (
    <Page>
      <Form
        fields={formFields}
        text="Login"
        title="Login User"
        description="Login with your username or password"
        onSubmit={(formData) => login(formData)}
      />
      <Button
        type="transparent"
        color="dark"
        onClick={() => visitRegistrationPage()}
      >
        Register
      </Button>
    </Page>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  visitRegistrationPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(UsersActions.login({ email, password })),
  visitRegistrationPage: () => dispatch(PagesActions.push('registration')),
});

export default connect(null, mapDispatchToProps)(LoginPage);
