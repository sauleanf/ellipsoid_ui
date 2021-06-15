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

  static self() {
    return async (dispatch) => {
      if (this.Api.isAuthenticated()) {
        try {
          const payload = await this.Api.self();
          dispatch({
            type: this.types.SET,
            payload,
          });
        } catch (e) {
          await this.Api.removeToken();
        }
      }
    };
  }

  static logout() {
    return (dispatch) => {
      this.Api.removeToken();
      dispatch({
        type: this.types.REMOVE,
      });
    };
  }
}

export default UsersActions;
