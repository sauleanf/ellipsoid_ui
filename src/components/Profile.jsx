import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { User } from '../schemas';
import './style/profile.css';
import { Icon } from '../blocks';
import { UserActions } from '../actions';

const Profile = (props) => {
  const { user, logout } = props;
  return (
    <div className="list-container">
      <div className="list-item">
        <Icon icon="fa-envelope" />
        {user.email}
      </div>
      <div className="list-item">
        <Icon icon="fa-user" />
        {user.name}
      </div>
      <div
        aria-hidden="true"
        className="list-item"
        onClick={() => logout()}
      >
        <Icon icon="fa-sign-out-alt" />
        Logout
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape(User.propType).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(UserActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
