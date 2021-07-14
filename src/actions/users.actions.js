import ApiActions from './api.actions';
import UserApi from '../api/user.api';
import PagesActions from './pages.actions';

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
        const error = JSON.parse(e.request.response);
        dispatch(PagesActions.setErrors(error));
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
    return async (dispatch) => {
      this.Api.removeToken();
      dispatch({
        type: this.types.REMOVE,
      });
    };
  }
}

export default UsersActions;
