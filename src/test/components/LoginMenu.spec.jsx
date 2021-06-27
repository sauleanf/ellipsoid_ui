import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { UsersActions } from '../../actions';

import rootReducer from '../../reducers';
import LoginMenu from '../../components/LoginMenu';
import { user } from '../fixtures';

describe('LoginMenu', () => {
  const { item } = user;
  const { email } = user;
  const password = 'password';
  const token = 'token here';
  const payload = {
    item,
    token,
  };
  let loginSpy;
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <LoginMenu />
      </Provider>,
    );

    loginSpy = jest.spyOn(UsersActions.Api, 'login').mockImplementation(async () => payload);
  });

  describe('login', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('#form-input-field-email input').simulate('change', {
        target: {
          value: email,
        },
      });
      await wrapper.find('#form-input-field-password input').simulate('change', {
        target: {
          value: password,
        },
      });
      await wrapper.find('.login-menu-container .form-btn-container button').simulate('click');
      expect(loginSpy).toHaveBeenCalledWith({ email, password });
    });
  });
});
