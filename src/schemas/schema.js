import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import types from './types';

const propTypes = {
  [types.Number]: () => PropTypes.number,
  [types.String]: () => PropTypes.string,
  [types.Boolean]: () => PropTypes.bool,
  [types.DateTime]: () => PropTypes.instanceOf(moment),
  [types.Association]: (field) => PropTypes.shape(field.schema.propType),
  [types.Coordinates]: () => PropTypes.arrayOf(PropTypes.number),
};

class Schema {
  static get type() {
    return 'generic';
  }

  static get basicFields() {
    return {
      id: {
        type: types.String,
        immutable: true,
      },
    };
  }

  static get fields() {
    return {};
  }

  static get schema() {
    return _.merge(this.fields, this.basicFields);
  }

  static deserializeList(data) {
    return _.map(data, (datum) => this.deserializeItem(datum));
  }

  static deserializeItem(data) {
    const item = {};
    _.each(this.schema, (attributeData, attribute) => {
      const val = data[_.snakeCase(attribute)];

      const {
        type,
      } = attributeData;
      const attributeName = _.camelCase(attribute);

      const hasMany = _.get(attributeData, 'many', false);

      switch (type) {
        case types.Number: {
          item[attributeName] = hasMany
            ? _.map(val, (datum) => Number(datum))
            : Number(val);

          break;
        }
        case types.String: {
          item[attributeName] = val;
          break;
        }
        case types.DateTime: {
          item[attributeName] = hasMany
            ? _.map(val, (datum) => moment(datum))
            : moment(val);
          break;
        }
        case types.SingleAssociation: {
          const {
            schema,
          } = attributeData;
          item[attributeName] = hasMany
            ? schema.deserializeList(val)
            : schema.deserializeItem(val);
          break;
        }
        case types.Coordinates: {
          item[attributeName] = val;
          break;
        }
        case types.Boolean: {
          item[attributeName] = !!(val);
          break;
        }
        default: {
          item[attributeName] = val;
          break;
        }
      }
    });

    return item;
  }

  static serializeData(data) {
    const serializedParams = {};
    // eslint-disable-next-line consistent-return
    _.each(_.keys(data), (attribute) => {
      if (_.has(this.schema, attribute)) {
        const attributeData = this.schema[attribute];
        const {
          type,
          immutable,
        } = attributeData;

        if (immutable) return null;
        if (!_.has(data, attribute)) return null;

        const hasMany = _.get(attributeData, 'many', false);

        switch (type) {
          case types.DateTime: {
            const date = data[attribute];
            serializedParams[_.snakeCase(attribute)] = date.calendar();
            break;
          }
          case types.Association: {
            serializedParams[_.snakeCase(attribute)] = hasMany
              ? _.map(data[attribute], 'id')
              : data[attribute].id;
            break;
          }
          default: {
            serializedParams[_.snakeCase(attribute)] = data[attribute];
          }
        }
      } else {
        serializedParams[_.snakeCase(attribute)] = data[attribute];
      }
    });

    return serializedParams;
  }

  static get propType() {
    const propObj = {};
    _.each(this.schema, (field, fieldName) => {
      const hasMany = _.get(field, 'many', false);

      const func = propTypes[field.type];

      propObj[fieldName] = hasMany
        ? PropTypes.arrayOf(func(field))
        : func(field);
    });

    return propObj;
  }
}

export default Schema;
