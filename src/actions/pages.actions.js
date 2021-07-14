import _ from 'lodash';

class PagesActions {
  static setPageGroup(pageGroup) {
    return (dispatch) => {
      dispatch(this.clearErrors());
      dispatch({
        type: this.types.SET_PAGE_GROUP,
        payload: pageGroup,
      });
    };
  }

  static clearAndPushPage(page) {
    return (dispatch) => {
      dispatch(this.clearErrors());
      dispatch({
        type: this.types.CLEAR_AND_PUSH_PAGE,
        payload: page,
      });
    };
  }

  static pushPage(page) {
    return (dispatch) => {
      dispatch(this.clearErrors());
      dispatch({
        type: this.types.PUSH_PAGE,
        payload: page,
      });
    };
  }

  static popPage() {
    return (dispatch) => {
      dispatch(this.clearErrors());
      dispatch({
        type: this.types.POP_PAGE,
      });
    };
  }

  static setErrors(errorData) {
    return (dispatch) => {
      // eslint-disable-next-line dot-notation
      const error = errorData['error_message'];
      const payload = {};
      _.each(error, (errorText, errorKey) => {
        payload[_.camelCase(errorKey)] = errorText;
      });

      dispatch({
        type: this.types.SET_ERRORS,
        payload,
      });
    };
  }

  static clearErrors() {
    return (dispatch) => {
      dispatch({ type: this.types.CLEAR_ERRORS });
    };
  }

  static get types() {
    return {
      CLEAR_AND_PUSH_PAGE: 'clear and push',
      SET_PAGE_GROUP: 'set page group',
      PUSH_PAGE: 'push page',
      POP_PAGE: 'pop page',
      SET_ERRORS: 'set errors',
      CLEAR_ERRORS: 'clear errors',
    };
  }
}

export default PagesActions;
