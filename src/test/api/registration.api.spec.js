import RegistrationApi from '../../api/registration.api';
import {
  testIndex,
  testShow,
} from './api.helpers';
import {
  registration,
} from '../fixtures';

describe('RegistrationApi', () => {
  const url = 'localhost/api/v1/registrations';
  const {
    item,
    raw,
  } = registration;

  testIndex({
    Api: RegistrationApi,
    url,
    item,
    raw,
  });

  testShow({
    Api: RegistrationApi,
    url,
    item,
    raw,
  });
});
