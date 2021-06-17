import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { ArticlesActions } from '../../actions';

import rootReducer from '../../reducers';
import SideMenu from '../../components/SideMenu';
import { createArticlesAndNewspapers } from '../fixtures';

describe('SideMenu', () => {
  let wrapper;
  let store;
  let newspaperGroups;
  let items;

  const page = 1;
  const pages = 4;

  const lat = 2;
  const lng = 5;

  const newspaperNumber = 2;
  const number = 5;

  beforeEach(async () => {
    newspaperGroups = createArticlesAndNewspapers(newspaperNumber, number);
    items = _.flatten(_.map(newspaperGroups, 'articles'));
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );
    jest.spyOn(ArticlesActions.Api, 'index')
      .mockImplementation(async () => ({
        items,
        page,
        pages,
      }));
    await store.dispatch(ArticlesActions.getAll({
      lat,
      lng,
    }));

    wrapper = mount(
      <Provider store={store}>
        <SideMenu />
      </Provider>,
    );
  });

  const assertArticleFields = (articleWrapper, articleObj) => {
    const { location } = articleObj;
    expect(articleWrapper.find('.article-link').text()).toEqual(articleObj.title);
    expect(articleWrapper.find('.article-date').text()).toEqual(articleObj.publishedAt.calendar());
    expect(articleWrapper.find('.article-location').text()).toEqual(location.name);
  };

  it('divides the articles by newspapers', () => {
    const articleGroupsWrapper = wrapper.find('.article-group-container');
    expect(articleGroupsWrapper.length).toEqual(newspaperNumber);

    articleGroupsWrapper.forEach((articleGroupWrapper, groupIndex) => {
      const newspaperGroup = newspaperGroups[groupIndex];
      expect(articleGroupWrapper.find('.newspaper-name').text()).toEqual(newspaperGroup.newspaper.name);

      const articlePostsWrapper = articleGroupWrapper.find('.article-container');
      expect(articlePostsWrapper.length).toEqual(number);

      articlePostsWrapper.forEach((articlePostWrapper, index) => {
        const article = newspaperGroup.articles[index];
        assertArticleFields(articlePostWrapper, article);
      });
    });
  });

  describe('NewsPaper modal', () => {
    let newspaper;
    beforeEach(() => {
      // eslint-disable-next-line prefer-destructuring
      newspaper = newspaperGroups[0].newspaper;
    });

    it('opens the modal', () => {
      expect(wrapper.find('.modal-body-container .newspaper-modal-name').length)
        .toEqual(0);

      wrapper.find('button.newspaper-name').at(0).simulate('click');
      expect(wrapper.find('.modal-body-container .newspaper-modal-name').text())
        .toEqual(newspaper.name);
      expect(wrapper.find('.modal-body-container .newspaper-modal-description').text())
        .toEqual(newspaper.description);
    });

    it('closes the modal', () => {
      expect(wrapper.find('.modal-body-container .newspaper-modal-name').length)
        .toEqual(0);

      wrapper.find('button.newspaper-name').at(0).simulate('click');
      wrapper.find('.modal-close-btn').at(0).simulate('click');

      expect(wrapper.find('.modal-body-container .newspaper-modal-name').length)
        .toEqual(0);
    });
  });
});
