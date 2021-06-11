import ApiActions from './api.actions';
import LocationApi from '../api/location.api';

class LocationActions extends ApiActions {
  static get Api() {
    return LocationApi;
  }

  static get filterParams() {
    return ['name'];
  }
}

export default LocationActions;
