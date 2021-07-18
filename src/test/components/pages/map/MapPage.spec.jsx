import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { LocationsActions } from '../../../../actions';
import rootReducer from '../../../../reducers';
import { location } from '../../../fixtures';
import MapPage from '../../../../components/pages/map/MapPage';
import TopBar from '../../../../components/TopBar';
import { MapContainer } from '../../../../components/blocks';

describe('MapPage', () => {
  const originalLocations = [location.item];
  const filteredLocations = [{
    id: 'id-id-id1',
    name: 'Boston',
    coordinates: [13, -1],
  }];
  const locationPayload = {
    items: originalLocations,
    page: 1,
    pages: 2,
  };
  const filteredLocationPayload = {
    items: filteredLocations,
    page: 1,
    pages: 2,
  };

  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    jest.spyOn(LocationsActions.Api, 'index').mockImplementation(async () => locationPayload);

    wrapper = mount(
      <Provider store={store}>
        <MapPage />
      </Provider>,
    );
  });

  it('renders its children', () => {
    wrapper.update();
    expect(wrapper.find(TopBar).exists()).toBe(true);
    expect(wrapper.find(MapContainer).exists()).toBe(true);
  });

  describe('MapContainer Locations', () => {
    describe('before filtering', () => {
      it('passes the right locations', () => {
        wrapper.update();
        const props = wrapper.find(MapContainer).props();
        const { locations } = props;
        expect(locations).toEqual(originalLocations);
      });
    });

    describe('after filtering', () => {
      beforeEach(() => {
        jest.spyOn(LocationsActions.Api, 'index').mockImplementation(async () => filteredLocationPayload);
        store.dispatch(LocationsActions.filter('1'));
      });

      it('passes the right locations', () => {
        wrapper.update();
        const props = wrapper.find(MapContainer).props();
        const { locations } = props;
        expect(locations).toEqual(filteredLocations);
      });
    });
  });
});
