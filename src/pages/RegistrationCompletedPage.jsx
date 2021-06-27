import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from './Page';
import RegistrationsActions from '../actions/registrations.actions';
import PagesActions from '../actions/pages.actions';
import { Button } from '../blocks';

const RegistrationCompletedPage = (props) => {
  const { visitLoginPage } = props;
  return (
    <Page>
      <p> Congrats you are registered! </p>
      <Button onClick={() => visitLoginPage()}>
        Login
      </Button>
    </Page>
  );
};

RegistrationCompletedPage.propTypes = {
  visitLoginPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(RegistrationsActions.create(data)),
  visitLoginPage: () => dispatch(PagesActions.clearAndPush('login')),
});

export default connect(null, mapDispatchToProps)(RegistrationCompletedPage);
