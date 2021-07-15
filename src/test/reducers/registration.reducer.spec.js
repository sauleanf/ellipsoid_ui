import registrationReducer from '../../reducers/registration.reducer';
import registrationsActions from '../../actions/registrations.actions';
import {
  registration,
} from '../fixtures';
import {
  testFetching,
  testIndex,
  testSet,
} from './api.reducer.helpers';

describe('registrationsReducer', () => {
  const { item } = registration;

  testFetching({
    Actions: registrationsActions,
    reduce: registrationReducer,
  });

  testIndex({
    Actions: registrationsActions,
    reduce: registrationReducer,
    item,
  });

  testSet({
    Actions: registrationsActions,
    reduce: registrationReducer,
    item,
  });
});
