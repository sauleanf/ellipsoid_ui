import LocationsActions from '../../actions/locations.actions';
import { testGet, testGetAll } from './actions.helpers';
import { location } from '../fixtures';

describe('LocationsActions', () => {
  testGetAll({ Actions: LocationsActions, item: location });

  testGet({ Actions: LocationsActions, item: location });

  describe('types', () => {
    const locationTypes = {
      INDEX: 'get all locations',
      FILTER: 'filter locations',
      CREATE: 'create location',
      UPDATE: 'update location',
      SET: 'set location',
      FETCHING: 'fetching location',
    };

    it('returns the right ones', () => {
      expect(LocationsActions.types).toEqual(locationTypes);
    });
  });
});
