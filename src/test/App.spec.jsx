import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import App from '../App';
import { user } from './fixtures';
import {
  UsersActions,
} from '../actions';
import PageFrame from '../components/pages/PageFrame';
import { groups } from '../components/pages/config/constants';
import { mockOutRequests } from './actions/actions.helpers';

describe('App', () => {
  const { item } = user;
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    jest.spyOn(UsersActions.Api, 'isAuthenticated').mockImplementation(() => false);
    jest.spyOn(UsersActions.Api, 'self').mockImplementation(() => ({
      item: {},
    }));

    mockOutRequests();

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('renders the page frame', () => {
    expect(wrapper.find(PageFrame).exists()).toBe(true);
  });

  describe('when the user has not been fetched and is not authenticated', () => {
    beforeEach(() => {
      jest.spyOn(UsersActions.Api, 'self').mockImplementation(() => ({
        item: {},
      }));
      jest.spyOn(UsersActions.Api, 'isAuthenticated').mockImplementation(() => false);
    });

    it('sends the right dispatch', () => {
      wrapper.update();
      const state = store.getState();
      expect(state.pages.group).toEqual(groups.DEFAULT);
    });
  });

  describe('when the user has  been fetched', () => {
    beforeEach(() => {
      jest.spyOn(UsersActions.Api, 'self').mockImplementation(() => ({
        item,
      }));
      jest.spyOn(UsersActions.Api, 'isAuthenticated').mockImplementation(() => true);
      store.dispatch(UsersActions.self());
    });

    it('sends the right dispatch', () => {
      wrapper.update();
      const state = store.getState();
      expect(state.pages.group).toEqual(groups.AUTH);
    });
  });
});
