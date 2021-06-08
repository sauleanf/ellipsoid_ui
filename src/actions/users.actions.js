import ApiActions from './api.actions';
import UserApi from '../api/user.api';

class UsersActions extends ApiActions {
  static get Api() { return UserApi; }
}

export default UsersActions;
