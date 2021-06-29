import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { UsersActions } from '../../../actions';

import rootReducer from '../../../reducers';
import Profile from '../../../components/pages/profile/ProfilePage';
import { user } from '../../fixtures';

describe('ProfilePage', () => {
  const { item } = user;
  const { email } = user;
  const password = 'password';
  const token = 'token here';
  const payload = {
    item,
    token,
  };
  let logoutSpy;
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    logoutSpy = jest.spyOn(UsersActions, 'logout').mockImplementation(() => async (dispatch) => dispatch({
      type: 'foo',
    }));
    jest.spyOn(UsersActions.Api, 'login').mockImplementation(async () => payload);
    store.dispatch(UsersActions.login({ email, password }));
  });

  it('displays the right user information', () => {
    expect(wrapper.find('#user-email-list-item').text()).toEqual(item.email);
    expect(wrapper.find('#user-name-list-item').text()).toEqual(item.name);
  });

  describe('logout', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('#logout-list-item-btn').simulate('click');
      expect(logoutSpy).toHaveBeenCalled();
    });
  });
});
