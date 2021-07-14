import _ from 'lodash';
import store from '../store';

describe('store', () => {
  let state;
  beforeEach(() => {
    state = store.getState();
  });

  const reducerTypes = [
    'articles',
    'newspapers',
    'locations',
    'pages',
    'registrations',
    'users',
  ];

  it('contains all reducers', () => {
    _.each(reducerTypes, (type) => {
      expect(state[type]).toBeTruthy();
    });
  });
});
