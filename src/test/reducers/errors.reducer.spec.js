import ErrorReducer from '../../reducers/error.reducer';
import { ErrorsActions } from '../../actions';

describe('ErrorReducer', () => {
  const errors = {
    field: 'arg',
  };

  describe('SET', () => {
    it('sets the error', () => {
      const newState = ErrorReducer(undefined, {
        type: ErrorsActions.types.SET,
        payload: errors,
      });
      expect(newState).toEqual({ errors });
    });
  });

  describe('CLEAR', () => {
    it('sets the error', () => {
      const newState = ErrorReducer(errors, {
        type: ErrorsActions.types.CLEAR,
      });
      expect(newState).toEqual({ errors: {} });
    });
  });
});
