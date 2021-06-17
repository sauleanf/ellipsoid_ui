import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import App from '../App';
import { location, newspaper } from "./fixtures";
import {LocationsActions, NewsPapersActions, UsersActions} from "../actions";
import MainPage from "../components/MainPage";

describe('App', () => {
  let wrapper;
  let store;

  let fetchLocationsSpy;
  let fetchUserSpy;
  let fetchNewspaperSpy;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    fetchLocationsSpy = jest.spyOn(LocationsActions.Api, 'index')
      .mockImplementation(async () => ({
        items: [location.item],
        page: 1,
        pages: 2,
      }));
    fetchUserSpy = jest.spyOn(UsersActions.Api, 'isAuthenticated').mockImplementation(() => false);
    fetchNewspaperSpy = jest.spyOn(NewsPapersActions.Api, 'index')
      .mockImplementation(async () => ({
        items: [newspaper.item],
        page: 2,
        pages: 3,
      }));

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('renders the text props', () => {
    expect(wrapper.find(MainPage).exists()).toBe(true);
  });
});