import Schema from './schema';
import types from './types';
import LocationModel from './location';
import Newspaper from './newspaper';

class Article extends Schema {
  static get type() {
    return 'article';
  }

  static get fields() {
    return {
      title: {
        type: types.String,
      },
      link: {
        type: types.String,
      },
      newspaper: {
        type: types.Association,
        schema: Newspaper,
      },
      location: {
        type: types.Association,
        schema: LocationModel,
      },
      publishedAt: {
        type: types.DateTime,
        immutable: true,
      },
    };
  }
}

export default Article;
