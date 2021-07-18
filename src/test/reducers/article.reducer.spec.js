import ArticleReducer from '../../reducers/article.reducer';
import ArticlesActions from '../../actions/articles.actions';
import {
  article,
} from '../fixtures';
import {
  testFetching,
  testSet,
} from './api.reducer.helpers';

describe('ArticlesReducer', () => {
  const { item } = article;
  const state = {
    coordinates: [],
  };
  const coordinates = [1, -2];
  testFetching({
    Actions: ArticlesActions,
    reduce: ArticleReducer,
    state,
  });

  describe('INDEX', () => {
    it('sets the items and fetching', () => {
      const newState = ArticleReducer(undefined, {
        type: ArticlesActions.types.INDEX,
        payload: {
          items: [item],
          page: 1,
          pages: 2,
          coordinates,
        },
      });
      expect(newState).toEqual({
        items: [item],
        item: {},
        filtered: {
          items: [],
          page: -1,
          pages: 0,
          param: '',
        },
        coordinates,
        page: 1,
        pages: 2,
        loaded: true,
      });
    });
  });

  testSet({
    Actions: ArticlesActions,
    reduce: ArticleReducer,
    item,
    state,
  });
});
