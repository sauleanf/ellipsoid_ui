import Newspaper from '../../schemas/newspaper';
import {
  runDeserializeItemTests,
  runDeserializeListTests,
  runTypeTests,
  runPropTypeTest,
} from './schema.helpers';
import {
  newspaper,
} from '../fixtures';

describe('Newspaper', () => {
  const {
    item,
    raw,
  } = newspaper;

  runTypeTests({
    Schema: Newspaper,
    type: 'newspaper',
  });

  runDeserializeItemTests({
    Schema: Newspaper,
    item,
    raw,
  });

  runDeserializeListTests({
    Schema: Newspaper,
    item,
    raw,
  });

  runPropTypeTest({
    Schema: Newspaper,
    item,
  });
});
