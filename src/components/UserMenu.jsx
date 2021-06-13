import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Icon,
  Modal,
} from '../blocks';
import './style/login-menu.css';
import { UserActions } from '../actions';
import LoginMenu from './LoginMenu';
import RegistrationMenu from './RegistrationMenu';

const LOGIN_MENU = 'login_menu';
const REGISTRATION_MENU = 'registration_menu';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: LOGIN_MENU,
    };
  }

  renderUserActionMenu() {
    const { menu } = this.state;
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
    return (
      <div>
        <div className="login-fab-container">
          <Modal
            isOpen={isOpen}
            onClose={() => this.setState({ isOpen: false, menu: LOGIN_MENU })}
            onSubmit={() => login({ email, password })}
          >
            {this.renderUserActionMenu()}
          </Modal>
          <button
            type="button"
            className="login-fab-btn"
            onClick={() => this.setState({ isOpen: true })}
          >
            <Icon icon="fa-sign-in-alt" theme="dark" />
          </button>
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: ({ email, password }) => dispatch(UserActions.login({ email, password })),
});

export default connect(null, mapDispatchToProps)(UserMenu);
