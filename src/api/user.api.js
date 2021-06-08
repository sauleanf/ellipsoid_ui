import AuthApi from './auth.api';
import User from '../schemas/user';

class UserApi extends AuthApi {
  static get Schema() { return User; }
}

export default UserApi;
