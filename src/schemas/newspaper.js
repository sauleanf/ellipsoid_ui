import Schema from './schema';
import types from './types';

class NewsPaper extends Schema {
  static get type() {
    return 'newspaper';
  }

  static get fields() {
    return {
      description: {
        type: types.String,
      },
      name: {
        type: types.String,
      },
      link: {
        type: types.String,
      },
    };
  }
}

export default NewsPaper;
