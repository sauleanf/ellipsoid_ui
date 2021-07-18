import UserApi from '../../api/user.api';
import {
  mockRequest,
  testIndex,
  testShow,
} from './api.helpers';
import {
  user,
} from '../fixtures';
import AuthApi from '../../api/auth.api';
import { GET, POST } from '../../api/methods';

describe('UserApi', () => {
  const url = 'localhost/api/v1/users';
  const {
    raw,
    item,
  } = user;
  const { email } = item;
  const password = 'password2';
  const token = '_token';

  describe('Inheritance', () => {
    it('extends AuthApi', () => {
      expect(UserApi.prototype instanceof AuthApi).toBe(true);
    });
  });

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

  describe('login', () => {
    beforeEach(() => {
      mockRequest('localhost/api/v1/auth', POST, {
        item: raw,
        token,
      });
    });

    it('returns the appropriate data', async () => {
      const data = await UserApi.login({ email, password });
      expect(data).toEqual({
        item,
      });
      expect(UserApi.retrieveToken()).toEqual(token);
    });
  });

  describe('self', () => {
    beforeEach(() => {
      mockRequest(url, GET, {
        item: raw,
      }, token);
      UserApi.setToken({ token });
    });

    it('returns the appropriate data', async () => {
      const data = await UserApi.self();
      expect(data).toEqual({
        item,
      });
    });
  });
});
