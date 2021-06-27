class PagesActions {
  static setPageSet(pageSet) {
    return (dispatch) => {
      dispatch({
        type: this.types.SET_PAGE_SET,
        payload: pageSet,
      });
    };
  }

  static clearAndPush(page) {
    return (dispatch) => {
      dispatch({
        type: this.types.CLEAR_AND_PUSH,
        payload: page,
      });
    };
  }

  static push(page) {
    return (dispatch) => {
      dispatch({
        type: this.types.PUSH,
        payload: page,
      });
    };
  }

  static pop() {
    return (dispatch) => {
      dispatch({
        type: this.types.POP,
      });
    };
  }

  static get types() {
    return {
      CLEAR_AND_PUSH: 'clear and push',
      SET_PAGE_SET: 'set page set',
      POP_ALL: 'pop all pages',
      PUSH: 'push page',
      POP: 'pop page',
    };
  }
}

export default PagesActions;
