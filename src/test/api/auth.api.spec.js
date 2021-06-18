import AuthApi from '../../api/auth.api';

describe('UserApi', () => {
  const token = '_token';

  describe('tokens', () => {
    it('enables setting and getting tokens', () => {
      expect(AuthApi.retrieveToken()).toEqual(null);
      AuthApi.setToken({ token });
      expect(AuthApi.retrieveToken()).toEqual(token);
    });

    it('enables removing tokens', () => {
      AuthApi.setToken({ token });
      expect(AuthApi.retrieveToken()).toEqual(token);
      AuthApi.removeToken();
      expect(AuthApi.retrieveToken()).toEqual(null);
    });
  });

  describe('isAuthenticated', () => {
    describe('when there is no token', () => {
      it('returns false', () => {
        expect(AuthApi.isAuthenticated()).toBe(false);
      })
    })

    describe('when there is a token', () => {
      beforeEach(() => {
        AuthApi.setToken({ token });
      })

      it('returns true', () => {
        expect(AuthApi.isAuthenticated()).toBe(true);
      })
    })
  });
});
