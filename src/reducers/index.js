import { combineReducers } from 'redux';

import ArticleReducer from './article.reducer';
import LocationReducer from './location.reducer';
import NewsPaperReducer from './newspaper.reducer';

const rootReducer = combineReducers({
  articles: ArticleReducer,
  locations: LocationReducer,
  newspapers: NewsPaperReducer,
});

export default rootReducer;
