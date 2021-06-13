import { combineReducers } from 'redux';

import articleReducer from './article.reducer';
import locationReducer from './location.reducer';
import newsPaperReducer from './newspaper.reducer';
import errorReducer from './error.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  locations: locationReducer,
  newspapers: newsPaperReducer,
  errors: errorReducer,
  users: userReducer,
});

export default rootReducer;
