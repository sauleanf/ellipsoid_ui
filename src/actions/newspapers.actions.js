import ApiActions from './api.actions';
import NewsPaperApi from '../api/newspaper.api';

class NewsPaperActions extends ApiActions {
  static get Api() { return NewsPaperApi; }

  static get filterParams() { return ['name']; }
}

export default NewsPaperActions;
