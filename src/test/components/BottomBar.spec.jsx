import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { UsersActions } from '../../actions';
import rootReducer from '../../reducers';
import BottomBar from '../../components/BottomBar';
import LoginMenu from '../../components/LoginMenu';
import Profile from '../../components/Profile';
import { user } from '../fixtures';

describe('BottomBar', () => {
  const { item } = user;
  const { email } = user;
  const password = 'password';
  const token = 'token here';
  const payload = {
    item,
    token,
  };
  let wrapper;
  let store;

  beforeEach(async () => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = await mount(
      <Provider store={store}>
        <BottomBar />
      </Provider>,
    );

    jest.spyOn(UsersActions.Api, 'login').mockImplementation(async () => payload);
  });

  describe('when not authenticated', () => {
    it('renders nothing before button is clicked', () => {
      expect(wrapper.find('#user-menu-modal').props().isOpen).toBe(false);
    });

    it('displays the login page', () => {
      const btn = wrapper.find('#open-user-menu-btn button');
      btn.simulate('click');
      expect(wrapper.find('#user-menu-modal').props().isOpen).toBe(true);

      expect(wrapper.find(LoginMenu).exists()).toEqual(true);
      expect(wrapper.find(Profile).exists()).toEqual(false);
    });
  });

  describe('when authenticated', () => {
    beforeEach(async () => {
      await store.dispatch(UsersActions.login({ email, password }));
    });

    it('renders nothing before button is clicked', () => {
      expect(wrapper.find('#user-menu-modal').props().isOpen).toBe(false);
    });

    describe('login menu', () => {
      it('displays the profile page', () => {
        const btn = wrapper.find('#open-user-menu-btn button');
        btn.simulate('click');

        expect(wrapper.find(LoginMenu).exists()).toEqual(false);
        expect(wrapper.find(Profile).exists()).toEqual(true);
      });
    });
  });
});
