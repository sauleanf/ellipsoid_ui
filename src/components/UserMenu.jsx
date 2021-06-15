import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FAB,
  Modal,
} from '../blocks';
import './style/login-menu.css';
import { UserActions } from '../actions';
import LoginMenu from './LoginMenu';
import RegistrationMenu from './RegistrationMenu';
import { User } from '../schemas';
import Profile from './Profile';

const LOGIN_MENU = 'login_menu';
const REGISTRATION_MENU = 'registration_menu';

class UserMenu extends React.Component {
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

  renderUserActionMenu() {
    const { menu } = this.state;

    if (this.isAuthenticated()) {
      return <Profile />;
    }

    switch (menu) {
      case LOGIN_MENU: {
        return (
          <LoginMenu
            toggleRegistrationMenu={() => this.setState({ menu: REGISTRATION_MENU })}
          />
        );
      }
      case REGISTRATION_MENU: {
        return <RegistrationMenu />;
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
      <div>
        <Modal
          isOpen={isOpen}
          onClose={() => this.setState({ isOpen: false, menu: LOGIN_MENU })}
          onSubmit={() => login({ email, password })}
        >
          {this.renderUserActionMenu()}
        </Modal>
        <FAB
          icon={icon}
          text={text}
          onClick={() => this.setState({ isOpen: true })}
        />
      </div>
    );
  }
}

UserMenu.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.shape(User.propType),
};

UserMenu.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({
  user: state.users.item,
});

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(UserActions.login({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
