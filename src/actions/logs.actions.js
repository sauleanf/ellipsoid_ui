import ApiActions from './api.actions';
import LogApi from '../api/log.api';

class LogsActions extends ApiActions {
  static get Api() { return LogApi; }
}

export default LogsActions;
