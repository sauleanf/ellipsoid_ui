import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  LocationsActions,
  NewsPapersActions,
  UsersActions,
} from './actions';
import MainPage from './components/MainPage';

class App extends React.Component {
  componentDidMount() {
    const {
      fetchNewspapers,
      fetchLocations,
      fetchUser,
    } = this.props;
    fetchNewspapers();
    fetchLocations();
    fetchUser();
  }

  render() {
    return <MainPage />;
  }
}

App.propTypes = {
  fetchLocations: PropTypes.func.isRequired,
  fetchNewspapers: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchLocations: () => dispatch(LocationsActions.getAll()),
  fetchUser: () => dispatch(UsersActions.self()),
  fetchNewspapers: () => dispatch(NewsPapersActions.getAll()),
});

export default connect(null, mapDispatchToProps)(App);
