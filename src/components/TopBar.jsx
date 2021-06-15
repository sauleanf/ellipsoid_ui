import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { LocationActions } from '../actions';
import { Chip, Navbar, SearchBar } from '../blocks';
import { User } from '../schemas';

const TopBar = (props) => {
  const { filteredLocations, user } = props;
  const isAuthenticated = !_.isEmpty(user);
  const userBreadCrumb = isAuthenticated
    ? <Chip text={user.username} icon="fa-user" />
    : null;
  return (
    <div test-id="navbar-container">
      <Navbar>
        <div className="top-bar-name">.ellipsoid</div>
        <SearchBar filter={(value) => filteredLocations(value)} />
        {userBreadCrumb}
      </Navbar>
    </div>
  );
};

TopBar.propTypes = {
  filteredLocations: PropTypes.func.isRequired,
  user: PropTypes.shape(User.propType),
};

TopBar.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  filteredLocations: (param) => {
    const func = LocationActions.filter(param);
    return dispatch(func);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
