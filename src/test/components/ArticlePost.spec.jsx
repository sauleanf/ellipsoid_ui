import React from 'react';
import { mount } from 'enzyme';
import ArticlePost from '../../components/ArticlePost';
import { article } from '../fixtures';

describe('ArticlePost', () => {
  const { item } = article;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ArticlePost article={item} />);
  });

  it('renders the article components correctly', () => {
    expect(wrapper.find('.article-link').text()).toEqual(item.title);
    expect(wrapper.find('.article-date').text()).toEqual(item.publishedAt.calendar());
    expect(wrapper.find('.article-location').text()).toEqual(item.location.name);
  });
});
