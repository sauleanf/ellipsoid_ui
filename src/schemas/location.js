import Schema from './schema';
import types from './types';

class Location extends Schema {
  static get type() {
    return 'location';
  }

  static get fields() {
    return {
      name: {
        type: types.String,
      },
      coordinates: {
        type: types.Coordinates,
      },
    };
  }
}

export default Location;
