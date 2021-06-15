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
    it('sets the items and fetching', () => {
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

export const testRemove = ({
  reduce,
  Actions,
  state,
  initialState,
}) => {
  describe('REMOVE', () => {
    const completeState = _.assign({
      items: [{}],
      item: {
        id: 'id1'
      },
      filtered: {
        items: [],
        page: 1,
        pages: 2,
        param: 'param',
      },
      page: 1,
      pages: 3,
      fetching: false,
    }, state)
    const completeInitialState = _.assign({
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
    }, initialState);
    it('resets the state', () => {
      const newState = reduce(completeState, {
        type: Actions.types.REMOVE,
      });
      expect(newState).toEqual(completeInitialState);
    });
  });
};
