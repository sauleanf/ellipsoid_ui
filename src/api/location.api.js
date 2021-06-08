import Api from './api';
import Location from '../schemas/location';

class LocationApi extends Api {
  static get Schema() { return Location; }
}

export default LocationApi;
