import _ from 'lodash';

export const testFetching = ({
  reduce,
  Actions,
  state = {},
}) => {
  describe('FETCHING', () => {
    it('sets fetching to true', () => {
      const newState = reduce(undefined, {
        type: Actions.types.FETCHING,
      });
      expect(newState).toEqual(_.assign({
        items: [],
        item: {},
        filtered: {
          items: [],
          page: -1,
          pages: 0,
          param: '',
        },
        page: -1,
        pages: 0,
        fetching: true,
      }, state));
    });
  });
};

export const testIndex = ({
  reduce,
  Actions,
  item,
  state,
}) => {
  describe('INDEX', () => {
    it('sets fetching to true', () => {
      const newState = reduce(undefined, {
        type: Actions.types.INDEX,
        payload: {
          items: [item],
          page: 1,
          pages: 2,
        },
      });
      expect(newState).toEqual(_.assign({
        items: [item],
        item: {},
        filtered: {
          items: [],
          page: -1,
          pages: 0,
          param: '',
        },
        page: 1,
        pages: 2,
        fetching: false,
      }, state));
    });
  });
};

export const testSet = ({
  reduce,
  Actions,
  item,
  state,
}) => {
  describe('SET', () => {
    it('sets fetching to true', () => {
      const newState = reduce(undefined, {
        type: Actions.types.SET,
        payload: {
          item,
        },
      });
      expect(newState).toEqual(_.assign({
        items: [],
        item,
        filtered: {
          items: [],
          page: -1,
          pages: 0,
          param: '',
        },
        page: -1,
        pages: 0,
        fetching: false,
      }, state));
    });
  });
};

export const testFilter = ({
  Actions,
  reduce,
  item,
  state,
}) => {
  describe('FILTER', () => {
    const param = 'filter';
    it('sets fetching to true', () => {
      const newState = reduce(undefined, {
        type: Actions.types.FILTER,
        payload: {
          items: [item],
          page: 1,
          pages: 2,
          param,
        },
      });
      expect(newState).toEqual(_.assign({
        items: [],
        item: {},
        filtered: {
          items: [item],
          page: 1,
          pages: 2,
          param,
        },
        page: -1,
        pages: 0,
        fetching: false,
      }, state));
    });
  });
};
