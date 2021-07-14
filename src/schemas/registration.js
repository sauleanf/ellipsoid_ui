import Schema from './schema';
import types from './types';

class Registration extends Schema {
  static get type() {
    return 'registration';
  }

  static get fields() {
    return {
      activated: {
        type: types.Boolean,
      },
    };
  }
}

export default Registration;
