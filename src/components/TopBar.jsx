import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LocationsActions } from '../actions';
import { Navbar, SearchBar } from './blocks';
import './styles/top-bar.css';

const TopBar = (props) => {
  const { filteredLocations } = props;

  return (
    <Navbar>
      <div className="top-bar-name">.ellipsoid</div>
      <SearchBar filter={(value) => filteredLocations(value)} />
    </Navbar>
  );
};

TopBar.propTypes = {
  filteredLocations: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  filteredLocations: (param) => dispatch(LocationsActions.filter(param)),
});

export default connect(null, mapDispatchToProps)(TopBar);
