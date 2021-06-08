import Schema from './schema';
import types from './types';

class User extends Schema {
  static get type() { return 'user'; }

  static get fields() {
    return {
      name: { type: types.String },
      email: { type: types.String },
      username: { type: types.String },
      profileImage: { type: types.String },
    };
  }
}

export default User;
