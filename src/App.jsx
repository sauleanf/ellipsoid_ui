import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { User } from './schemas';
import { NewsPapersActions, UsersActions } from './actions';
import PageFrame from './components/pages/PageFrame';
import PagesActions from './actions/pages.actions';

class App extends React.Component {
  componentDidMount() {
    const { fetchUser, areNewsPapersLoaded } = this.props;
    fetchUser();

    if (!areNewsPapersLoaded) {
      const { fetchNewspapers } = this.props;
      fetchNewspapers();
    }

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
  fetchNewspapers: PropTypes.func.isRequired,
  areNewsPapersLoaded: PropTypes.bool.isRequired,
  setPageGroup: PropTypes.func.isRequired,
  user: PropTypes.shape(User.propType).isRequired,
};

const mapStateToProps = (state) => ({
  areNewsPapersLoaded: state.newspapers.loaded,
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewspapers: () => dispatch(NewsPapersActions.getAll()),
  fetchUser: () => dispatch(UsersActions.self()),
  setPageGroup: (pageGroup) => dispatch(PagesActions.setPageGroup(pageGroup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
