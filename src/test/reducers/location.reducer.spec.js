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
  const state = {
    coordinates: [],
  };

  testFetching({
    Actions: LocationsActions,
    reduce: LocationReducer,
    state,
  });

  testIndex({
    Actions: LocationsActions,
    reduce: LocationReducer,
    item,
    state,
  });

  testSet({
    Actions: LocationsActions,
    reduce: LocationReducer,
    item,
    state,
  });
});
