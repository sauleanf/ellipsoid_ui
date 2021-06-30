import { combineReducers } from 'redux';

import articleReducer from './article.reducer';
import errorReducer from './error.reducer';
import locationReducer from './location.reducer';
import newsPaperReducer from './newspaper.reducer';
import pageReducer from './page.reducer';
import registrationReducer from './registration.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  errors: errorReducer,
  locations: locationReducer,
  newspapers: newsPaperReducer,
  pages: pageReducer,
  registrations: registrationReducer,
  users: userReducer,
});

export default rootReducer;
