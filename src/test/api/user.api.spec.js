import UserApi from '../../api/user.api';
import {
  testIndex,
  testShow,
} from './api.helpers';
import {
  user,
} from '../fixtures';

describe('UserApi', () => {
  const url = 'localhost/api/v1/users/';
  const {
    raw,
    item,
  } = user;

  testIndex({
    Api: UserApi,
    url,
    item,
    raw,
  });

  testShow({
    Api: UserApi,
    url,
    item,
    raw,
  });
});
