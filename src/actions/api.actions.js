import _ from 'lodash';
import PagesActions from './pages.actions';

class ApiActions {
  static get Api() { return null; }

  static get filterParams() { return []; }

  // api requests

  static getAll(params = {}) {
    return async (dispatch) => {
      if (!_.has(params, 'page')) {
        // eslint-disable-next-line no-param-reassign
        params.page = 1;
      }
      dispatch({
        type: this.types.FETCHING,
      });

      const payload = await this.Api.index(params);
      dispatch({
        type: this.types.INDEX,
        payload,
      });
    };
  }

  static get(id) {
    return async (dispatch) => {
      dispatch({
        type: this.types.FETCHING,
      });
      const payload = await this.Api.show(id);
      dispatch({
        type: this.types.SET,
        payload,
      });
    };
  }

  static filter(param) {
    return async (dispatch) => {
      const filterArgs = {};
      _.each(this.filterParams, (key) => {
        filterArgs[key] = param;
      });

      const payload = await this.Api.index(filterArgs);
      dispatch({
        type: this.types.FILTER,
        payload: {
          ...payload,
          param,
        },
      });
    };
  }

  static create(params) {
    return async (dispatch) => {
      // makes create params request
      try {
        const payload = await this.Api.create(params);
        dispatch({
          type: this.types.SET,
          payload,
        });
      } catch (e) {
        dispatch(PagesActions.setErrors(JSON.parse(e.request.response)));
      }
    };
  }

  // action types

  static get types() {
    const typeBases = {
      INDEX: 'get all {}s',
      FILTER: 'filter {}s',
      CREATE: 'create {}',
      UPDATE: 'update {}',
      SET: 'set {}',
      REMOVE: 'remove {}',
      FETCHING: 'fetching {}',
    };

    const formattedType = _.replace(this.Api.Schema.type, '/', ' ');
    const typeMap = {};
    _.each(typeBases, (type, typename) => {
      typeMap[typename] = _.replace(type, '{}', formattedType);
    });

    return typeMap;
  }
}

export default ApiActions;
