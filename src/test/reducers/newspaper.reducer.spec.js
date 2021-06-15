import NewspaperReducer from '../../reducers/newspaper.reducer';
import NewspapersActions from '../../actions/newspapers.actions';
import {
  newspaper,
} from '../fixtures';
import {
  testFetching,
  testIndex,
  testSet,
} from './api.reducer.helpers';

describe('NewspapersReducer', () => {
  const { item } = newspaper;

  testFetching({
    Actions: NewspapersActions,
    reduce: NewspaperReducer,
  });

  testIndex({
    Actions: NewspapersActions,
    reduce: NewspaperReducer,
    item,
  });

  testSet({
    Actions: NewspapersActions,
    reduce: NewspaperReducer,
    item,
  });
});
