import createApiReducer from './api.reducer';
import ArticlesActions from '../actions/articles.actions';

export default createApiReducer(ArticlesActions, {
  actions: {
    [ArticlesActions.types.INDEX]: ({ currentState, payload }) => {
      const {
        page,
        pages,
        items,
        coordinates,
      } = payload;

      return {
        ...currentState,
        items,
        page,
        pages,
        coordinates,
        fetching: false,
      };
    },
  },
  initialState: {
    coordinates: [],
  },
});
