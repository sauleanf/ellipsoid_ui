import LocationApi from '../../api/location.api';
import {
  testIndex,
  testShow,
} from './api.helpers';
import {
  location,
} from '../fixtures';

describe('LocationApi', () => {
  const url = 'api/v1/locations/';
  const {
    raw,
    item,
  } = location;

  testIndex({
    Api: LocationApi,
    url,
    item,
    raw,
  });

  testShow({
    Api: LocationApi,
    url,
    item,
    raw,
  });
});
