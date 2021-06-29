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

  describe('clearAndPush', () => {
    it('send a dispatch with the new page', () => {
      const action = PagesActions.clearAndPush(newPage);
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.CLEAR_AND_PUSH,
        payload: newPage,
      });
    });
  });

  describe('push', () => {
    it('send a dispatch with the new page', () => {
      const action = PagesActions.push(newPage);
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.PUSH,
        payload: newPage,
      });
    });
  });

  describe('pop', () => {
    it('send a dispatch', () => {
      const action = PagesActions.pop();
      action(dispatchSpy);

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PagesActions.types.POP,
      });
    });
  });

  describe('types', () => {
    it('shows the right ones', () => {
      expect(PagesActions.types).toEqual({
        CLEAR_AND_PUSH: 'clear and push',
        SET_PAGE_GROUP: 'set page group',
        PUSH: 'push page',
        POP: 'pop page',
      });
    });
  });
});
