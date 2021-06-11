import LocationReducer from '../../reducers/location.reducer';
import LocationsActions from '../../actions/locations.actions';
import {
  location,
} from '../fixtures';
import {
  testFetching,
  testIndex,
  testSet,
} from './api.reducer.helpers';

describe('LocationsReducer', () => {
  const { item } = location;

  testFetching({
    Actions: LocationsActions,
    reduce: LocationReducer,
  });

  testIndex({
    Actions: LocationsActions,
    reduce: LocationReducer,
    item,
  });

  testSet({
    Actions: LocationsActions,
    reduce: LocationReducer,
    item,
  });
});
