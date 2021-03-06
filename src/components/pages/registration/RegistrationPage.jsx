import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../../Form';

import RegistrationsActions from '../../../actions/registrations.actions';
import PagesActions from '../../../actions/pages.actions';
import Registration from '../../../schemas/registration';
import Page from '../Page';

import './style/registration-page.css';
import { pages } from '../config/constants';

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

class RegistrationPage extends React.Component {
  componentDidUpdate() {
    const { registration, visitRegistrationConfirm } = this.props;
    if (!_.isEmpty(registration)) {
      visitRegistrationConfirm();
    }
  }

  render() {
    const { register } = this.props;
    return (
      <Page>
        <Form
          fields={formFields}
          text="Register User"
          title="Register"
          description="Please enter the following information"
          onSubmit={(formData) => register(formData)}
        />
      </Page>
    );
  }
}

RegistrationPage.propTypes = {
  registration: PropTypes.shape(Registration.propType).isRequired,
  register: PropTypes.func.isRequired,
  visitRegistrationConfirm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  registration: state.registrations.item,
});

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(RegistrationsActions.create(data)),
  visitRegistrationConfirm: () => dispatch(
    PagesActions.clearAndPushPage(pages.REGISTRATION_CONFIRM),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
