import _ from 'lodash';
import { setError } from './errors.actions';

class ApiActions {
  static get Api() { return null; }

  static get filterParams() { return []; }

  // validation

  static validateRequiredFields(params) {
    const requiredFields = _.filter(
      this.Api.schema,
      (fieldData) => _.has(fieldData, 'isRequired'),
    );

    const errors = {};
    _.each(requiredFields, (requiredField) => {
      if (!_.has(params, requiredField)) {
        errors[requiredField] = `${requiredField} is missing`;
      }
    });

    return errors;
  }

  static validateCreate(params) {
    const errors = {};
    _.assign(errors, this.validateRequiredFields(params));
    _.assign(errors, this.validateCreateParams(params));
    if (!_.isEmpty(errors)) throw errors;
  }

  static validateCreateParams() { }

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
      // validates create params
      try {
        this.validateCreate(params);
      } catch (e) {
        dispatch(setError(e));
        return;
      }

      // makes create params request
      try {
        const payload = await this.Api.create(params);
        dispatch({
          type: this.types.CREATE,
          payload,
        });
      } catch (e) {
        dispatch(setError(JSON.parse(e.request.response)));
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
