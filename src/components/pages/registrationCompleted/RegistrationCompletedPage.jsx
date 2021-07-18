import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PagesActions } from '../../../actions';
import { Button } from '../../blocks';
import Page from '../Page';
import { pages } from '../config/constants';

const RegistrationCompletedPage = (props) => {
  const { visitLoginPage } = props;
  return (
    <Page>
      <h1> Congrats you are registered! </h1>
      <Button
        data-testid="visit-login-page-btn"
        onClick={() => visitLoginPage()}
      >
        Login
      </Button>
    </Page>
  );
};

RegistrationCompletedPage.propTypes = {
  visitLoginPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  visitLoginPage: () => dispatch(PagesActions.clearAndPushPage(pages.LOGIN)),
});

export default connect(null, mapDispatchToProps)(RegistrationCompletedPage);
