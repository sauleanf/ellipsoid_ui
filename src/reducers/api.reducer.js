import _ from 'lodash';

const createApiReducer = (
  Actions,
  extra = {},
) => {
  const {
    initialState,
    actions,
  } = extra;

  const initialApiState = _.assign({
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

  return (state = initialApiState, action) => {
    const actionObj = _.assign({
      [Actions.types.FETCHING]: (currentState) => ({
        ...currentState,
        fetching: true,
      }),
      [Actions.types.INDEX]: (currentState, payload) => {
        const {
          page,
          pages,
          items,
        } = payload;

        return {
          ...currentState,
          items,
          page,
          pages,
          fetching: false,
        };
      },
      [Actions.types.SET]: (currentState, payload) => {
        const {
          item,
        } = payload;
        return {
          ...currentState,
          item,
          fetching: false,
        };
      },
      [Actions.types.FILTER]: (currentState, payload) => {
        const {
          page,
          pages,
          items,
          param,
        } = payload;
        return {
          ...currentState,
          filtered: {
            items,
            page,
            pages,
            param,
          },
          fetching: false,
        };
      },
    }, actions);

    const reduce = _.get(actionObj, action.type, (currentState) => currentState);

    return reduce(state, action.payload);
  };
};

export default createApiReducer;
