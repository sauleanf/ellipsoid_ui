import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { PagesActions, UsersActions } from '../../../actions';

import rootReducer from '../../../reducers';
import RegistrationPage from '../../../components/pages/RegistrationPage';
import { registration, user } from '../../fixtures';
import RegistrationsActions from '../../../actions/registrations.actions';

describe('RegistrationPage', () => {
  const { item } = registration;
  const { username, name, email } = user.item;
  const password = 'password';
  const payload = {
    item,
  };
  let registerSpy;
  let pagesSpy;
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <RegistrationPage />
      </Provider>,
    );

    registerSpy = jest.spyOn(RegistrationsActions.Api, 'create').mockImplementation(async () => payload);
    pagesSpy = jest.spyOn(PagesActions, 'clearAndPush').mockImplementation(() => async (dispatch) => dispatch({
      type: 'foo',
    }));
  });

  describe('register', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('[data-testid="email-form-input-field"] input').simulate('change', {
        target: {
          value: email,
        },
      });
      await wrapper.find('[data-testid="name-form-input-field"] input').simulate('change', {
        target: {
          value: name,
        },
      });
      await wrapper.find('[data-testid="username-form-input-field"] input').simulate('change', {
        target: {
          value: username,
        },
      });
      await wrapper.find('[data-testid="password-form-input-field"] input').simulate('change', {
        target: {
          value: password,
        },
      });
      await wrapper.find('[data-testid="password-confirmation-form-input-field"] input').simulate('change', {
        target: {
          value: password,
        },
      });
      await wrapper.find('[data-testid="register-form-submit-btn"] button').simulate('click');
      expect(registerSpy).toHaveBeenCalledWith({
        email, name, username, password, passwordConfirmation: password,
      });
    });
  });
});
