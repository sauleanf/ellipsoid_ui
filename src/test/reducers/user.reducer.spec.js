import UserReducer from '../../reducers/user.reducer';
import UsersActions from '../../actions/users.actions';
import {
  user,
} from '../fixtures';
import {
  testFetching,
  testIndex,
  testRemove,
  testSet,
} from './api.reducer.helpers';

describe('UsersReducer', () => {
  const { item } = user;

  testFetching({
    Actions: UsersActions,
    reduce: UserReducer,
  });

  testIndex({
    Actions: UsersActions,
    reduce: UserReducer,
    item,
  });

  testSet({
    Actions: UsersActions,
    reduce: UserReducer,
    item,
  });

  testRemove({
    Actions: UsersActions,
    reduce: UserReducer,
  });
});
