import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { LocationsActions } from '../../actions';

import rootReducer from '../../reducers';
import TopBar from '../../components/TopBar';
import { article } from '../fixtures';

describe('TopBar', () => {
  const filterParam = 'filter these';
  const { item } = article;
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <TopBar />
      </Provider>,
    );

    jest.spyOn(LocationsActions.Api, 'index')
      .mockImplementation(async () => ({
        items: [item],
        page: 1,
        pages: 2,
      }));
  });

  it('typing in the search bar makes a dispatch', async () => {
    expect(store.getState().locations.filtered.param).toEqual('');
    await wrapper.find('input').simulate('change', {
      target: {
        value: filterParam,
      },
    });
    const locationState = store.getState().locations;
    expect(locationState.filtered).toEqual({
      items: [item],
      page: 1,
      pages: 2,
      param: filterParam,
    });
  });

  it('clicking the clear btn makes a dispatch', () => {
    wrapper.find('input').simulate('change', {
      target: {
        value: filterParam,
      },
    });
    wrapper.find('.search-bar-clear-btn').simulate('click');
    expect(store.getState().articles.filtered.param).toEqual('');
  });
});
