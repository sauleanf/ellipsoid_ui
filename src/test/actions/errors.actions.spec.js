import { ErrorsActions } from '../../actions';

describe('ErrorsActions', () => {
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = jest.fn((x) => x);
  });

  describe('set', () => {
    it('send a dispatch with new errors', () => {
      const action = ErrorsActions.set({
        error_message: {
          field_one: 'message one',
          field_two: 'message two',
        },
      });
      action(dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: ErrorsActions.types.SET,
        payload: {
          fieldOne: 'message one',
          fieldTwo: 'message two',
        },
      });
    });
  });

  describe('clear', () => {
    it('send a dispatch', () => {
      const action = ErrorsActions.clear();
      action(dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: ErrorsActions.types.CLEAR,
      });
    });
  });

  describe('types', () => {
    it('shows the right ones', () => {
      expect(ErrorsActions.types).toEqual({
        CLEAR: 'clear errors',
        SET: 'set errors',
      });
    });
  });
});
