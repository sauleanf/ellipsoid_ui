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
    loaded: false,
  }, initialState);

  return (state = initialApiState, action) => {
    const actionObj = _.assign({
      [Actions.types.FETCHING]: ({ currentState }) => ({
        ...currentState,
        loaded: false,
      }),
      [Actions.types.INDEX]: ({ currentState, payload }) => {
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
          loaded: true,
        };
      },
      [Actions.types.SET]: ({ currentState, payload }) => {
        const {
          item,
        } = payload;
        return {
          ...currentState,
          item,
          loaded: true,
        };
      },
      [Actions.types.REMOVE]: ({ initState }) => initState,
      [Actions.types.FILTER]: ({ currentState, payload }) => {
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
          loaded: true,
        };
      },
    }, actions);

    const reduce = _.get(actionObj, action.type, ({ currentState }) => currentState);

    return reduce({
      currentState: state,
      payload: action.payload,
      initState: initialApiState,
    });
  };
};

export default createApiReducer;
