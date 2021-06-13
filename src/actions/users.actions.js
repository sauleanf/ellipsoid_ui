import _ from 'lodash';
import ApiActions from './api.actions';
import UserApi from '../api/user.api';
import { setError } from './errors.actions';

class UsersActions extends ApiActions {
  static get Api() {
    return UserApi;
  }

  static login({ email, password }) {
    return async (dispatch) => {
      try {
        const payload = await this.Api.login({ email, password });
        dispatch({
          type: this.types.SET,
          payload,
        });
      } catch (e) {
        if (_.has(e, 'request')) dispatch(setError(JSON.parse(e.request.response)));
        else dispatch(setError(e));
      }
    };
  }

  static logout() {
    return async (dispatch) => {
      await this.Api.logout();
      dispatch({
        type: this.types.LOGOUT,
      });
    };
  }

  static get types() {
    const typeMap = super.types;
    typeMap.SELF = 'get self';
    typeMap.LOGOUT = 'logout user';

    return typeMap;
  }
}

export default UsersActions;
