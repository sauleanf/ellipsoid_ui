import { CLEAR_ERRORS, SET_ERROR } from './actions.types';

export const setError = (errorMessage) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: errorMessage,
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
