import ArticlesActions from '../../actions/articles.actions';
import { testGet, testGetAll } from './actions.helpers';
import { article } from '../fixtures';

describe('ArticlesActions', () => {
  testGetAll({ Actions: ArticlesActions, item: article });

  testGet({ Actions: ArticlesActions, item: article });

  describe('types', () => {
    const articleTypes = {
      INDEX: 'get all articles',
      FILTER: 'filter articles',
      CREATE: 'create article',
      UPDATE: 'update article',
      SET: 'set article',
      FETCHING: 'fetching article',
    };

    it('returns the right ones', () => {
      expect(ArticlesActions.types).toEqual(articleTypes);
    });
  });
});
