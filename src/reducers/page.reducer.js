import PagesActions from '../actions/pages.actions';
import PageSets from '../pageSet';

const defaultPageSet = PageSets.getDefaultPageSet();

const initialState = {
  pages: [PageSets.getDefaultPage(defaultPageSet)],
  group: defaultPageSet,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PagesActions.types.PUSH: {
      const { pages } = state;
      pages.push(action.payload);
      return {
        ...state,
        pages,
      };
    }
    case PagesActions.types.POP: {
      const { pages } = state;
      pages.pop();
      return {
        ...state,
        pages,
      };
    }
    case PagesActions.types.POP_ALL: {
      return {
        ...state,
        pages: [],
      };
    }
    case PagesActions.types.CLEAR_AND_PUSH: {
      return {
        ...state,
        pages: [action.payload],
      };
    }
    case PagesActions.types.SET_PAGE_GROUP: {
      const group = action.payload;
      const pages = [PageSets.getDefaultPage(group)];
      return {
        ...state,
        pages,
        group,
      };
    }
    default: {
      return state;
    }
  }
};

export default pageReducer;
