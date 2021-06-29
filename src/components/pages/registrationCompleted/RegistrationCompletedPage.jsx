import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PagesActions, RegistrationsActions } from '../../../actions';
import { Button } from '../../blocks';
import Page from '../Page';

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
