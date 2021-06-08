import AuthApi from './auth.api';
import Log from '../schemas/log';

class LogApi extends AuthApi {
  static get Schema() { return Log; }
}

export default LogApi;
