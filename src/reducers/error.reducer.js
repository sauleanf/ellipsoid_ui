import ErrorsActions from '../actions/errors.actions';

const initialState = {
  errors: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ErrorsActions.types.SET: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case ErrorsActions.types.CLEAR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default errorReducer;
