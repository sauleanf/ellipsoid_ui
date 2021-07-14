import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PagesActions, RegistrationsActions } from '../../../actions';

import Page from '../Page';
import { pages } from '../config/constants';
import Form from '../../Form';
import Registration from '../../../schemas/registration';

const formFields = [{
  name: 'code',
  label: 'Code',
  icon: 'fa-lock',
}];

const RegistrationConfirmPage = (props) => {
  const { registration, confirmRegistration } = props;
  const { id } = registration;

  if (_.get(registration, 'activated', false)) {
    const { visitRegistrationCompletedPage } = props;
    visitRegistrationCompletedPage();
  }

  return (
    <Page>
      <Form
        title="Code"
        description="Enter code sent to your email"
        fields={formFields}
        onSubmit={(formParams) => confirmRegistration(id, formParams)}
      />
    </Page>
  );
};

RegistrationConfirmPage.propTypes = {
  confirmRegistration: PropTypes.func.isRequired,
  visitRegistrationCompletedPage: PropTypes.func.isRequired,
  registration: PropTypes.shape(Registration.propType).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  confirmRegistration: (id, { code }) => dispatch(RegistrationsActions.update(id, { code })),
  visitRegistrationCompletedPage: () => dispatch(
    PagesActions.clearAndPushPage(pages.REGISTRATION_COMPLETED),
  ),
});

const mapStateToProps = (state) => ({
  registration: state.registrations.item,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationConfirmPage);
