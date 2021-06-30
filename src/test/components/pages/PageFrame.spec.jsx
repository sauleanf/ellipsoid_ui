import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../../reducers';
import { PagesActions } from '../../../actions';
import PageFrame from '../../../components/pages/PageFrame';
import RegistrationPage from '../../../components/pages/registration/RegistrationPage';
import { groups } from '../../../components/pages/config/constants';
import LoadingPage from '../../../components/pages/loading/LoadingPage';
import MapPage from '../../../components/pages/map/MapPage';
import FeedPage from '../../../components/pages/feed/FeedPage';
import ProfilePage from '../../../components/pages/profile/ProfilePage';
import LoginPage from '../../../components/pages/login/LoginPage';
import RegistrationCompletedPage from '../../../components/pages/registrationCompleted/RegistrationCompletedPage';

import { mockOutRequests } from '../../actions/actions.helpers';

describe('PageFrame', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <PageFrame />
      </Provider>,
    );

    mockOutRequests();
  });

  it('displays the default page', () => {
    expect(wrapper.find(LoadingPage).exists()).toBe(true);
  });

  describe('AUTH', () => {
    beforeEach(() => {
      store.dispatch(PagesActions.setPageGroup(groups.AUTH));
      wrapper.update();
    });

    it('displays the default page', () => {
      const pageWrapper = wrapper.find(MapPage);

      expect(pageWrapper.exists()).toBe(true);
    });

    it('displays the other pages', () => {
      _.each({
        profile: ProfilePage,
        map: MapPage,
        feed: FeedPage,
      }, (PageComponent, pageName) => {
        store.dispatch(PagesActions.push(pageName));
        wrapper.update();
        const pageWrapper = wrapper.find(PageComponent);

        expect(pageWrapper.exists()).toBe(true);
      });
    });
  });

  describe('DEFAULT', () => {
    beforeEach(() => {
      store.dispatch(PagesActions.setPageGroup(groups.DEFAULT));
      wrapper.update();
    });

    it('displays the default page', () => {
      const pageWrapper = wrapper.find(MapPage);

      expect(pageWrapper.exists()).toBe(true);
    });

    it('displays the other pages', () => {
      _.each({
        login: LoginPage,
        map: MapPage,
        registration: RegistrationPage,
        registrationCompleted: RegistrationCompletedPage,
      }, (PageComponent, pageName) => {
        store.dispatch(PagesActions.push(pageName));
        wrapper.update();
        const pageWrapper = wrapper.find(PageComponent);

        expect(pageWrapper.exists()).toBe(true);
      });
    });
  });
});
