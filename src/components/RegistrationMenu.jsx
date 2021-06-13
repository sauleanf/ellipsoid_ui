import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserActions } from '../actions';
import Form from './Form';
import './style/login-menu.css';

const formFields = [{
  name: 'name',
  label: 'Name',
  icon: 'fa-user',
}, {
  name: 'username',
  label: 'Username',
  icon: 'fa-user',
}, {
  name: 'email',
  label: 'Email',
  icon: 'fa-envelope',
}, {
  name: 'password',
  label: 'Password',
  icon: 'fa-lock',
  protected: true,
}, {
  name: 'passwordConfirmation',
  label: 'Password Confirmation',
  icon: 'fa-lock',
  protected: true,
}];

const RegistrationMenu = (props) => {
  const { register } = props;
  return (
    <div>
      <Form
        fields={formFields}
        text="Register"
        title="Register User"
        description="Please register the user with the following information"
        onSubmit={(formData) => register(formData)}
      />
    </div>
  );
};

RegistrationMenu.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(UserActions.create(data)),
});

export default connect(null, mapDispatchToProps)(RegistrationMenu);
