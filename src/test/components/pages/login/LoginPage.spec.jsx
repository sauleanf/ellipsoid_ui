import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { PagesActions, UsersActions } from '../../../../actions';
import rootReducer from '../../../../reducers';
import LoginPage from '../../../../components/pages/login/LoginPage';
import { user } from '../../../fixtures';
import { pages } from '../../../../components/pages/config/constants';

describe('LoginPage', () => {
  const { item } = user;
  const { email } = item;
  const password = 'password';
  const token = 'token here';
  const payload = {
    item,
    token,
  };
  let loginSpy;
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
        <LoginPage />
      </Provider>,
    );

    loginSpy = jest.spyOn(UsersActions.Api, 'login').mockImplementation(async () => payload);
    pagesSpy = jest.spyOn(PagesActions, 'push').mockImplementation(() => async (dispatch) => dispatch({
      type: 'foo',
    }));
  });

  describe('login', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('[data-testid="email-form-input-field"] input').simulate('change', {
        target: {
          value: email,
        },
      });
      await wrapper.find('[data-testid="password-form-input-field"] input').simulate('change', {
        target: {
          value: password,
        },
      });
      await wrapper.find('[data-testid="login-form-submit-btn"] button').simulate('click');
      expect(loginSpy).toHaveBeenCalledWith({ email, password });
    });
  });

  describe('registration page', () => {
    it('triggers a dispatch', async () => {
      await wrapper.find('[date-testid="visit-registration-page-btn"] button').simulate('click');
      expect(pagesSpy).toHaveBeenCalledWith(pages.REGISTRATION);
    });
  });
});
