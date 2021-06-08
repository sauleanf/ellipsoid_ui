import ArticleApi from '../../api/article.api';
import {
  testIndex,
  testShow,
} from './api.helpers';
import {
  article,
} from '../fixtures';

describe('ArticleApi', () => {
  const url = 'localhost/api/v1/articles/';
  const {
    item,
    raw,
  } = article;

  testIndex({
    Api: ArticleApi,
    url,
    item,
    raw,
  });

  testShow({
    Api: ArticleApi,
    url,
    item,
    raw,
  });
});
