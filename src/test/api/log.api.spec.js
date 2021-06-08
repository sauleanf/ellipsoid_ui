import LogApi from '../../api/log.api';
import {
  testIndex,
  testShow,
} from './api.helpers';
import {
  log,
} from '../fixtures';

describe('LogApi', () => {
  const url = 'localhost/api/v1/logs/';
  const {
    item,
    raw,
  } = log;

  testIndex({
    Api: LogApi,
    url,
    item,
    raw,
  });

  testShow({
    Api: LogApi,
    url,
    item,
    raw,
  });
});
