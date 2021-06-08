import NewsPaperApi from '../../api/newspaper.api';
import {
  testIndex,
  testShow,
} from './api.helpers';
import {
  newspaper,
} from '../fixtures';

describe('NewsPaperApi', () => {
  const url = 'api/v1/newspapers/';
  const {
    raw,
    item,
  } = newspaper;

  testIndex({
    Api: NewsPaperApi,
    url,
    item,
    raw,
  });

  testShow({
    Api: NewsPaperApi,
    url,
    item,
    raw,
  });
});
