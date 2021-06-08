import ApiActions from './api.actions';
import ArticleApi from '../api/article.api';

class ArticlesActions extends ApiActions {
  static get Api() {
    return ArticleApi;
  }
}

export default ArticlesActions;
