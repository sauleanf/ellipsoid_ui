import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../../../reducers';
import RegistrationCompletedPage from '../../../../components/pages/registrationCompleted/RegistrationCompletedPage';
import { PagesActions } from '../../../../actions';
import { mockAction } from '../../../actions/actions.helpers';

describe('RegistrationCompletedPage', () => {
  let wrapper;
  let store;
  let pageSpy;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    pageSpy = mockAction(PagesActions, 'clearAndPush');

    wrapper = mount(
      <Provider store={store}>
        <RegistrationCompletedPage />
      </Provider>,
    );
  });

  describe('register', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('[data-testid="visit-login-page-btn"] button').simulate('click');
      expect(pageSpy).toHaveBeenCalledWith('login');
    });
  });
});
