import { PagesActions } from '../../actions';

describe('PagesActions', () => {
  let dispatchSpy;
  const newPage = 'new page';
  const pageGroup = 'page group 1';

  beforeEach(() => {
    dispatchSpy = jest.fn((x) => x);
  });

  describe('setPageSet', () => {
    it('send a dispatch with the new page group', () => {
      const action = PagesActions.setPageGroup(pageGroup);
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.SET_PAGE_GROUP,
        payload: pageGroup,
      });
    });
  });

  describe('clearAndPushPage', () => {
    it('send a dispatch with the new page', () => {
      const action = PagesActions.clearAndPushPage(newPage);
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.CLEAR_AND_PUSH_PAGE,
        payload: newPage,
      });
    });
  });

  describe('pushPage', () => {
    it('send a dispatch with the new page', () => {
      const action = PagesActions.pushPage(newPage);
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.PUSH_PAGE,
        payload: newPage,
      });
    });
  });

  describe('popPage', () => {
    it('send a dispatch', () => {
      const action = PagesActions.popPage();
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.POP_PAGE,
      });
    });
  });

  describe('setErrors', () => {
    it('send a dispatch with new errors', () => {
      const action = PagesActions.setErrors({
        error_message: {
          field_one: 'message one',
          field_two: 'message two',
        },
      });
      action(dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.SET_ERRORS,
        payload: {
          fieldOne: 'message one',
          fieldTwo: 'message two',
        },
      });
    });
  });

  describe('clearERrors', () => {
    it('send a dispatch', () => {
      const action = PagesActions.clearErrors();
      action(dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.CLEAR_ERRORS,
      });
    });
  });

  describe('types', () => {
    it('shows the right ones', () => {
      expect(PagesActions.types).toEqual({
        CLEAR_AND_PUSH_PAGE: 'clear and push',
        SET_PAGE_GROUP: 'set page group',
        PUSH_PAGE: 'push page',
        POP_PAGE: 'pop page',
        SET_ERRORS: 'set errors',
        CLEAR_ERRORS: 'clear errors',
      });
    });
  });
});
