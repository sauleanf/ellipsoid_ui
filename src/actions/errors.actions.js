import _ from 'lodash';

class ErrorsActions {
  static set(errorData) {
    return (dispatch) => {
      // eslint-disable-next-line dot-notation
      const error = errorData['error_message'];
      const payload = {};
      _.each(error, (errorText, errorKey) => {
        payload[_.camelCase(errorKey)] = errorText;
      });

      dispatch({
        type: this.types.SET,
        payload,
      });
    };
  }

  static clear() {
    return (dispatch) => {
      dispatch({ type: this.types.CLEAR });
    };
  }

  static get types() {
    return {
      SET: 'set errors',
      CLEAR: 'clear errors',
    };
  }
}

export default ErrorsActions;
