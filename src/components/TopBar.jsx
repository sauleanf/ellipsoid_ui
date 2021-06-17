import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LocationsActions } from '../actions';
import { Navbar, SearchBar } from '../blocks';

const TopBar = (props) => {
  const { filteredLocations } = props;

  return (
    <div id="navbar-container">
      <Navbar>
        <div className="top-bar-name">.ellipsoid</div>
        <SearchBar filter={(value) => filteredLocations(value)} />
      </Navbar>
    </div>
  );
};

TopBar.propTypes = {
  filteredLocations: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  filteredLocations: (param) => dispatch(LocationsActions.filter(param)),
});

export default connect(null, mapDispatchToProps)(TopBar);
