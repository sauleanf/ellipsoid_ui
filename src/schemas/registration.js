import Schema from './schema';
import types from './types';

class Registration extends Schema {
  static get type() {
    return 'registration';
  }

  static get fields() {
    return {
      code: {
        type: types.Number,
      },
    };
  }
}

export default Registration;
