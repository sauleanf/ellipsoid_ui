import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../../../reducers';
import RegistrationPage from '../../../../components/pages/registration/RegistrationPage';
import { registration, user } from '../../../fixtures';
import RegistrationsActions from '../../../../actions/registrations.actions';
import { PagesActions } from '../../../../actions';
import { mockAction } from '../../../actions/actions.helpers';
import { pages } from '../../../../components/pages/config/constants';

describe('RegistrationPage', () => {
  const { item } = registration;
  const { username, name, email } = user.item;
  const password = 'password';
  const payload = {
    item,
  };
  let wrapper;
  let store;

  let pageSpy;
  let registerSpy;

  beforeEach(() => {
    store = createStore(
      rootReducer,
      applyMiddleware(thunk),
    );

    wrapper = mount(
      <Provider store={store}>
        <RegistrationPage />
      </Provider>,
    );

    pageSpy = mockAction(PagesActions, 'clearAndPushPage');
    registerSpy = jest.spyOn(RegistrationsActions.Api, 'create').mockImplementation(async () => payload);
  });

  describe('register', () => {
    it('makes a dispatch to redux', async () => {
      await wrapper.find('[data-testid="email-form-input-field"] input').simulate('change', {
        target: {
          value: email,
        },
      });
      await wrapper.find('[data-testid="name-form-input-field"] input').simulate('change', {
        target: {
          value: name,
        },
      });
      await wrapper.find('[data-testid="username-form-input-field"] input').simulate('change', {
        target: {
          value: username,
        },
      });
      await wrapper.find('[data-testid="password-form-input-field"] input').simulate('change', {
        target: {
          value: password,
        },
      });
      await wrapper.find('[data-testid="password-confirmation-form-input-field"] input').simulate('change', {
        target: {
          value: password,
        },
      });
      await wrapper.find('[data-testid="register-form-submit-btn"] button').simulate('click');
      expect(registerSpy).toHaveBeenCalledWith({
        email,
        name,
        username,
        password,
        passwordConfirmation: password,
      });

      await wrapper.update();
      expect(pageSpy).toHaveBeenCalledWith(pages.REGISTRATION_CONFIRM);
    });
  });
});
