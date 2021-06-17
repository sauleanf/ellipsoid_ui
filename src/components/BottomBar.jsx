/* eslint-disable */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Icon,
  Modal,
} from '../blocks';
import './style/login-menu.css';
import { UsersActions, ErrorsActions } from '../actions';
import LoginMenu from './LoginMenu';
import RegistrationMenu from './RegistrationMenu';
import { User } from '../schemas';
import Profile from './Profile';
import './style/bottom-bar.css';

const LOGIN_MENU = 'login_menu';
const REGISTRATION_MENU = 'registration_menu';

class BottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: LOGIN_MENU,
    };
  }

  getFABProps() {
    let icon; let
      text;
    if (this.isAuthenticated()) {
      const { user } = this.props;
      icon = 'fa-user';
      text = user.email;
    } else {
      icon = 'fa-sign-in-alt';
      text = 'Sign In';
    }

    return { icon, text };
  }

  isAuthenticated() {
    const { user } = this.props;
    return !_.isEmpty(user);
  }

  toggleRegistrationMenu() {
    const { clearErrors } = this.props;
    clearErrors();
    this.setState({ menu: REGISTRATION_MENU });
  }

  renderUserActionMenu() {
    if (this.isAuthenticated()) {
      return <Profile />;
    }
    const { menu } = this.state;

    switch (menu) {
      case LOGIN_MENU: {
        return (
          <div>
            <LoginMenu />
            <div className="register-btn-container">
              <Button
                type="transparent"
                color="dark"
                onClick={() => this.toggleRegistrationMenu()}
              >
                Create new account
              </Button>
            </div>
          </div>
        );
      }
      case REGISTRATION_MENU: {
        return (
          <div>
            <RegistrationMenu />
          </div>
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const { email, password, isOpen } = this.state;
    const { login } = this.props;
    const { icon, text } = this.getFABProps();
    return (
      <div className="bottom-bar-container">
        <Modal
          id="user-menu-modal"
          isOpen={isOpen}
          onClose={() => this.setState({ isOpen: false, menu: LOGIN_MENU })}
          onSubmit={() => login({ email, password })}
        >
          {this.renderUserActionMenu()}
        </Modal>
        <div className="bottom-bar">
          <Button
            id="open-user-menu-btn"
            type="transparent"
            color="light"
            onClick={() => this.setState({ isOpen: true })}
          >
            <Icon icon={icon} theme="dark" />
            {text}
          </Button>
        </div>
      </div>
    );
  }
}

BottomBar.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.shape(User.propType),
  clearErrors: PropTypes.func.isRequired,
};

BottomBar.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(UserActions.login({ email, password })),
  clearErrors: () => dispatch(ErrorsActions.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
