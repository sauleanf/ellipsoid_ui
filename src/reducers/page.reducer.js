import _ from 'lodash';
import PagesActions from '../actions/pages.actions';
import PageConfig from '../components/pages/config';

const { defaultGroup } = PageConfig;

const defaultPage = PageConfig.getDefaultPage(defaultGroup);

const initialState = {
  pages: [defaultPage],
  group: defaultGroup,
  errors: {},
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PagesActions.types.PUSH_PAGE: {
      const { pages } = state;
      return {
        ...state,
        pages: [...pages, action.payload],
      };
    }
    case PagesActions.types.POP_PAGE: {
      const { pages } = state;
      const newSet = _.dropRight(pages, 1);
      return {
        ...state,
        pages: newSet,
      };
    }
    case PagesActions.types.CLEAR_AND_PUSH_PAGE: {
      return {
        ...state,
        pages: [action.payload],
      };
    }
    case PagesActions.types.SET_PAGE_GROUP: {
      const group = action.payload;
      const pages = [PageConfig.getDefaultPage(group)];
      return {
        ...state,
        pages,
        group,
      };
    }
    case PagesActions.types.SET_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case PagesActions.types.CLEAR_ERRORS: {
      return {
        ...state,
        errors: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default pageReducer;
