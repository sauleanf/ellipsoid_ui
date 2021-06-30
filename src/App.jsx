import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { User } from './schemas';
import { UsersActions } from './actions';
import PageFrame from './components/pages/PageFrame';
import PagesActions from './actions/pages.actions';

class App extends React.Component {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();

    this.setPage();
  }

  componentDidUpdate() {
    this.setPage();
  }

  setPage() {
    const { setPageGroup, user } = this.props;
    if (!_.isEmpty(user)) {
      setPageGroup('authenticated');
    } else if (!UsersActions.Api.isAuthenticated()) {
      setPageGroup('normal');
    }
  }

  render() {
    return <PageFrame />;
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  setPageGroup: PropTypes.func.isRequired,
  user: PropTypes.shape(User.propType).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(UsersActions.self()),
  setPageGroup: (pageGroup) => dispatch(PagesActions.setPageGroup(pageGroup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
