import createApiReducer from './api.reducer';
import LocationActions from '../actions/locations.actions';

export default createApiReducer(LocationActions, {
  actions: {
    [LocationActions.types.SET_COORDINATES]: (state, payload) => {
      const { coordinates } = payload;
      return {
        ...state,
        coordinates,
      };
    },
  },
  initialState: {
    coordinates: [],
  },
});
