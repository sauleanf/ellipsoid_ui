import PageReducer from '../../reducers/page.reducer';
import { PagesActions } from '../../actions';
import PageSets from '../../components/pages/config';

describe('PageReducer', () => {
  const pages = {
    field: 'arg',
  };

  beforeEach(() => {
    jest.spyOn(PageSets);
  });

  describe('SET', () => {
    it('sets the page', () => {
      const newState = PageReducer(undefined, {
        type: PagesActions.types.SET,
        payload: pages,
      });
      expect(newState).toEqual({ pages });
    });
  });

  describe('CLEAR', () => {
    it('sets the page', () => {
      const newState = PageReducer(pages, {
        type: PagesActions.types.CLEAR,
      });
      expect(newState).toEqual({ pages: {} });
    });
  });
});
