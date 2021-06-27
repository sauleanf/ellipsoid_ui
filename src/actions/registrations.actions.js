import ApiActions from './api.actions';
import RegistrationApi from '../api/registration.api';

class RegistrationsActions extends ApiActions {
  static get Api() {
    return RegistrationApi;
  }
}

export default RegistrationsActions;
