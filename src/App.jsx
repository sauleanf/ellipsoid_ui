import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UsersActions } from './actions';
import PageFrame from './pages/PageFrame';
import PagesActions from './actions/pages.actions';

class App extends React.Component {
  componentDidMount() {
    const {
      fetchUser,
    } = this.props;
    fetchUser();

    this.setPage();
  }

  setPage() {
    const { setPageSet, user } = this.props;
    if (!_.isEmpty(user)) {
      setPageSet('authenticated');
    } else if (!UsersActions.Api.isAuthenticated()) {
      setPageSet('normal');
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setPage();
  }

  render() {
    return <PageFrame />;
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  setPageSet: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(UsersActions.self()),
  setPageSet: (pageSet) => dispatch(PagesActions.setPageSet(pageSet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
