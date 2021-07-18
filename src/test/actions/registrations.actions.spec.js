import { RegistrationsActions } from '../../actions';
import { testGet, testGetAll } from './actions.helpers';
import { registration } from '../fixtures';

describe('RegistrationsActions', () => {
  testGetAll({ Actions: RegistrationsActions, item: registration });

  testGet({ Actions: RegistrationsActions, item: registration });

  describe('types', () => {
    const registrationTypes = {
      INDEX: 'get all registrations',
      FILTER: 'filter registrations',
      CREATE: 'create registration',
      UPDATE: 'update registration',
      SET: 'set registration',
      REMOVE: 'remove registration',
      FETCHING: 'fetching registration',
    };

    it('returns the right ones', () => {
      expect(RegistrationsActions.types).toEqual(registrationTypes);
    });
  });
});
