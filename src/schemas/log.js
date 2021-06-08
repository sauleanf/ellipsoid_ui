import Schema from './schema';
import types from './types';

class Log extends Schema {
  static get type() {
    return 'log';
  }

  static get fields() {
    return {
      message: {
        type: types.String,
      },
      error: {
        type: types.String,
      },
      type: {
        type: types.String,
      },
      createdAt: {
        type: types.DateTime,
        immutable: true,
      },
      finishedAt: {
        type: types.DateTime,
        immutable: true,
      },
    };
  }
}

export default Log;
