import Api from './api';
import Registration from '../schemas/registration';

class RegistrationApi extends Api {
  static get Schema() { return Registration; }
}

export default RegistrationApi;
