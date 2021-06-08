import Api from './api';
import NewsPaper from '../schemas/newspaper';

class NewsPaperApi extends Api {
  static get Schema() { return NewsPaper; }
}

export default NewsPaperApi;
