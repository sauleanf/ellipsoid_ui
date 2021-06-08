import Api from './api';
import Article from '../schemas/article';

class ArticleApi extends Api {
  static get Schema() { return Article; }
}

export default ArticleApi;
