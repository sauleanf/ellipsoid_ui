import { combineReducers } from 'redux';

import articleReducer from './article.reducer';
import locationReducer from './location.reducer';
import newsPaperReducer from './newspaper.reducer';
import pageReducer from './page.reducer';
import registrationReducer from './registration.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  articles: articleReducer,
  locations: locationReducer,
  newspapers: newsPaperReducer,
  pages: pageReducer,
  registrations: registrationReducer,
  users: userReducer,
});

export default rootReducer;
