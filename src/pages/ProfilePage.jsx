import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { User } from '../schemas';
import '../components/style/profile.css';
import { Icon } from '../blocks';
import { UsersActions } from '../actions';

const Profile = (props) => {
  const { user, logout } = props;
  return (
    <div className="profile-container">
      <div className="list-container">
        <div id="user-name-list-item" className="list-item">
          <Icon icon="fa-envelope" />
          {user.name}
        </div>
        <div id="user-email-list-item" className="list-item">
          <Icon icon="fa-user" />
          {user.email}
        </div>
        <div
          id="logout-list-item-btn"
          aria-hidden="true"
          className="list-item"
          onClick={() => logout()}
        >
          <Icon icon="fa-sign-out-alt" />
          Logout
        </div>
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
  logout: () => dispatch(() => UsersActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
