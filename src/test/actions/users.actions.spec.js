import UsersActions from '../../actions/users.actions';
import { user } from '../fixtures';

describe('UsersActions', () => {
  const { item } = user;
  const token = 'token here';
  let dispatchSpy;

  describe('login', () => {
    const payload = {
      items: [item],
      token,
    };

    let apiSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn((x) => x);
      apiSpy = jest.spyOn(UsersActions.Api, 'login')
        .mockImplementation(async () => payload);
    });

    it('sends the right dispatch', async () => {
      const { email, password } = item;
      const action = UsersActions.login({
        email,
        password,
      });
      await action(dispatchSpy);

      expect(apiSpy).toHaveBeenCalledWith({
        email,
        password,
      });

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: UsersActions.types.SET,
        payload,
      });
    });
  });

  describe('logout', () => {
    let removeTokenSpy;

    beforeEach(() => {
      dispatchSpy = jest.fn((x) => x);
      removeTokenSpy = jest.spyOn(UsersActions.Api, 'removeToken');
    });

    it('sends the right dispatch', async () => {
      const action = UsersActions.logout();
      await action(dispatchSpy);

      expect(removeTokenSpy).toHaveBeenCalled();

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: UsersActions.types.REMOVE,
      });
    });
  });

  describe('self', () => {
    let apiSpy;
    const payload = {
      item,
    };

    beforeEach(() => {
      dispatchSpy = jest.fn((x) => x);
      apiSpy = jest.spyOn(UsersActions.Api, 'self')
        .mockImplementation(async () => payload);
    });

    describe('when authenticated', () => {
      beforeEach(() => {
        jest.spyOn(UsersActions.Api, 'isAuthenticated').mockImplementation(() => true);
      });

      it('sends the user as a payload', async () => {
        const action = UsersActions.self();
        await action(dispatchSpy);

        expect(apiSpy).toHaveBeenCalled();
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: UsersActions.types.SET,
          payload,
        });
      });
    });

    describe('when not authenticated', () => {
      beforeEach(() => {
        jest.spyOn(UsersActions.Api, 'isAuthenticated').mockImplementation(() => false);
      });

      it('does not dispatch', async () => {
        const action = UsersActions.self();
        await action(dispatchSpy);

        expect(apiSpy).not.toHaveBeenCalled();
        expect(dispatchSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('types', () => {
    const userTypes = {
      INDEX: 'get all users',
      FILTER: 'filter users',
      CREATE: 'create user',
      UPDATE: 'update user',
      SET: 'set user',
      FETCHING: 'fetching user',
      REMOVE: 'remove user',
    };

    it('returns the right ones', () => {
      expect(UsersActions.types).toEqual(userTypes);
    });
  });
});
