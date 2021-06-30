import PageReducer from '../../reducers/page.reducer';
import { PagesActions } from '../../actions';

const defaultGroup = 'default group';
const defaultPage = 'default page';
const page = 'new page';

jest.mock('../../components/pages/config', () => ({
  defaultGroup,
  getDefaultPage: (pageGroup) => {
    if (pageGroup === defaultGroup) return defaultPage;

    return page;
  },
}));

describe('PageReducer', () => {
  describe('PUSH', () => {
    it('pushes one page to the stack', () => {
      const newState = PageReducer(undefined, {
        type: PagesActions.types.PUSH,
        payload: page,
      });
      expect(newState).toEqual({ pages: [defaultPage, page], group: defaultGroup });
    });
  });

  const firstPage = 'page 1';
  const secondPage = 'page 2';
  const pages = [firstPage, secondPage];

  describe('POP', () => {
    it('pops one page from the stack', () => {
      const newState = PageReducer({
        pages,
        group: defaultGroup,
      }, {
        type: PagesActions.types.POP,
      });
      expect(newState).toEqual({ pages: [firstPage], group: defaultGroup });
    });
  });

  describe('CLEAR_AND_PUSH', () => {
    it('clears the old pages and pushes the new page', () => {
      const newState = PageReducer({
        pages,
        group: defaultGroup,
      }, {
        type: PagesActions.types.CLEAR_AND_PUSH,
        payload: page,
      });
      expect(newState).toEqual({ pages: [page], group: defaultGroup });
    });
  });

  const newPageGroup = 'new group';

  describe('SET_PAGE_GROUP', () => {
    it('sets the page group', () => {
      const newState = PageReducer(undefined, {
        type: PagesActions.types.SET_PAGE_GROUP,
        payload: newPageGroup,
      });
      expect(newState).toEqual({ pages: [page], group: newPageGroup });
    });
  });
});
