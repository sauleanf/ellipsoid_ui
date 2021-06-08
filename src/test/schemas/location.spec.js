import Location from '../../schemas/location';
import {
  runDeserializeItemTests,
  runDeserializeListTests,
  runTypeTests,
  runPropTypeTest,
} from './schema.helpers';
import {
  location,
} from '../fixtures';

describe('Location', () => {
  const {
    raw,
    item,
  } = location;

  runTypeTests({
    Schema: Location,
    type: 'location',
  });

  runDeserializeItemTests({
    Schema: Location,
    item,
    raw,
  });

  runDeserializeListTests({
    Schema: Location,
    item,
    raw,
  });

  runPropTypeTest({
    Schema: Location,
    item,
  });
});
