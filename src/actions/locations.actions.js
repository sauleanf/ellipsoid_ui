import ApiActions from './api.actions';
import LocationApi from '../api/location.api';

class LocationActions extends ApiActions {
  static get Api() {
    return LocationApi;
  }

  static get filterParams() {
    return ['name'];
  }

  static get types() {
    const typeBases = super.types;
    typeBases.SET_COORDINATES = 'set coordinates';

    return typeBases;
  }
}

export default LocationActions;
