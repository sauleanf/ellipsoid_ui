import _ from 'lodash';
import AuthApi from './auth.api';
import User from '../schemas/user';
import { POST } from './methods';

class UserApi extends AuthApi {
  static get Schema() {
    return User;
  }

  static async login({ email, password }) {
    const data = await this.request({
      endpoint: _.join([process.env.REACT_APP_API, 'api/v1/auth'], '/'),
      method: POST,
      requestData: {
        email,
        password,
      },
    });

    await this.setToken(data);
    return _.pick(data, 'item');
  }

  static async self() {
    return this.request({ endpoint: _.join([process.env.REACT_APP_API, 'api/v1/auth'], '/') });
  }
}

export default UserApi;
