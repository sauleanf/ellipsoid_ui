import NewsPapersActions from '../../actions/newspapers.actions';
import { testGet, testGetAll } from './actions.helpers';
import { newspaper } from '../fixtures';

describe('NewsPapersActions', () => {
  testGetAll({ Actions: NewsPapersActions, item: newspaper });

  testGet({ Actions: NewsPapersActions, item: newspaper });

  describe('types', () => {
    const newspaperTypes = {
      INDEX: 'get all newspapers',
      FILTER: 'filter newspapers',
      CREATE: 'create newspaper',
      UPDATE: 'update newspaper',
      SET: 'set newspaper',
      REMOVE: 'remove newspaper',
      FETCHING: 'fetching newspaper',
    };

    it('returns the right ones', () => {
      expect(NewsPapersActions.types).toEqual(newspaperTypes);
    });
  });
});
