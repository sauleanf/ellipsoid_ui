import _ from 'lodash';
import checkPropTypes from 'check-prop-types';

export const runTypeTests = ({
  type,
  Schema,
}) => {
  describe('type', () => {
    it('has the right type', () => {
      expect(Schema.type).toEqual(type);
    });
  });
};

export const runDeserializeItemTests = ({
  raw,
  item,
  Schema,
}) => {
  describe('deserializeItem', () => {
    it('deserializes the json properly', () => {
      expect(Schema.deserializeItem(raw)).toEqual(item);
    });
  });
};

export const runDeserializeListTests = ({
  raw,
  item,
  Schema,
}) => {
  const numItems = 4;

  describe('deserializeList', () => {
    it('deserializes a list of json properly', () => {
      const raws = _.map(_.range(numItems), (i) => {
        const current = _.cloneDeep(raw);
        current.id = i;
        return current;
      });
      const items = _.map(_.range(numItems), (i) => {
        const current = _.cloneDeep(item);
        current.id = i;
        return current;
      });
      expect(Schema.deserializeList(raws)).toEqual(items);
    });
  });
};

export const runPropTypeTest = ({
  Schema,
  item,
}) => {
  describe('propType', () => {
    it('has the right prop type', () => {
      checkPropTypes.assertPropTypes(Schema.propType, item);
    });
  });
};
