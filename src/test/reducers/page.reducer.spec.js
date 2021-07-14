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
  const defaultState = {
    pages: [defaultPage],
    group: defaultGroup,
    errors: {},
  };

  const errors = {
    field: 'arg',
  };

  describe('PUSH_PAGE', () => {
    it('pushes one page to the stack', () => {
      const newState = PageReducer(undefined, {
        type: PagesActions.types.PUSH_PAGE,
        payload: page,
      });
      expect(newState).toEqual({
        ...defaultState,
        pages: [defaultPage, page],
      });
    });
  });

  const firstPage = 'page 1';
  const secondPage = 'page 2';
  const pages = [firstPage, secondPage];

  describe('POP_PAGE', () => {
    it('pops one page from the stack', () => {
      const newState = PageReducer({
        ...defaultState,
        pages,
      }, {
        type: PagesActions.types.POP_PAGE,
      });
      expect(newState).toEqual({
        pages: [firstPage],
        group: defaultGroup,
        errors: {},
      });
    });
  });

  describe('CLEAR_AND_PUSH_PAGE', () => {
    it('clears the old pages and pushes the new page', () => {
      const newState = PageReducer({
        ...defaultState,
        pages,
      }, {
        type: PagesActions.types.CLEAR_AND_PUSH_PAGE,
        payload: page,
      });

      expect(newState).toEqual({
        pages: [page],
        group: defaultGroup,
        errors: {},
      });
    });
  });

  const newPageGroup = 'new group';

  describe('SET_PAGE_GROUP', () => {
    it('sets the page group', () => {
      const newState = PageReducer(undefined, {
        type: PagesActions.types.SET_PAGE_GROUP,
        payload: newPageGroup,
      });
      expect(newState).toEqual({
        pages: [page],
        group: newPageGroup,
        errors: {},
      });
    });
  });

  describe('SET_ERROR', () => {
    it('sets the error', () => {
      const newState = PageReducer(undefined, {
        type: PagesActions.types.SET_ERRORS,
        payload: errors,
      });
      expect(newState).toEqual({ ...defaultState, errors });
    });
  });

  describe('CLEAR_ERRORS', () => {
    it('sets the error', () => {
      const newState = PageReducer({
        ...defaultState,
        errors,
      }, {
        type: PagesActions.types.CLEAR_ERRORS,
      });
      expect(newState).toEqual(defaultState);
    });
  });
});
