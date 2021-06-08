import Article from '../../schemas/article';
import {
  runDeserializeItemTests,
  runDeserializeListTests,
  runTypeTests,
  runPropTypeTest,
} from './schema.helpers';
import {
  article,
} from '../fixtures';

describe('Article', () => {
  const {
    item,
    raw,
  } = article;

  runTypeTests({
    Schema: Article,
    type: 'article',
  });

  runDeserializeItemTests({
    Schema: Article,
    item,
    raw,
  });

  runDeserializeListTests({
    Schema: Article,
    item,
    raw,
  });

  runPropTypeTest({
    Schema: Article,
    item,
  });
});
