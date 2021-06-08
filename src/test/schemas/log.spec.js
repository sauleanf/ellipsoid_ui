import Log from '../../schemas/log';
import {
  runDeserializeItemTests,
  runDeserializeListTests,
  runTypeTests,
  runPropTypeTest,
} from './schema.helpers';
import {
  log,
} from '../fixtures';

describe('Log', () => {
  const {
    raw,
    item,
  } = log;

  runTypeTests({
    Schema: Log,
    type: 'log',
  });

  runDeserializeItemTests({
    Schema: Log,
    item,
    raw,
  });

  runDeserializeListTests({
    Schema: Log,
    item,
    raw,
  });

  runPropTypeTest({
    Schema: Log,
    item,
  });
});
