import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LocationActions, NewsPaperActions } from './actions';
import MapPage from './components/MapPage';

class App extends React.Component {
  componentDidMount() {
    const { fetchLocations, fetchNewspapers } = this.props;
    fetchLocations();
    fetchNewspapers();
  }

  render() {
    return <MapPage />;
  }
}

App.propTypes = {
  fetchLocations: PropTypes.func.isRequired,
  fetchNewspapers: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchLocations: () => dispatch(LocationActions.getAll()),
  fetchNewspapers: () => dispatch(NewsPaperActions.getAll()),
});

export default connect(null, mapDispatchToProps)(App);
