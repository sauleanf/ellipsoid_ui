import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import BottomBar from '../../components/BottomBar';
import {user} from '../fixtures';
import {Modal} from "../../blocks";

describe('BottomBar', () => {
  const {item} = user;
  const {email} = user;
  const password = 'password';
  const token = 'token here';
  const payload = {
    item,
    token,
  };
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <BottomBar/>
      </Provider>,
    );

  });

  describe('Open Button', () => {
    it('opens the modal', async () => {
      await wrapper.find('#open-user-menu-btn button').simulate('click');
      expect(wrapper.find(Modal).exists()).toBe(true);
    });
  });
});
