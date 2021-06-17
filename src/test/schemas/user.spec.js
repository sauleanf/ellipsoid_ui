import User from '../../schemas/user';
import {
  runDeserializeItemTests,
  runDeserializeListTests,
  runTypeTests,
  runPropTypeTest,
} from './schema.helpers';
import {
  user,
} from '../fixtures';

describe('User', () => {
  const {
    item,
    raw,
  } = user;

  runTypeTests({
    Schema: User,
    type: 'user',
  });

  runDeserializeItemTests({
    Schema: User,
    item,
    raw,
  });

  runDeserializeListTests({
    Schema: User,
    item,
    raw,
  });

  runPropTypeTest({
    Schema: User,
    item,
  });
});
