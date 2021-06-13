import {
  SET_ERROR,
  CLEAR_ERRORS,
} from '../actions/actions.types';

const initialState = {
  errors: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case CLEAR_ERRORS: {
      return {
        ...state,
        errors: initialState.errors,
      };
    }
    default: {
      return state;
    }
  }
};

export default errorReducer;
